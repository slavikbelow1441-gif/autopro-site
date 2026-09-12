// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {

    nav.classList.toggle("active");

});


// Закрываем меню после нажатия на ссылку

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        nav.classList.remove("active");

    });

});


// ================= BOOKING FORM =================

const form = document.getElementById("bookingForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const car = document.getElementById("car").value;
    const service = document.getElementById("service").value;

    alert(
        "Дякуємо за заявку! 🚗\n\n" +
        "Ім'я: " + name + "\n" +
        "Телефон: " + phone + "\n" +
        "Автомобіль: " + car + "\n" +
        "Послуга: " + service + "\n\n" +
        "Ми зв'яжемося з вами найближчим часом."
    );

    form.reset();

});
