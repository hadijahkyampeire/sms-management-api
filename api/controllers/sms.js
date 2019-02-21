const { pool } = require('../utils/database');

const sendMessage = (request, response) => {
  const { sender, receiver, message, status } = request.body;
  console.log(request.body);
  const sender_contact = pool.query(
    'SELECT phonenumber FROM contacts.columns WHERE phonenumber = $1',
    [sender],
    () => {
      if (!sender_contact) {
        return response.status(400).send({ message: 'You need to first create a contact' });
      }
    }
  );

  const contact_id = pool.query(
    'SELECT contact_id FROM contacts WHERE phonenumber = $1',
    [sender],
    () => {
      console.log(sender_contact, contact_id, '......');
    }
  );
  console.log(sender_contact, contact_id, '###');
  if (!sender_contact) {
    return response.status(400).send({ message: 'You need to first create a contact' });
  }

  if (!receiver && !message) {
    return response.status(400).send({ message: 'All fields are required' });
  }
  pool.query(
    'INSERT INTO messages (sender, receiver, message, status, contact_id) VALUES ($1, $2, $3, $4, $5)',
    [sender, receiver, message, status, contact_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({
        status: 'success',
        message: `Message sent from  ${sender} to ${receiver}`
      });
    }
  );
};

module.exports = {
  sendMessage
};
