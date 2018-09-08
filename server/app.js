const express = require("express");

const app = express();

app.listen(1337, () => {
    console.log(`listening to requests on port 1337`);
});
