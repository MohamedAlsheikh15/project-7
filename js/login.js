let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");

let loginForm = document.getElementById("login_button");

loginForm.addEventListener("click", function (e) {
    e.preventDefault();
    if (usernameInput.value === "" || passwordInput.value === "") {
        alert("من فضلك ادخل كل البيانات");
    } else {
        let storedUsername = localStorage.getItem("user");
        let storedPassword = localStorage.getItem("password");

        if (
            usernameInput.value.trim() === storedUsername &&
            passwordInput.value === storedPassword
        ) {
            if (!termsCheckbox.checked) {
                alert("يجب الموافقة على شروط الاستخدام أولاً.");
            } else {
            window.location.href = "index.html";
            }
        } else {
            alert("اسم المستخدم او كلمة المرور خطأ");
        }
    }
});