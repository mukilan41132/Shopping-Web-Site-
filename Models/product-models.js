const mongodb = require('../DataBaseConnection/MongoDbConnection');
const MongoObjectID = require('mongodb');
class product {
    constructor(product) {
        this.title = product.title;
        this.Summary = product.Summary;
        this.price = +product.price;
        this.Description = product.Description;
        this.image = product.image;
        this.imagePath = `product-data/image/${product.image}`;
        this.imageUrl = `/product/assets/images/${product.image}`;
        if (product._id) {
            this.id = product._id.toString();
        }
    }
    static async findByProductId(ProductId) {
        let ProId;
        try {
            ProId = new MongoObjectID.ObjectId(ProductId);
        } catch (error) {
            error.code = 404;
            throw error;
        }
        const product = await mongodb.getDb().collection('products').findOne({ _id: ProId });
        if (!product) {
            const error = new Error('could not find product for this id');
            error.code = 404;
            throw error;
        }
        return product
    }
    static async findAllProduct() {
        const products = await mongodb.getDb().collection('products').find().toArray();
        return products.map(function (productDocument) {
            return new product(productDocument)
        })
    }


    async save() {
        const productData = {
            title: this.title,
            summary: this.Summary,
            price: this.price,
            description: this.Description,
            image: this.image
        }
        await mongodb.getDb().collection('products').insertOne(productData)
    }
}

module.exports = product;