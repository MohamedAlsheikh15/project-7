// عرفنا متغيرات ومسكنا اماكن اللي المستخدم بيدخل بيانته فيها علشان نخدها ونخذنها بعد كدا 
let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirm-password");
let signupForm = document.getElementById("sign_up");

signupForm.addEventListener("click", function (e) {
    e.preventDefault();
    if (usernameInput.value === "" || emailInput.value === "" || passwordInput.value === "" || confirmPasswordInput.value === "") {
        alert("منم فضلك اكمل البيانات");
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        alert("كلمة السر غير متطابقه");
    } else {
        localStorage.setItem("user", usernameInput.value);
        localStorage.setItem("email", emailInput.value);
        localStorage.setItem("password", passwordInput.value);

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1000);

    }
});

