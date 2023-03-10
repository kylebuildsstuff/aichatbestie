import jwt from 'jsonwebtoken';
import { HASURA_ROLE } from '$lib/shared/shared.type';

export const createJwt = (body: Record<string, any>, secret: string): string => {
  const token = jwt.sign(body, secret, {
    expiresIn: '1d'
  });
  return token;
};

/**
 * https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html
 */
export const createJwtClaims = (userId: string, role = HASURA_ROLE.USER) => {
  const claims = {
    ['https://hasura.io/jwt/claims']: {
      'x-hasura-default-role': role,
      'x-hasura-allowed-roles': ['user', 'hasura'],
      'x-hasura-user-is-anonymous': 'false',
      'x-hasura-user-id': userId
    }
  };

  return claims;
};
