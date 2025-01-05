class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    addItem(product) {
        const cardItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price
        };
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product.id === product.id) {
                cardItem.quantity = item.quantity + 1;
                cardItem.totalPrice = item.totalPrice + product.price;
                this.items[i] = cardItem;

                this.totalQuantity++;
                this.totalPrice = this.totalPrice + product.price;
                return
            }
        }
        this.items.push(cardItem);
        this.totalQuantity++;
        this.totalPrice = this.totalPrice + product.price;
    }
    UpdateItem(productId, newQuantity) {
        console.log(newQuantity)
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.product.id === productId && newQuantity > 0) {
                const CartItem = { ...item };
                const quant = newQuantity - this.quantity;
                CartItem.quantity = newQuantity;
                CartItem.totalPrice = newQuantity * item.product.price;
                this.items[i] = CartItem;

                this.totalQuantity = this.totalQuantity + quant;
                this.totalPrice += quant * item.product.price;
                return{updatedItemPrice:CartItem.totalPrice};

            } else if (item.product.id === productId && newQuantity <= 0) {
                this.items.slice(i, 1);
                this.totalQuantity = this.totalQuantity - this.quantity;
                this.totalPrice -= this.totalPrice;
                return{updatedItemPrice:0};

            }
        }


    }
}

module.exports = Cart;