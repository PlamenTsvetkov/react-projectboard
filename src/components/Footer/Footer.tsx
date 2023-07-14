import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer>
      <Container fluid className="bg-light text-primary">
        <hr />
        <p className="text-center">© {new Date().getFullYear()} The best Firm!</p>
      </Container>
    </footer>
  );
};

export default Footer;
