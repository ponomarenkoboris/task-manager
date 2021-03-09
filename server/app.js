const app = require('express')();
const mongo = require('mongoose');
const router = require('./routes/router.js');

const PORT = process.env.PORT || 666;

app.use(router)

async function startApp() {
    try {
        // await mongo.connect('<claster url>', {
        //     useNewUrlParser: true,
        //     useFindAndModify: false,
        //     useUnifiedTopology: true
        // })
        app.listen(PORT, () => {
            console.log(`====================== server port: ${PORT} =======================`);
        });
    } catch (error) {
        console.error(error);
    }
}

startApp();