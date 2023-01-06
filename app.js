const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const user = require('./routes/signupRoute');
const teacher = require('./routes/teacherRoute');

const globalErrorHandler = require('./controller/errorController');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

app.use('/user', user);
app.use('/teacher', teacher);
app.use(globalErrorHandler);

module.exports = app;
