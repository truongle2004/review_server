/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITokenService {
    generateToken(payload: any): string;
    verifyToken(token: string): any;
}