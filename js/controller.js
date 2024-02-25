
import ProductsModel from "./products/model.js"
import * as productsView from "./products/view.js"

import CartModel from "./cart/model.js"
import * as cartView from "./cart/view.js"

const productsModel = new ProductsModel()
const cartModel = new CartModel()

async function init() {

    await productsModel.loadProducts()

    productsView.renderProducts(productsModel.products)

    cartView.renderCart(cartModel.cart)

    cartView.updateTotalPrice(cartModel.getTotalCartPrice())
}

init()

productsView.elements.productsContainer.addEventListener('click', function (e){

    let action = e.target.dataset.action

    if ( action === 'plus' || action === 'minus') {

        let productId = +e.target.closest('.card').dataset.id

        const product = productsModel.updateCounter(productId, action)

        productsView.updateCounter(product)

    }

    if ( action === 'add-to-cart') {

        let productId = +e.target.closest('.card').dataset.id

        const product = productsModel.getProduct(productId)

        cartModel.addToCart(product)

        cartView.renderCart(cartModel.cart)

        productsModel.resetCounter(product)

        productsView.updateCounter(product)

        const totalPrice = cartModel.getTotalCartPrice()

        cartView.updateTotalPrice(totalPrice)
    }
})

cartView.elements.cartWrapper.addEventListener('click', function (e){

    let action = e.target.dataset.action

    if (action === 'plus' || action === 'minus') {

        const productId = +e.target.closest('.cart-item').dataset.id

        const product = cartModel.updateCounterInCart(productId, action)

        if (product.counter > 0) {
            cartView.updateCounter(product)
        } else {
            cartView.removeItemFromCart(product)
        }

        const totalPrice = cartModel.getTotalCartPrice()

        cartView.updateTotalPrice(totalPrice)
    }
})