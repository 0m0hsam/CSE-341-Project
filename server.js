const express = require('express');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and Server is running on http://localhost:${port}`);
        });
    }
});
