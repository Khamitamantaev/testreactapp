const express = require("express");
require('dotenv').config();
const app = express();
var bodyParser = require('body-parser')
const db = require("./models");
db.sequelize.sync();
const Contact = db.contact

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const PORT = process.env.PORT;

const cors = require("cors")

app.use(cors());

app.post('/contact', (req, res) => {
    console.log(req.body)


    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
    });

    contact
        .save(contact)
        .then((result) => {
            res.send(result)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Data."
            });
        });
})

app.get('/contacts', async (req, res) => {
    const contacts = await Contact.findAll()
    res.send(contacts)
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});