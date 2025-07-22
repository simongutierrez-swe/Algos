/*
PROMPT:
    - Create a shopping cart that has the folloing methods
        * Add Item
        * Remove Item
        * Get Total
        * Apply Coupons
*/

let shoppingCart = new Map();
let couponBook = new Map();

function addItem(name, price) {
    if (shoppingCart.has(name)) {
        const item = shoppingCart.get(name);
        shoppingCart.set(name, {quantity: item.quantity + 1, price: item.price});
    } else {
        shoppingCart.set(name, {quantity: 1, price});
    }
}

function removeItem(name) {
    if (!shoppingCart.has(name)) {
        console.log('Item does not exist!');
        return;
    }

    const item = shoppingCart.get(name);

    if (item.quantity === 1) {
        shoppingCart.delete(name);
        console.log(`All ${name}s are removed!`);
    } else {
        shoppingCart.set(name, {quantity: item.quantity - 1, price: item.price });
        console.log(`A ${name} was removed!`);
    }
}

function addCoupon(name, coupon) {
    couponBook.set(name, coupon);
}

function applyCoupon(name, itemPrice) {
    const discount = couponBook.get(name) || 0;

    return itemPrice - itemPrice * discount;
}

function getTotal(cart){
    let total = 0;

    for (const [name, item] of cart) {
        total += item.quantity * applyCoupon(name, item.price)
    }

    console.log(total);
    return total;
}


addItem('apple', '2.50');
addItem('pear', '3.50');
addItem('apple', '2.50');
console.log(shoppingCart);

removeItem('apple');
console.log(shoppingCart);

removeItem('pear');
console.log(shoppingCart);

removeItem('bannana');
console.log(shoppingCart);

addCoupon('apple', 0.50);

getTotal(shoppingCart);

