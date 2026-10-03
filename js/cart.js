let cart = localStorage.getItem("prodact")
    ? JSON.parse(localStorage.getItem("prodact"))
    : [];

let container = document.querySelector(".cart-products");


// ----------------------------------------------
// رسم الكارت

function renderCart() {

    if (cart.length === 0) {

        container.innerHTML = `
            <h2>عربة التسوق الخاصة بك فارغة</h2>
        `;

        return;
    }

    let html = cart.map(function (product) {

        return `
            <div class="cart-product">

                <img src="${product.img}" alt="${product.name}">

                <div class="cart-details">

                    <h3>${product.name}</h3>

                    <p>السعر: EGP ${product.price}</p>

                    <div class="calculator">

                        <i
                            class="fa-solid fa-circle-minus"
                            onclick="decrease(${product.id})">
                        </i>

                        <p id="num-${product.id}">
                            ${product.quantity}
                        </p>

                        <i
                            class="fa-solid fa-circle-plus"
                            onclick="increase(${product.id})">
                        </i>

                    </div>

                    <p id="pris-${product.id}">
                        السعر الكلي:
                        EGP ${product.price * product.quantity}
                    </p>

                    <button onclick="removeProduct(${product.id})">
                    <i class="fa-solid fa-trash-can"></i>
                        حذف المنتج
                    </button>

                </div>

            </div>
        `;

    }).join("");

    container.innerHTML = html;
}


// ----------------------------------------------
// حساب السعر الكلي لكل المنتجات

function calculateTotal() {

    let total = 0;

    cart.forEach(function (product) {
        total += product.price * product.quantity;
    });

    return total;
}


// ----------------------------------------------
// عرض السعر الكلي للكارت

function updateTotal() {

    let total = calculateTotal();

    document.querySelector("#totalPrice").innerHTML = total;
}


// ----------------------------------------------
// حذف منتج

function removeProduct(id) {

    cart = cart.filter(function (product) {
        return product.id !== id;
    });

    localStorage.setItem("prodact", JSON.stringify(cart));

    renderCart();
    updateTotal();
    updateCartCount();
}


// ----------------------------------------------
// تزويد الكمية

function increase(id) {

    let product = cart.find(function (item) {
        return item.id === id;
    });

    product.quantity++;

    document.querySelector(`#num-${id}`).innerHTML =
        product.quantity;

    document.querySelector(`#pris-${id}`).innerHTML =
        `السعر الكلي: EGP ${product.price * product.quantity}`;

    localStorage.setItem(
        "prodact",
        JSON.stringify(cart)
    );

    updateTotal();
    updateCartCount();
}


// ----------------------------------------------
// تنقيص الكمية

function decrease(id) {

    let product = cart.find(function (item) {
        return item.id === id;
    });

    if (product.quantity > 1) {

        product.quantity--;

        document.querySelector(`#num-${id}`).innerHTML =
            product.quantity;

        document.querySelector(`#pris-${id}`).innerHTML =
            `السعر الكلي: EGP ${product.price * product.quantity}`;

        localStorage.setItem(
            "prodact",
            JSON.stringify(cart)
        );

        updateTotal();
        updateCartCount();
    }
}


// ----------------------------------------------
// تزويد رقم العربية

function updateCartCount() {

    let total = 0;

    cart.forEach(function (product) {
        total += product.quantity;
    });

    document.querySelector(".number-produc").innerHTML = total;
}


// --------------------رسم المفضله--------------------------
let favorites = localStorage.getItem("favorites")? JSON.parse(localStorage.getItem("favorites")): [];
function renderFavorites() {

    let container = document.querySelector(".favorite-products");

    if (favorites.length === 0) {

        container.innerHTML = `
            <h3>لا توجد عناصر مفضلة بعد</h3>
        `;

        return;
    }

    let html = favorites.map(function(product) {

        return `
            <div class="favorite-card">

                <img src="${product.img}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>EGP ${product.price} :السعر</p>

                <button onclick="removeFavorite(${product.id})">
                   <i class="fa-solid fa-trash-can"></i>
                </button>

            </div>
        `;

    }).join("");

    container.innerHTML = html;
}
// ---------------دالة حذف عنصر من المفضلة--------------------------
function removeFavorite(id) {

    favorites = favorites.filter(function(product) {
        return product.id !== id;
    });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}








// تشغيل الصفحة
renderFavorites();
renderCart();
updateTotal();
updateCartCount();
