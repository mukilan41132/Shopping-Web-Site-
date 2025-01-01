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
                cardItem.quantity = cardItem.quantity + 1;
                cardItem.totalPrice = cardItem.totalPrice + product.price;
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
}