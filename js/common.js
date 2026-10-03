let divLog = document.querySelector(".div-log");
let divHidden = document.querySelector(".div-hidden");
let user = document.querySelector("#user");
if (localStorage.getItem("user")) {
    divLog.style.display = "none";
    divHidden.style.display = "flex";
    user.innerHTML += localStorage.getItem("user");

}

let logOut = document.querySelector("#log-out");
logOut.addEventListener("click", function () {
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1000);
});

