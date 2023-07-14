import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/Account/Account';
import { useNavigate } from 'react-router-dom';

const isAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Component: React.FC<any> = (props) => {
    const { getSession } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const sessionData = await getSession();
          if (!sessionData.user) {
            navigate('/login');
          }
        } catch (error) {
          navigate('/login');
        }
      };

      checkAuthentication();
    }, [getSession, navigate]);

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default isAuth;
