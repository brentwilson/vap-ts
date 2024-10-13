const { get } = require("http");

async function addtocart(product_id) {
  // get the product details
  let productData = await axios.get(`api/product/${product_id}`);
  let product = {
    id: productData.data.id,
    name: productData.data.name,
    sku: productData.data.sku,
    image: productData.data.image,
    lot_size: productData.data.lot_size,
  };
  let cart = getcart();
  if (cart == null) {
    cart = [];
  }
  // check if the product is already in the cart
  let index = cart.findIndex((item) => item.id == product.id);
  if (index != -1) {
    cart[index].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  // check cart size
  document.getElementById("cart-count").innerHTML(cart.length);

  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function removefromcart(product_id) {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  let index = cart.findIndex((item) => item.id == product_id);
  if (index != -1) {
    cart[index].quantity -= 1;
    if (cart[index].quantity == 0) {
      cart.splice(index, 1);
    }
  }
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function clearcart() {
  localStorage.removeItem("cart");
  document.getElementById("cart-content").innerHTML = "";
}

function getcart() {
  let cart = JSON.parse(sessionStorage.getItem("cart"));
  return cart;
}

function buildCart() {
  let cart = getcart();
  let cartHTML = "";
  document.getElementById("cart-content").innerHTML = cartHTML;
  for (let i = 0; i < cart.length; i++) {
    cartHTML += `<div class="cart-item">
      <div class="cart-item-image"><img src="/static/images/products/${cart[i].image}" width="50"></div><div class="cart-item-name">${cart[i].name}</div>
      <div class="cart-item-remove" onclick="removefromcart(${cart[i].id})">Remove</div>`;
  }
  document.getElementById("cart-content").innerHTML = cartHTML;
}

function openCart() {
  buildCart();
  $(".cart-window").fadeIn("slow");
}

function closeCart() {
  $(".cart-window").fadeOut("slow");
  document.getElementById("cart-content").innerHTML = "";
}
