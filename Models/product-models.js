const mongodb = require('../DataBaseConnection/MongoDbConnection');

class product {
    constructor(product) {
        this.title = product.title;
        this.Summary = product.Summary;
        this.price = +product.price;
        this.Description = product.Description;
        this.image = product.image;
        this.imagePath = `product-data/image/${product.image}`;
        this.imageUrl = `product/assets/images/${product.image}`
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