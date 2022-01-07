const { Router } = require('express')
const router = Router()
// Order Modal
const Order = require('../models/order')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Order.find()
    .select("product quantity _id") // select use to preview which key value I want to fetch from db
    .populate('product', 'name') // this will fetch data from product table and will onlye get <name>
    .exec()
    .then(data => {
        const response = {
            count: data.length,
            products: data
        }
        res.status(200).json(response)
    })
    .catch(err => console.error(err))
})

router.post('/', (req, res, next) => {
  const {quantity, productId} = req.body
  Product.findById(productId)
  .exec()
  .then(() => {
    const order = new Order({
       quantity,
       product: productId
    })
    order.save()
    .then((data) => {
        res.status(201).json({
            messsage: "Hi buddy I'm Order",
            data
        })
    })
    .catch(error => res.status(500).json({
        error
    }))
  })
  .catch(error => res.status(500).json({
      message: "product Id not found",
      error
  }))
    
})

module.exports = router