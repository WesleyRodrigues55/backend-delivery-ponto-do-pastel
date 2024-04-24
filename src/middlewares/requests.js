import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

export default (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
};