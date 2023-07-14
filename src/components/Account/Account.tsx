import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute  } from 'amazon-cognito-identity-js';
import UserPool from '../../utils/UserPool';

export interface SessionData {
    user: CognitoUser | null;
    session: any;
    attributes: Record<string, string>;
}

export type AuthContextType = {
    authenticate: (Username: string, Password: string) => Promise<unknown>;
    getSession: () => Promise<SessionData>;
    logout: () => void;
};

const AuthContext = React.createContext<AuthContextType>({
    authenticate: () => Promise.resolve(),
    getSession: () => Promise.resolve({ user: null, session: null, attributes: {} }),
    logout: () => { },
});

type AccountProps = {
    children: React.ReactNode;
};

const Account: React.FC<AccountProps> = ({ children }) => {

    const getSession = async (): Promise<SessionData> => {
        return new Promise<SessionData>((resolve, reject) => {
          const user = UserPool.getCurrentUser();
          if (user) {
            user.getSession(async (err: any, session: any) => {
              if (err) {
                reject(err);
              } else {
                const attributes = await new Promise<Record<string, string>>((resolve, reject) => {
                  user.getUserAttributes((err, attributes) => {
                    if (err) {
                      reject(err);
                    } else {
                      const results: Record<string, string> = {};
                      if (attributes) {
                        for (let attribute of attributes) {
                          const { Name, Value } = attribute;
                          results[Name] = Value;
                        }
                      }
                      resolve(results);
                    }
                  });
                });
                resolve({ user, session, attributes });
              }
            });
          } else {
            reject();
          }
        });
      };
      

    const navigate = useNavigate();

    const authenticate = async (Username: string, Password: string) => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username,
                Pool: UserPool,
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log('onSuccess: ', data);
                    resolve(data);
                    navigate(`/`);
                },
                onFailure: (err) => {
                    console.error('onFailure :', err);
                    reject(err);
                },
                newPasswordRequired: (data) => {
                    console.log('newPasswordRequired: ', data);
                    resolve(data);
                },
            });
        });
    };

    const logout = () => {
        const user = UserPool.getCurrentUser();
        if (user) {
            user.signOut();
            navigate(`/`);
        }
    }

    return <AuthContext.Provider value={{ authenticate, getSession, logout }}>
        {children}
    </AuthContext.Provider>;
};

export { Account, AuthContext };
