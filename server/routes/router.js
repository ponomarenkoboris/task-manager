const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/', (req, res) => {
    console.log('hi');
})

module.exports = router;