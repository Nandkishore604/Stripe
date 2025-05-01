const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const stripe = require("stripe")('');

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Amount must be a positive number.' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            message: 'Payment intent created successfully',
        });

    } catch (error) {
       // console.error('Stripe error:', error.message);

        return res.status(500).json({
            success: false,
            error: 'Failed to create payment intent',
            details: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});