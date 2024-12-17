const mongodb = require('../DataBaseConnection/MongoDbConnection');
const MongoObjectID = require('mongodb');
class Product {

    constructor(product) {

        this.title = product.title;
        this.summary = product.summary;
        this.price = +product.price;
        this.description = product.description;
        this.image = product.image;
        this.updateimagedata();
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

        return new Product(product)
    }
    static async findAllProduct() {
        const products = await mongodb.getDb().collection('products').find().toArray();
        return products.map(function (productDocument) {
            return new Product(productDocument)
        })
    }

    updateimagedata() {
        this.imagePath = `product-data/image/${this.image}`;
        this.imageUrl = `/product/assets/images/${this.image}`;
    }
    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        }

        if (this.id) {
            const ProId = new MongoObjectID.ObjectId(this.id);
            if (!this.image) {
                delete productData.image
            }

            await mongodb.getDb().collection('products').updateOne({ _id: ProId }, { $set: productData })
        } else {
            await mongodb.getDb().collection('products').insertOne(productData)
        }
    }

    async replaceImage(newImage) {
        this.image = newImage;
        this.updateimagedata();
    }
    deletebyProductId() {
        const ProId = new MongoObjectID.ObjectId(this.id);
        return mongodb.getDb().collection('products').deleteOne({ _id: ProId })
    }
}

module.exports = Product;