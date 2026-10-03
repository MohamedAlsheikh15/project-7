//-------------------the  products -------------------

let fruits = [
    {
        id: 1,
        img: "images/orange.png",
        name: "طبق برتقال 1 كيلو",
        price: 70,
        Category: "فاكهة"
    },
    {
        id: 2,
        img: "images/Apples.png",
        name: "طبق تفاح 1 كيلو",
        price: 140,
        Category: "فاكهة"
    },
    {
        id: 3,
        img: "images/avocado juice.png",
        name: "زجاجه 1 ليتر افوكادو ",
        price: 249,
        Category: "عصير"

    },
    {
        id: 4,
        img: "images/avocado.png",
        name: "طبق افوكادو 1 كيلو",
        price: 199,
        Category: "فاكهة"
    },
    {
        id: 5,
        img: "images/dates.png",
        name: "طبق بلح 1 كيلو",
        price: 99,
        Category: "فاكهة"
    },
    {
        id: 6,
        img: "images/Kiwi.png",
        name: "طبق كيلوي 1 كيلو",
        price: 299,
        Category: "فاكهة"
    },
    {
        id: 7,
        img: "images/orange juice.png",
        name: "زجاجه 1 ليتر برتقال ",
        price: 119,
        Category: "عصير"
    },
    {
        id: 8,
        img: "images/pineapple.png",
        name: "حببة اناناس 1 كيلو",
        price: 189,
        Category: "فاكهة"
    },
    {
        id: 9,
        img: "images/Strawberry juice.png",
        name: "زجاجه 1 ليتر فروله",
        price: 70,
        Category: "عصير"
    },
]
// ------------------------ElEmint------------------------
let Products = document.querySelector(".Products");
//-------------------------- داله رسم المنتجات التلقائيه---------------------
function display() {
    let y = fruits.map((x) => {
        return `
            <li>
                <img src="${x.img}" alt="orange">
                 <h2>${x.name}</h2>
                 <p> السعر: ${x.price} ج.م </p>
                 <p> الصنف: ${x.Category} </p>
                 <div class="buttons">
                    <i class="fa-solid fa-heart" id="favorite-${x.id}" onclick="addFavorite(${x.id})"></i>
                    <button class="btn" id="cart-btn-${x.id}" onclick="addCart(${x.id})"><i id="cart-icon-${x.id}" class="fa fa-cart-plus" 
                    style="font-size:17px; color:greenyellow"></i> اضف للعربه</button>
                </div>
            </li>
        ` ;
    }).join("");
    Products.innerHTML = y;
}
display()
// ---------------------- CART ICON-----------------------------------
let Icart = document.querySelector(".fa-cart-shopping")
let list = document.querySelector(".list")

Icart.addEventListener("click", function () {
    if (list.style.display == "flex") {
        list.style.display = "none"
    } else {
        list.style.display = "flex"
    }
})

// ----------------------------رسم المنتجات ف القائمه--------------------------------
let addprodact = localStorage.getItem("prodact") ? JSON.parse(localStorage.getItem("prodact")) : [];
// addddddddddddddddddddddddddddddddddCart
function addCart(id) {

    if (localStorage.getItem("user")) {
        let x = fruits.find((item) => { return item.id === id });

        //some  السطر التالي بقوله تشوف النتج مضاف الاول ولا لا بترجع صح او خطا لو منتج واحد موجود ع الاقل
        if (!addprodact.some((item) => { return item.id === x.id })) {
            let product = { ...x, quantity: 1 };

            addprodact.push(product)
            changeCartButton(id);
            localStorage.setItem("prodact", JSON.stringify(addprodact))
            let html = `   <div class="prodact">
                        <div class="naame">
                            <p>:اسم المنتج</p>
                            <p style="color: blueviolet;">${product.name}</p>
                        </div>
                        <div class="pric">
                            <p> :السعر</p>
                            <br>
                            <p id="pris-${product.id}">${product.price} L.E</p>
                        </div>
                        <div class="calculator">
                            <i class="fa-solid fa-circle-minus" onclick="decrease(${product.id})"></i>
                            <p id="num-${product.id}">${product.quantity}</p>
                            <i class="fa-solid fa-circle-plus" onclick="increase(${product.id})"></i>
                        </div>
                    </div>` ;
            list.insertAdjacentHTML("afterbegin", html);





            updateCartCount();
            Redrawing(addprodact);
        }
    } else {
        window.location = "login.html";
    }
}
// -----------------المفضله --------------------------- *************************************************************************
let favorites = localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [];
function addFavorite(id) {
    if (!localStorage.getItem("user")) {
        window.location = "login.html";
        return;
    }
    let product = fruits.find((item) => {
        return item.id === id;
    });
    //some  السطر التالي بقوله تشوف النتج مضاف الاول ولا لا بترجع صح او خطا لو منتج واحد موجود ع الاقل
    if (!favorites.some((item) => {
        return item.id === id;
    })) {

        favorites.push(product);
    } else {
        favorites = favorites.filter(function (item) {
            return item.id !== id;
        });
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    changeColorFav(favorites);

}
// ---------------------------------------
// داله حفظ المنتجات لو عملت تحديث للصفحه 
function Redrawing(arry) {
    let html = arry.map((x) => {
        return `   <div class="prodact">
                        <div class="naame">
                            <p>:اسم المنتج</p>
                            <p style="color: blueviolet;">${x.name}</p>
                        </div>
                        <div class="pric">
                            <p> :السعر</p>
                            <br>
                            <p id="pris-${x.id}">${x.price} L.E </p>
                        </div>
                        <div class="calculator">
                            <i class="fa-solid fa-circle-minus" onclick="decrease(${x.id})"></i>
                            <p id="num-${x.id}">${x.quantity}</p>
                            <i class="fa-solid fa-circle-plus" onclick="increase(${x.id})"></i>
                        </div>
                    </div>`
    }).join("")
    list.innerHTML = `
        <div class="view">
            <a href="cart.html">شاهد كل المنتجات</a>
            <a href="#" id="Clear-all">حذف الكل</a>
        </div>
    `;
    list.insertAdjacentHTML("afterbegin", html);
    updateCartCount();
    changeColorFav(favorites)
    
    // --------------------في حالة تحديث الصفحة عديلي علي كل ازاز المنتجات وظبطهم ع الحد> او الاضافه حسب اللي في اللوكل استورج متخرن عندي----------------------
    function changeCartButtons(array) {
        array.forEach(function (item) {
            let button = document.querySelector(`#cart-btn-${item.id}`);
            if (button) {
                button.innerHTML = `<i style="font-size:17px; color:greenyellow" class="fa-solid fa-trash-can"></i> حذف من العربة `;
                button.style.backgroundColor = "red"
                button.setAttribute("onclick", `removeFromCart(${item.id})`);
            }
            
        });
    }
    changeCartButtons(addprodact);

}
Redrawing(addprodact)
//-------------------------داله حذف كل المنتجات من القائمه--------------------------------
let ClearAll = document.getElementById("Clear-all")

ClearAll.addEventListener("click", function (e) {
    e.preventDefault();

    addprodact = [];
    favorites = [];

    localStorage.removeItem("prodact");
    localStorage.removeItem("favorites");

    list.innerHTML = `<div class="view"><a href="cart.html">شاهد كل المنتجات</a> <a href="#" id="Clear-all">حذف الكل</a></div>`;
    document.querySelector(".number-produc").innerHTML = 0;
    display();
});
//---------------------------- دوال الكميه --------------------------------
// داله زياده الكميه
function increase(id) {
    let product = addprodact.find(item => item.id === id);
    product.quantity++;

    document.querySelector(`#pris-${id}`).innerHTML = product.price * product.quantity + " L.E";
    document.querySelector(`#num-${id}`).innerHTML = product.quantity;

    localStorage.setItem("prodact", JSON.stringify(addprodact));

    updateCartCount();
}
// داله تنقيص الكميه 
function decrease(id) {
    let product = addprodact.find(item => item.id === id);
    if (product.quantity > 1) {
        product.quantity--;

        document.querySelector(`#pris-${id}`).innerHTML = product.price * product.quantity + " L.E";
        document.querySelector(`#num-${id}`).innerHTML = product.quantity;

        localStorage.setItem("prodact", JSON.stringify(addprodact));

        updateCartCount();
    }
}
// داله تزويد رقم العربه
function updateCartCount() {
    let total = 0;

    addprodact.forEach(function (product) {
        total += product.quantity;
    });

    document.querySelector(".number-produc").innerHTML = total;
}
// -----------دوال اضافيه لتغير الاستيل -----------------------
function changeColorFav(array) {

    document.querySelectorAll(".fa-heart").forEach(function (heart) {
        heart.style.color = "";
    });

    array.forEach(function (item) {

        let heart = document.querySelector(`#favorite-${item.id}`);
        // عملنا ايف هنا علشان لو المنتج مش موجود ميعملش ايرور وهو ممكن يكون مش موجود ف حالة البحث فعلا
        if (heart) {
            heart.style.color = "red";
        }
    });
}

// ------------------sarich------------------
const searchInput = document.getElementById("serich");
const searchBtn = document.getElementById("searchBtn");
const searchType = document.querySelector("#searchType select");

searchBtn.addEventListener("click", function () {

    let searchValue = searchInput.value.toLowerCase().trim();

    let result = fruits.filter(function (fruit) {

        if (searchType.value === "name") {
            return fruit.name.toLowerCase().includes(searchValue);
        }

        if (searchType.value === "category") {
            return fruit.Category.toLowerCase().includes(searchValue);
        }

    });

    if (result.length === 0) {
        Products.innerHTML = `
            <h2>لا توجد نتائج</h2>
        `;
        return;
    }

    let html = result.map(function (x) {
        return `
            <li>
                <img src="${x.img}" alt="${x.name}">
                <h2>${x.name}</h2>
                <p>السعر: ${x.price} ج.م</p>
                <p>الصنف: ${x.Category}</p>

                <div class="buttons">
                    <i 
                        class="fa-solid fa-heart" 
                        style="color:green"
                        onclick="addFavorite(${x.id})">
                    </i>

                    <button class="btn" onclick="addCart(${x.id})">
                        <i class="fa fa-cart-plus"
                           style="font-size:17px; color:greenyellow">
                        </i>
                        اضف للعربة
                    </button>
                </div>
            </li>
        `;
    }).join("");

    Products.innerHTML = html;

    changeColorFav(favorites);
    ;
});

// // -----------------------------دالة تغير الزر--------------------------------
function changeCartButton(id) {

    let button = document.querySelector(`#cart-btn-${id}`);

    if (button) {
        button.innerHTML = `<i style="font-size:17px; color:greenyellow" class="fa-solid fa-trash-can"></i> حذف من العربة `;
        button.style.backgroundColor = "red"
        button.setAttribute("onclick", `removeFromCart(${id})`); //ببعت حدث جديد للزر
        Redrawing(addprodact)
    }

}
// -----------------------------داله حذف عنصر من القائمه--------------------------------
function removeFromCart(id) {

    addprodact = addprodact.filter(function (item) { return item.id !== id; });
    localStorage.setItem("prodact", JSON.stringify(addprodact));

    changeCartButtonBack(id);
    Redrawing(addprodact);
    updateCartCount();

}
// -----------------------------دالة تغير الزر للوراء--------------------------------
function changeCartButtonBack(id) {

    let button = document.querySelector(`#cart-btn-${id}`);

    if (button) {
        button.innerHTML = ` <i class="fa fa-cart-plus" style="font-size:17px; color:greenyellow"> </i> اضف للعربه`;
        button.style.backgroundColor = "blueviolet"

        button.setAttribute("onclick", `addCart(${id})`);
        Redrawing(addprodact);

    }

}

