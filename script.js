const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");

if(menuBtn){
  menuBtn.addEventListener("click",()=>nav.classList.toggle("active"));
}
document.querySelectorAll(".nav a").forEach(link=>{
  link.addEventListener("click",()=>nav.classList.remove("active"));
});

document.querySelectorAll("[data-service]").forEach(link=>{
  link.addEventListener("click",()=>{
    const select=document.getElementById("service");
    if(select) select.value=link.dataset.service;
  });
});

const form=document.getElementById("bookingForm");
const result=document.getElementById("result");

if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const phone=document.getElementById("phone").value.trim();
    const car=document.getElementById("car").value.trim();
    const service=document.getElementById("service").value;

    result.hidden=false;
    result.textContent=
      "Заявка сформована! 🚗\n\n"+
      "Ім'я: "+name+"\n"+
      "Телефон: "+phone+"\n"+
      "Автомобіль: "+car+"\n"+
      "Послуга: "+service+"\n\n"+
      "Зараз форма працює як демонстраційна. Для реального отримання заявок потрібно підключити Telegram, email або CRM.";
    form.reset();
    result.scrollIntoView({behavior:"smooth",block:"center"});
  });
}
