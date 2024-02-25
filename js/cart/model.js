
export default class Model {
    constructor() {
        this.cart = []
        this.loadCartFromLocalStorage()
    }

    loadCartFromLocalStorage() {

        const data = localStorage.getItem('cart')
        if (data) {
            this.cart = JSON.parse(data)
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart))
    }

    addToCart(product) {

        let productInCart

        productInCart = this.cart.find(function (productInCart){
            return productInCart.id === product.id
        })

        if (productInCart) {
            productInCart.counter = productInCart.counter + product.counter
        } else {
            // Т.к. в JS все ссылочное, чтобы не было продуктов с одинаковыми счетчиками, делаем копию
            const newProduct = JSON.parse(JSON.stringify(product))
            this.cart.push(newProduct)
        }

        this.saveToLocalStorage()
    }

    getTotalCartPrice() {

        let totalPrice = 0

        this.cart.forEach(function (item) {
            totalPrice = totalPrice + item.price * item.counter
        })

        return totalPrice
    }

    updateCounterInCart(id, action) {

        let productInCart

        productInCart = this.cart.find(function (product){
            return id === product.id
        })

        if (action === 'plus') {
            ++productInCart.counter
        }

        if (action === 'minus' && productInCart.counter > 0) {
            --productInCart.counter
        }

        if (productInCart.counter === 0) {

            const index = this.cart.findIndex(function (item){
                return item.id === productInCart.id
            })

            this.cart.splice(index, 1)
        }

        this.saveToLocalStorage()

        return productInCart
    }
}