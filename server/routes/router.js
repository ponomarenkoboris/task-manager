const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/', (req, res) => {
    console.log('hi');
});

router.get('/TaskTracker', (req, res) => {

});

router.post('/Tasktracker', (req, res) => {

});

router.get('/welcomToAppTS/:action', (req, res) => {

});

module.exports = router;