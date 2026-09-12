const ACCESS_KEY = "d94961a5-4b52-4062-9c55-670bb9a3c817";

const cars = {
  "BMW":["1 Series","2 Series","3 Series","4 Series","5 Series","6 Series","7 Series","X1","X2","X3","X4","X5","X6","X7"],
  "Mercedes-Benz":["A-Class","B-Class","C-Class","E-Class","S-Class","CLA","CLS","GLA","GLB","GLC","GLE","GLS"],
  "Audi":["A1","A3","A4","A5","A6","A7","A8","Q2","Q3","Q5","Q7","Q8"],
  "Volkswagen":["Golf","Polo","Passat","Jetta","Tiguan","Touareg","T-Roc","Transporter"],
  "Toyota":["Corolla","Camry","RAV4","Land Cruiser","C-HR","Yaris","Highlander"],
  "Honda":["Civic","Accord","CR-V","HR-V","Pilot","Jazz"],
  "Ford":["Focus","Fiesta","Mondeo","Kuga","Explorer","Mustang","Transit"],
  "Renault":["Clio","Megane","Logan","Duster","Sandero","Captur","Koleos"],
  "Skoda":["Fabia","Octavia","Superb","Rapid","Karoq","Kodiaq"],
  "Hyundai":["i20","i30","Elantra","Sonata","Tucson","Santa Fe","Kona"],
  "Kia":["Rio","Ceed","Cerato","K5","Sportage","Sorento","Niro"],
  "Nissan":["Micra","Qashqai","X-Trail","Juke","Leaf","Navara"],
  "Mazda":["2","3","6","CX-3","CX-5","CX-9","MX-5"],
  "Opel":["Corsa","Astra","Insignia","Mokka","Crossland","Grandland"],
  "Chevrolet":["Aveo","Cruze","Malibu","Captiva","Equinox","Tahoe"],
  "Lada":["Granta","Vesta","Niva","Priora","Kalina"],
  "Mitsubishi":["Lancer","ASX","Outlander","Pajero","L200"],
  "Subaru":["Impreza","Forester","Outback","Legacy","XV"],
  "Volvo":["S60","S90","V40","XC40","XC60","XC90"],
  "Lexus":["IS","ES","NX","RX","GX","LX"],
  "Jeep":["Renegade","Compass","Cherokee","Grand Cherokee","Wrangler"],
  "Peugeot":["208","308","508","2008","3008","5008"],
  "Citroën":["C3","C4","C5 Aircross","Berlingo"],
  "Fiat":["500","Punto","Tipo","Doblo","Ducato"],
  "Daewoo":["Lanos","Nexia","Matiz"],
  "ZAZ":["Sens","Lanos","Tavria","Slavuta"],
  "Інша марка":["Інша модель"]
};

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const modal = document.getElementById("carModal");
const carSelect = document.getElementById("carSelect");
const closeModal = document.getElementById("closeModal");
const brandList = document.getElementById("brandList");
const modelPanel = document.getElementById("modelPanel");
const modelList = document.getElementById("modelList");
const modelTitle = document.getElementById("modelTitle");
const backBrands = document.getElementById("backBrands");
const carText = document.getElementById("carText");
const carValue = document.getElementById("carValue");

function renderBrands(){
  brandList.innerHTML = "";
  Object.keys(cars).forEach(brand => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "brand-btn";
    b.textContent = brand;
    b.onclick = () => renderModels(brand);
    brandList.appendChild(b);
  });
  brandList.classList.remove("hidden");
  modelPanel.classList.add("hidden");
}
function renderModels(brand){
  brandList.classList.add("hidden");
  modelPanel.classList.remove("hidden");
  modelTitle.textContent = brand;
  modelList.innerHTML = "";
  cars[brand].forEach(model => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "model-btn";
    b.textContent = model;
    b.onclick = () => {
      const value = `${brand} ${model}`;
      carValue.value = value;
      carText.textContent = value;
      carSelect.classList.add("selected");
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden","true");
    };
    modelList.appendChild(b);
  });
}
carSelect.addEventListener("click", () => {
  renderBrands();
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
});
closeModal.addEventListener("click", () => modal.classList.remove("show"));
backBrands.addEventListener("click", renderBrands);
modal.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("show"); });
document.addEventListener("keydown", e => { if(e.key === "Escape") modal.classList.remove("show"); });

document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("serviceSelect").value = card.dataset.service;
    document.getElementById("booking").scrollIntoView({behavior:"smooth"});
  });
});

const dateInput = document.getElementById("dateInput");
dateInput.min = new Date().toISOString().split("T")[0];

const form = document.getElementById("bookingForm");
const statusBox = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if(!carValue.value){
    statusBox.textContent = "Будь ласка, оберіть марку та модель автомобіля.";
    statusBox.style.color = "#ff3b43";
    carSelect.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Надсилаємо...";
  statusBox.textContent = "Відправлення заявки...";
  statusBox.style.color = "#aaa";

  const formData = new FormData(form);
  formData.set("access_key", ACCESS_KEY);
  formData.set("car", carValue.value);
  formData.append("replyto", formData.get("email") || "");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    if(data.success){
      statusBox.textContent = "✅ Заявку успішно надіслано! Ми зв'яжемося з вами.";
      statusBox.style.color = "#54d17a";
      form.reset();
      carValue.value = "";
      carText.textContent = "Оберіть марку та модель";
      carSelect.classList.remove("selected");
    } else {
      throw new Error(data.message || "Помилка відправлення");
    }
  } catch(error){
    statusBox.textContent = "❌ Не вдалося надіслати заявку. Спробуйте ще раз або зв'яжіться з нами телефоном.";
    statusBox.style.color = "#ff3b43";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Надіслати заявку";
  }
});
