import { CognitoUserPool, ICognitoUserPoolData } from 'amazon-cognito-identity-js';

const poolData: ICognitoUserPoolData = {
//   UserPoolId: 'eu-north-1_dfc3eyvoq',
 UserPoolId: 'eu-north-1_BQBKxomNY',
//   ClientId: '5ghmmjdaj8v4kc797o8s8gk2j'
  ClientId: 'v31skmaqlqk5oihtcnsvn9l1l'
};

export default new CognitoUserPool(poolData);
