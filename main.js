var cartItems = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : [];
var listProduct = [];
const renderProduct = (products) => {
    for (const product of products) {
        document.getElementById("cards").innerHTML += `
        <div class="col hp">
      <div class="card h-100 shadow-sm">
        <a href="#">
          <img src="${product.img}" class="card-img-top" alt="product.title" />
        </a>
        <div class="card-body">
          <div class="clearfix mb-3">
            <p class="badge rounded-pill bg-success">${product.price}$</ơ>
          <h5 class="card-title">
            <a target="_blank" href="#" >${product.name}</a>
            <p>${product.desc}</p>
          </h5>

          <div class="d-grid gap-2 my-4">

            <button onclick="addCart(${product.id})" class="btn btn-warning bold-btn">add to cart</button>

          </div>
          <div class="clearfix mb-1">

            <span class="float-start"><a href="#"><i class="fas fa-question-circle"></i></a></span>

            <span class="float-end">
              <i class="far fa-heart" style="cursor: pointer"></i>

            </span>
          </div>
        </div>
      </div>
    </div>
    `
    }
}

const renderCart = (items) => {
    document.getElementById("cart-detail-list").innerHTML = ``
    for (const item of items) {
        document.getElementById("cart-detail-list").innerHTML += `
        <div class="d-flex justify-content-between align-items-center pe-4 mb-3">
            <div class="d-flex justify-content-start align-items-start">
              <img
                src="${item.product.img}"
                alt=""
              />
              <div>
                <h6>${item.product.name}</h6>
                <p>${item.product.price}$</p>
                <div class="d-flex justify-content-start align-items-center gap-3">
                  <div class="button" onclick="updateNumberItem(${item.product.id}, -1)">
                    <span>-</span>
                  </div>
                  <h4 class="countItem">${item.quantity}</h4>
                  <div class="button" onclick="updateNumberItem(${item.product.id}, 1)">
                    <span>+</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="icon" onclick="removeItem(${item.product.id})">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="#b0b0b0" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
          </div>
    `
    }

    if (items.length > 0) {
        document.getElementById('action-footer-sidebar').innerHTML = `
        <button onclick="purchase()" class="btn btn-warning bold-btn">Purchase</button>
            <button onclick="clearCart()" class="btn btn-warning bold-btn">Clear</button>
            `
        document.getElementById('totalMoney').innerHTML = cartItems.reduce((accumulator, item) => {
            return accumulator + item.quantity * Number(item.product.price);
        }, 0);
    }
    else {
        document.getElementById('totalMoney').innerHTML = 0;
        document.getElementById('action-footer-sidebar').innerHTML = ``
    }
}
const getData = async () => {
    fetch('https://63a6cb1759fd83b1bb380955.mockapi.io/api/v1/all')
        .then(response => response.json())
        .then(json => { listProduct = json; renderProduct(json) })
}
getData()
const toggleSidebar = (type) => {
    if (type === "close") {
        document.getElementById('cart-detail').style.width = 0
    }
    else {
        document.getElementById('cart-detail').style.width = '400px'
        renderCart(cartItems)
    }
}

const addCart = (productId) => {
    let cartItem = {
        product: listProduct.find(x => x.id == productId),
        quantity: 1
    }
    let index = cartItems.findIndex(x => x.product == cartItem.product)
    if (index > -1) {
        cartItems[index].quantity += 1
    }
    else {
        cartItems.push(cartItem)
    }
    localStorage.setItem('carts', JSON.stringify(cartItems))
}

const clearCart = () => {
    cartItems = []
    renderCart(cartItems)
}

const removeItem = (productId) => {
    cartItems = cartItems.filter(x => x.product.id != productId)
    renderCart(cartItems)
}
const updateNumberItem = (productId, quantity) => {
    let index = cartItems.findIndex(x => x.product.id == productId)
    cartItems[index].quantity += quantity
    document.getElementsByClassName('countItem')[index].innerHTML = cartItems[index].quantity
    if (cartItems[index].quantity == 0) {
        removeItem(productId)
    }
    document.getElementById('totalMoney').innerHTML = cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantity * Number(item.product.price);
    }, 0);
    localStorage.setItem('carts', JSON.stringify(cartItems))
}

const purchase = () => {
    clearCart();
    document.getElementById('notif').innerHTML = 'Thank you!'
}