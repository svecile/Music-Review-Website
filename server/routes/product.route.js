const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');

router.get('/getAll', product_controller.all_product_details);//get all books and cds
router.get('/:name', product_controller.product_details);
router.post('/create', product_controller.product_create);
router.post('/updateLoanPeroid', product_controller.product_updateLP_post);
router.post('/updateQuantity', product_controller.product_updateQ_post);
router.post('/delete', product_controller.product_delete_post);

module.exports = router;