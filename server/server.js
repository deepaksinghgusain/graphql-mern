const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.json({
        data: 'you hit rest endpoints'
    })
});

//Port
app.listen(process.env.PORT,() => {
    console.log(`listening on port on ${process.env.PORT}`);
})
