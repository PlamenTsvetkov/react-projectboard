import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown  } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Account/Account';
import { FaCog } from 'react-icons/fa';
import styles from './Header.module.css'

const Header: React.FC = () => {
  const { getSession, logout } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { session, attributes } = await getSession();
        setIsAuthenticated(true);
        setEmail(attributes['email'] || '');
      } catch (error) {
        setIsAuthenticated(false);
        setEmail('');
      }
    };

    checkAuthentication();
  }, [getSession]);

  return (
    <header id="site-header">
      <Navbar expand="lg" bg="light" variant="light" className="navbar">
        <Navbar.Collapse>
          <Container className="d-flex justify-content-between">
            <div>

              <Nav className="first-bar">
                <Nav.Link as={Link} to="/" className="text-primary">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="#" className="text-primary button">
                  Event Monitor
                </Nav.Link>
                <Nav.Link as={Link} to="#" className="text-primary button">
                  Schedules
                </Nav.Link>
              </Nav>
            </div>
            <div>
              {isAuthenticated ? (
                <Nav className="second-bar">
                  <Nav.Item className="text-primary" style={{ marginRight: '10px' }}>
                    Welcome, {email}
                  </Nav.Item>
                  <NavDropdown title={<span className={styles["settings-dropdown-title"]}><FaCog className={styles["settings-dropdown-icon"]} /> Settings</span>} id="settings-dropdown" className={styles["settings-dropdown"]}>

                    <NavDropdown.Item as={Link} to="/changepassword" className="text-primary">
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Item className="text-primary" onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              ) : (
                <Nav className="second-bar">
                  <Nav.Item>
                    <Nav.Link as={Link} to="/register" className="text-primary">
                      <i className="fas fa-user-plus"></i> Register
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/login" className="text-primary">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              )}
            </div>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
