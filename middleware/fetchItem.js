const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config(); // Load .env file

const jwt_secret = process.env.JWT_SECRET; // Use environment variable for JWT secret

if (!jwt_secret) {
  console.error('JWT_SECRET environment variable not set.');
  process.exit(1);
}

const fetch = function (req, res, next) {
    const token = req.headers['auth-token']; // Corrected header access
    if (!token) {
        res.status(401).send("Please enter correct credentials");
    }
    try {
        const match = jwt.verify(token, jwt_secret);
        req.seller = match.seller;
        next();
    } catch (error) {
        res.status(401).send({ error: error });
    }
}

module.exports = fetch;
