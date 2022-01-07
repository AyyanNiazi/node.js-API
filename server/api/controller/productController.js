const Product = require('../models/product')

exports.getProduct = (req, res, next) => {
    Product.find()
    .select("name price _id") // select use to preview which key value I want to fetch from db
    .exec()
    .then(data => {
        const response = {
            count: data.length,
            products: data
        }
        res.status(200).json(response)
    })
    .catch(err => console.error(err))
}