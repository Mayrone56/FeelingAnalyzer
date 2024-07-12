var express = require('express');
var router = express.Router();

//Module nodejs Sentiment 
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
// var result = sentiment.analyze('Cats are stupid.');
// console.dir(result);

//ROUTE POST
router.post('/analyze', (req, res) => {
    console.log("req.body", req.body)
    const result = sentiment.analyze(req.body.message);
    if (req.body.message && result) {
        res.json({ result: true, message: result, score: result.score });
        return;
    }
    res.json({ result: false })
})

module.exports = router;
