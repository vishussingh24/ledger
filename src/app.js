const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json()); //iska matlab hai ki app ke andar json body ko parse karne ke liye middleware use kar rahe hain, jisse client se aane wale json data ko easily access kar sakte hain
app.use(express.urlencoded({ extended: true })); //iska matlab hai ki app ke andar urlencoded body ko parse karne ke liye middleware use kar rahe hain, jisse client se aane wale form data ko easily access kar sakte hain


module.exports = app;
