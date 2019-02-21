'use strict';

const Pool = require('pg').Pool;
const dotenv = require('dotenv');

let date = require('date-and-time');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Contact Table// model Schemas
 */
const createContactTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      contacts(
        contact_id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        phonenumber VARCHAR(128) UNIQUE NOT NULL,
        created_date TIMESTAMP default current_timestamp,
        modified_date TIMESTAMP default current_timestamp
      )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Contact Table// model Schemas
 */

const createSmsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      messages(
        message_id SERIAL PRIMARY KEY,
        sender VARCHAR(128) UNIQUE NOT NULL,
        receiver VARCHAR(128) UNIQUE NOT NULL,
        message VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL DEFAULT 'not-sent',
        contact_id INT NOT NULL,
        FOREIGN KEY (contact_id) REFERENCES contacts (contact_id) ON UPDATE CASCADE ON DELETE CASCADE,
        created_date TIMESTAMP default current_timestamp,
        modified_date TIMESTAMP default current_timestamp
      )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Contact Table
 */
const dropContactTable = () => {
  const queryText = 'DROP TABLE IF EXISTS contacts CASCADE';
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Sms Table
 */
const dropSmsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS messages CASCADE';
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  createContactTable,
  createSmsTable,
  dropSmsTable,
  dropContactTable,
  pool
};

require('make-runnable');
