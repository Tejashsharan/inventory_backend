const express = require('express');
const jwt_secret = 'shhthis!sp@ssword';
const jwt = require('jsonwebtoken');
const app = express();

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
