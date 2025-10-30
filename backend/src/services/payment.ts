import { PaymentIntent } from 'stripe';
import { Request, Response } from 'express';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req: Request, res: Response) => {
    const { amount, currency, paymentMethodId } = req.body;

    try {
        const paymentIntent: PaymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.status(200).json({
            success: true,
            paymentIntent,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};