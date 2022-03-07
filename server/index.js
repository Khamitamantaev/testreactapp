const express = require("express");
require('dotenv').config();

const db = require("./models");
db.sequelize.sync();
const Contact = db.contact

const PORT = process.env.PORT;

const app = express();

app.post('/contact', (req, res) => {
    console.log(req.body)
    // if (!req.body.data) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    // }

    // const contact = new Contact({
    //     data: req.body.data,
    // });

    // contact
    //     .save(data)
    //     .then((data) => {
    //         res.send({
    //             shareCode: hash,
    //             adminCode: hashadmin
    //         })
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Data."
    //         });
    //     });

    res.send('Contact created')
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