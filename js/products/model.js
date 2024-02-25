
export default class Model {
    constructor() {
        this.products = []
    }

    async loadProducts() {
        const response = await fetch('./js/products.json')
        this.products = await response.json()

        for (const product of this.products) {
            product.counter = 1
        }

    }

    getProduct(id) {
        const product = this.products.find(function(item){
            return item.id === id
        })
        return product
    }

    updateCounter(id, action) {

        const product = this.getProduct(id)

        if (action === 'plus') {
            ++product.counter
        }

        if (action === 'minus' && product.counter > 1) {
            --product.counter
        }

        return product
    }

    resetCounter(product) {
        product.counter = 1
    }
}