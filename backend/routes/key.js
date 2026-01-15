const express = require('express');

const { createKey,
    getKey,
    getKeys,
    deleteKey,
    updateKey } = require('../controllers/keyController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getKeys);

router.get('/:id', getKey);

router.post('/', createKey);

router.patch('/:id', updateKey);

router.delete('/:id', deleteKey);

module.exports = router;