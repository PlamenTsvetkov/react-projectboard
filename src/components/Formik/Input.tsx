import { Form } from 'react-bootstrap';
import { Field, ErrorMessage, FieldProps } from 'formik';
import ErrorText from '../ErrorText/ErrorText';

export interface InputProps extends FieldProps {
  label: string;
  name: string;
  inputType?: string;
}

const Input = ({ label, name, inputType, ...rest }: InputProps) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Field as={Form.Control} type={inputType} name={name} {...rest} />
      <ErrorMessage name={name} component={ErrorText} />
    </Form.Group>
  );
};

export default Input;
