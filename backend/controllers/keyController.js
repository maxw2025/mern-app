const Key = require('../models/keyModel');
const mongoose = require('mongoose');

//get all keys
const getKeys = async (req, res) => {
    const user_id = req.user._id;
    const keys = await Key.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(keys);
};

//get a single key
const getKey = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such key' });
    }

    const key = await Key.findById(id);

    if (!key) {
        return res.status(404).json({ error: 'No such key' });
    }

    res.status(200).json(key);
};

const createKey = async (req, res) => {
    const { title, password, name } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!password) {
        emptyFields.push('password');
    }
    if (!name) {
        emptyFields.push('name');
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: 'Please fill in all the fields', emptyFields });
    }

    //add doc to db
    try {
        const user_id = req.user._id;
        const newKey = await Key.create({ title, password, name, user_id });
        res.status(200).json(newKey);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//delete a key
const deleteKey = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such key' });
    }

    const key = await Key.findOneAndDelete({ _id: id });

    if (!key) {
        return res.status(404).json({ error: 'No such key' });
    }

    res.status(200).json(key);
};

//update a key
const updateKey = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such key' });
    }

    const key = await Key.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!key) {
        return res.status(404).json({ error: 'No such key' });
    }

    res.status(200).json(key);
};

module.exports = {
    createKey,
    getKey,
    getKeys,
    deleteKey,
    updateKey
};