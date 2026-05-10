const express = require('express');
const router = express.Router();
const requestController = require('../controllers/reqsController');

router.post('/', requestController.createRequest);
router.get('/', requestController.getRequests);
router.delete('/:id', requestController.deleteRequest);

module.exports = router;
