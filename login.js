document
  .querySelector(".login-button")
  .addEventListener("click", function (event) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email && !password) {
      alert("Please fill in your email and password.");
    } else if (!email) {
      alert("Please fill in your email.");
    } else if (!password) {
      alert("Please fill in your password.");
    } else if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
    } else {
      window.location.href = "./index.html";
    }
  });
