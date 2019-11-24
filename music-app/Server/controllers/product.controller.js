const Product = require('../models/product.model');

//returns array of all products
exports.all_product_details = function(req, res){
    Product.find({}, 'name type loanPeroid quantity', function(err, products){
        if(err) return console.error(err);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(products);
    }); 
};

//desplay details of a product ?name=harry+potter
exports.product_details = function(req, res){
    Product.findOne({name: req.params.name}, function(err, product){
        if(err) return console.error(err);
        res.send(JSON.stringify(product));
    });
};

//create new product using data coming from a POST request
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name, //read name property from the body of the request
            type: req.body.type,
            loanPeroid: req.body.loanPeroid,
            quantity: 0,
        }
    );

    //save data to database
    product.save(function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Product Created Sucessfully');
        res.setHeader('Access-Control-Allow-Origin', '*');
    });
};

//update product quantity or loan peroid
exports.product_updateLP_post = function(req, res){
    Product.findOneAndUpdate({name: req.body.name}, {loanPeroid: req.body.loanPeroid},
        function (err){
            if (err){
                return console.error(err);
            }
            console.log('Product updated');
        });
};

//update product quantity or loan peroid
exports.product_updateQ_post = function(req, res){
    Product.findOneAndUpdate({name: req.body.name}, {quantity: req.body.quantity},
        function (err){
            if (err){
                return console.error(err);
            }
            console.log('Product updated');
        });
};

//delete product on post
exports.product_delete_post = function (req, res){
    Product.findOneAndRemove({name: req.body.name}, function(err){
        if(err){
            return console.error(err);
        }
        console.log('deleted sucessfully');
    });
};