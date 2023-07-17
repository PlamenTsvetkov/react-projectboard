import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './Home.module.css'

const HomePage = () => {
  return (
    <div className={styles["hero-image"]}>
      <Container>
        <h1 className='text-primary'>Welcome to The best Firm Webhooks</h1>
        <p className='text-primary'>Discover all amazing webhooks.</p>
        <button className="btn btn-primary">Get Started</button>
      </Container>
    </div>
  );
};

export default HomePage;