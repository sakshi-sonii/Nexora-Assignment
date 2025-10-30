import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] as string | undefined;
    const token = authHeader ? authHeader.split(' ')[1] : undefined;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        // attach user to req (loose typing)
        (req as any).user = user;
        next();
    });
};

// alias for compatibility
export const authenticate = authenticateToken;

export const generateToken = (user: any) => {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
};