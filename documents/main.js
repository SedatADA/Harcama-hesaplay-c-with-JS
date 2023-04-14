const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const formBtn = document.querySelector("#ekleBtn");
const statusCheck = document.querySelector("#status-input");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");
//console.log(harcamaInput, fiyatInput, formBtn);
// izleme işlemleri
formBtn.addEventListener("click", addExpence);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);
// toplam state
let toplam = 0;
function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

function addExpence(e) {
  e.preventDefault();

  if (!fiyatInput.value || !harcamaInput.value) {
    alert("butonları doldurunuz");
    return;
  }

  // div oluşturma
  const harcamaDiv = document.createElement("div");

  // class ekleme
  harcamaDiv.classList.add("harcama");
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }
  // içeriğini ayarlama
  harcamaDiv.innerHTML = `
  <h2>${harcamaInput.value}</h2>
  <h2 id="value">${fiyatInput.value}</h2>
  <div class="buttons">
  <img id= "payment" src="/image/payment.png" alt="" />
  <img  id= "remove" src="/image/remove.png" alt=""  />
  </div>  
  `;

  // oluşan harcamayı listeye ekleme
  liste.appendChild(harcamaDiv);
  // toplam güncelle
  updateToplam(fiyatInput.value);
  // formu temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

function handleClick(e) {
  const element = e.target;
  if (element.id === "remove") {
    //tıklanılan elemanı alma
    const wrapperElement = element.parentElement.parentElement;

    // silinen elemanın fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;
    Number(deletedPrice);

    // silinenin fiyatını toplamdan çıkarma
    updateToplam(-Number(deletedPrice));

    //tıklanılan elemanı silme
    wrapperElement.remove();
  }
}

function handleFilter(e) {
  const items = liste.childNodes;
  items.forEach((items) => {
    switch (e.target.value) {
      case "all":
        items.style.display = "flex";
        break;
      case "payed":
        if (!items.classList.contains("payed")) {
          items.style.display = "none";
        } else {
          items.style.display = "flex";
        }
        break;
      case "not-payed":
        if (items.classList.contains("payed")) {
          items.style.display = "none";
        } else {
          items.style.display = "flex";
        }
        break;
    }
  });
}
