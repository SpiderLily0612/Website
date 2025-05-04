document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullName = signupForm.querySelector('input[type="text"]').value;
            const email = signupForm.querySelector('input[type="email"]').value;
            const password = signupForm.querySelector('input[type="password"]').value;

            const user = {
                fullName: fullName,
                email: email,
                password: password
            };

            localStorage.setItem("goldencrustUser", JSON.stringify(user));
            alert("Registration successful! You can now log in.");
            window.location.href = "login.html";
        });
    }


    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            const storedUser = JSON.parse(localStorage.getItem("goldencrustUser"));

            if (!storedUser) {
                alert("No registered user found. Please sign up first.");
                return;
            }


            if (email === storedUser.email && password === storedUser.password) {

                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "index home.html";
            } else {
                alert("Invalid credentials. Please try again.");
            }
        });
    }

   
    const loginLink = document.querySelector('a.login');
    if (loginLink) {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const storedUser = JSON.parse(localStorage.getItem("goldencrustUser"));
        const loginSpan = loginLink.querySelector('span');

        if (isLoggedIn === "true" && storedUser && loginSpan) {
            loginLink.href = "dashboard.html";
            loginSpan.textContent = `Hello! ${storedUser.fullName}`;
        } else if (loginSpan) {
            loginLink.href = "login.html";
            loginSpan.textContent = "Log In";
        }
    }

    const userDetails = document.getElementById("userDetails");
    if (userDetails) {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            window.location.href = "login.html"; 
        }

        const storedUser = JSON.parse(localStorage.getItem("goldencrustUser"));
        if (storedUser) {
            userDetails.innerHTML = `
                <h2>Welcome, ${storedUser.fullName}!</h2>
                <p>Email: ${storedUser.email}</p>
            `;
        }
    }


    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("isLoggedIn"); 
            window.location.href = "login.html";  
        });
    }


    const loginPage = document.getElementById("loginPage");
    if (loginPage && localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "index home.html"; 
    }
});
