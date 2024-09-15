const express = require('express');
const { getItems, createItem, updateItem, deleteItem, getItemswithoutsort } = require('../controller/itemController');
const authMiddleware = require('../middleware/authreq');

const router = express.Router();

router.get('/getitems', authMiddleware, getItemswithoutsort);
router.get('/items', authMiddleware, getItems);  // Get items with pagination and sorting
router.post('/items', authMiddleware, createItem);  // Create a new item
router.put('/items/:id', authMiddleware, updateItem);  // Update an item
router.delete('/items/:id', authMiddleware, deleteItem);  // Delete an item

module.exports = router;
