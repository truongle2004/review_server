export const accessTokenCofig = {
    secret: process.env.ACCESSS_TOKEN_SECRET || 'mysecrtkeywillchangethis',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
};

