const { Router } = require('express');
const router = Router();

router.get('/',(req,res) => {
    const data = {
        "name" : "Abraham",
        "website" : "amr.com"
    };
    res.json(data);
});

module.exports = router;
