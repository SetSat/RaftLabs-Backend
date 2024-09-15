const Item = require('../models/itemSchema');

const getItemswithoutsort = async (req, res) => {
    try {
        const items = await Item.find();
        if (!items) {
            return res.status(404).json({ message: 'No items found' });
        }
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
};

// Get all items with pagination and sorting
const getItems = async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    try {
        const items = await Item.find()
            .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalItems = await Item.countDocuments();
        res.json({ items, totalPages: Math.ceil(totalItems / limit), currentPage: Number(page) });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
};

// Create a new item
const createItem = async (req, res) => {
    const { name, description, price } = req.body;
    console.log('Request Body', req.body)
    const userid = req.user.user.id
    try {
        const newItem = new Item({ name, createdBy: userid, description, price });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error creating item', error: err.message });
    }
};

// Update an item
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, { name, description, price }, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: 'Error updating item', error: err.message });
    }
};

// Delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item', error: err.message });
    }
};

module.exports = { getItems, createItem, updateItem, deleteItem, getItemswithoutsort };
