/**
 * Created by Tacademy on 2016-08-16.
 */
var mysql = require('mysql');
var async = require('async');

var dbConfig = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};