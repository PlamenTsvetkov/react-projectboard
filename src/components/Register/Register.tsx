import { Formik, Form } from 'formik';
import { Button, Form as BootstrapForm, Container, Col, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import UserPool from '../../utils/UserPool';
import { useNavigate } from 'react-router-dom';
import FormikControl from '../Formik/FormikControl';
import ErrorText from '../ErrorText/ErrorText';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

interface RegisterValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const initialValues: RegisterValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required!'),
        password: Yup.string()
            .required('Password is required!')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                'Password must contain at least 8 characters, including uppercase, lowercase, and numbers'
            ),
        confirmPassword: Yup.string()
            .required('Confirm Password is required!')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onRegisterSubmitHandler = (values: RegisterValues) => {
        setIsLoading(true);

        const email = values.email;
        const password = values.password;


        UserPool.signUp(email, password, [], [], (error, data) => {
            if (!error) {
                setIsLoading(false);
                navigate(`/login`);
            }
            else {
                setIsLoading(false);
                setError(error.message || 'An error occurred during registration.');
            }

        })
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onRegisterSubmitHandler}>
                        {(formik) => (
                            <Form>
                                <h2 className="text-center mb-4 text-primary">Register</h2>
                                {error && <ErrorText>{error}</ErrorText>}
                                <FormikControl
                                    control="input"
                                    label="Email:"
                                    name="email"
                                    inputType="email"
                                    field={formik.getFieldProps('email')}
                                    meta={formik.getFieldMeta('email')}
                                    form={formik}
                                />

                                <FormikControl
                                    control="input"
                                    label="Password:"
                                    name="password"
                                    inputType="password"
                                    field={formik.getFieldProps('password')}
                                    meta={formik.getFieldMeta('password')}
                                    form={formik}
                                />

                                <FormikControl
                                    control="input"
                                    label="Confirm password:"
                                    name="confirmPassword"
                                    inputType="password"
                                    field={formik.getFieldProps('confirmPassword')}
                                    meta={formik.getFieldMeta('confirmPassword')}
                                    form={formik}
                                />

                                <div className="text-center mt-3">
                                    {isLoading ? (
                                        <div className="text-center">
                                            <Spinner animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <Button className="submit" variant="primary" type="submit">
                                            Register
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;