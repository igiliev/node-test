import express from 'express';
import mongoose from 'mongoose';
import keys from './config/keys.js';

mongoose.connect(keys.mongoURI);

export const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT);