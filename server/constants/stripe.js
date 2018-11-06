const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_qHfMi691Q144qkm07r8Pzrkv'
    : 'sk_test_qHfMi691Q144qkm07r8Pzrkv';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
