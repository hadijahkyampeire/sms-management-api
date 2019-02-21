const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const contacts = require('./api/controllers/contacts');
const messages = require('./api/controllers/sms');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/contacts', contacts.getContacts);
app.get('/contacts/:id', contacts.getContactById);
app.post('/contacts', contacts.createContact);
app.put('/contacts/:id', contacts.updateContact);
app.delete('/contacts/:id', contacts.deleteContact);

app.post('/messages', messages.sendMessage);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
