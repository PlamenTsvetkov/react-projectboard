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

interface ChangePasswordValues {
    password: string;
    newPassword: string;
    confirmPassword:string,
}

const ChangePassword = () => {
    const initialValues: ChangePasswordValues = {
        password: '',
        newPassword: '',
        confirmPassword: '',
    };

    const { getSession } = useContext(AuthContext);

    const validationSchema = Yup.object({
        password: Yup.string()
            .required('Password is required!')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                'Password must contain at least 8 characters, including uppercase, lowercase, and numbers'
            ),
        newPassword: Yup.string()
            .required('New Password is required!')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                'Password must contain at least 8 characters, including uppercase, lowercase, and numbers'
            ),
            confirmPassword: Yup.string()
            .required('Confirm Password is required!')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onChangePasswordSubmitHandler = (values: ChangePasswordValues) => {
        setIsLoading(true);
        const password = values.password;
        const newPassword = values.newPassword;

        getSession().then(({ user }) => {
            user?.changePassword(password, newPassword, (err: any, result: any) => {
                if (err) {
                    setIsLoading(false);
                    setError(err.message || 'An error occurred during registration.')
                } else {
                    setIsLoading(false); // Заявката завърши успешно
                    navigate(`/`);
                }
            });
        });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6} lg={4}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onChangePasswordSubmitHandler}>
                        {(formik) => (
                            <Form>
                                <h2 className="text-center mb-4 text-primary">Change password</h2>
                                {error && <ErrorText>{error}</ErrorText>}
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
                                    label="New password:"
                                    name="newPassword"
                                    inputType="password"
                                    field={formik.getFieldProps('newPassword')}
                                    meta={formik.getFieldMeta('newPassword')}
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
                                            Change password
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

export default ChangePassword;
