let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    let totalQty = cart.reduce((acc,item)=>acc+item.quantity,0);
    el.innerText = totalQty;
  });
}

// Add to cart with quantity
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    const quantityInput = document.getElementById("quantity");
    const qty = parseInt(quantityInput.value) || 1;

    const product = {
      name: "Channel Extreme Home Perfume",
      price: 1200, // PKR price
      img: "full.jpg",
      quantity: qty
    };

    // Check if product already in cart
    const existingIndex = cart.findIndex(p => p.name === product.name);
    if(existingIndex >= 0){
      cart[existingIndex].quantity += qty;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${qty} Perfume(s) added to cart!`);
    renderCartItems();
  });
});

// Render cart items
function renderCartItems() {
  if(!document.getElementById("cart-items")) return;

  let cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" width="80">
      <span>${item.name}</span> - <strong>₨ ${item.price.toLocaleString()}</strong> 
      x ${item.quantity} = <strong>₨ ${(item.price*item.quantity).toLocaleString()}</strong>
      <button class="btn cancel-btn" data-index="${index}">Cancel</button>
    `;
    cartItemsDiv.appendChild(div);
    total += item.price * item.quantity;
  });

  document.getElementById("total").innerText = "Total: ₨ " + total.toLocaleString();

  // Cancel button
  document.querySelectorAll(".cancel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      let i = btn.getAttribute("data-index");
      cart.splice(i,1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    });
  });
}

// Checkout Form
if(document.getElementById("checkout-form")){
  document.getElementById("checkout-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    if(cart.length === 0){
      alert("Your cart is empty!");
      return;
    }
    alert("✅ Order placed successfully! We will contact you at 0321-5811901 for confirmation.");
    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    renderCartItems();
    window.location.href="index.html";
  });
}

updateCartCount();
renderCartItems();
