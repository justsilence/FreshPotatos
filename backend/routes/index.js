var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send({'success': "post test"})
})

router.post('/', (req, res) => {
    var body = req.body;
    body.success = "post test";
    res.send(body);
});

module.exports = router;