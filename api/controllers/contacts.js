const { pool } = require('../utils/database');

const getContacts = (request, response) => {
  pool.query('SELECT * FROM contacts ORDER BY contact_id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({
      status: 'success',
      data: results.rows,
      message: 'Retrieved ALL contacts'
    });
  });
};

const getContactById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM contacts WHERE contact_id = $1', [id], (error, results) => {
    if (!results) {
      return res.status(404).send({'message': 'Contact not found'});
    }
    response.status(200).json({
      status: 'success',
      data: results.rows,
      message: 'Retrieved one contact'
    });
  });
};

const createContact = (request, response) => {
  const { name, phonenumber } = request.body;
  if (!name && phonenumber) {
    return res.status(400).send({'message': 'All fields are required'})
  }

  pool.query(
    'INSERT INTO contacts (name, phonenumber) VALUES ($1, $2)',
    [name, phonenumber],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({
        status:'success',
        message:`Contact added with name: ${request.body.name}`});
    }
  );
};

const updateContact = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, phonenumber } = request.body;

  pool.query(
    'UPDATE contacts SET name = $1, phoneNumber = $2 WHERE contact_id = $3',
    [name, phonenumber, contact_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send({
        status:'success',
        message:`Contact updated with ID: ${id}`});
    }
  );
};

const deleteContact = (request, response) => {
  const id = parseInt(request.params.contact_id);

  pool.query('DELETE FROM contacts WHERE contact_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send({
      status:'success',
      message:`Contact deleted with ID: ${id}`});
  });
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
