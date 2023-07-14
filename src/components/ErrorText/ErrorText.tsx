import React from 'react';
import { Alert } from 'react-bootstrap';

interface ErrorTextProps {
  children: React.ReactNode;
}

const ErrorText = ({ children }: ErrorTextProps) => {
  return (
    <Alert variant="danger" className="mb-0">
      {children}
    </Alert>
  );
};

export default ErrorText;
