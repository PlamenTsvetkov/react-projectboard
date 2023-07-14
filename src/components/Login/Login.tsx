import { Formik, Form } from 'formik';
import { Button, Form as BootstrapForm, Container, Col, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import FormikControl from '../Formik/FormikControl';
import { AuthContext } from '../Account/Account';
import ErrorText from '../ErrorText/ErrorText';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

interface LoginValues {
    email: string;
    password: string;
}

const Login = () => {
    const initialValues: LoginValues = {
        email: '',
        password: '',
    };

    const { authenticate } = useContext(AuthContext);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required!'),
        password: Yup.string()
            .required('Password is required!')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                'Password must contain at least 8 characters, including uppercase, lowercase, and numbers'
            ),
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onLoginSubmitHandler = (values: LoginValues) => {
        setIsLoading(true);
        const email = values.email;
        const password = values.password;

        authenticate(email, password)
            .then(data => {
                setIsLoading(false); // Заявката завърши успешно
                navigate(`/`);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message || 'An error occurred during registration.')
            })
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onLoginSubmitHandler}>
                        {(formik) => (
                            <Form>
                                <h2 className="text-center mb-4 text-primary">Login</h2>
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

                                <div className="text-center mt-3">
                                    {isLoading ? (
                                        <div className="text-center">
                                            <Spinner animation="border" variant="primary" />
                                        </div>
                                    ) : (
                                        <Button className="submit" variant="primary" type="submit">
                                            Login
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

export default Login;
