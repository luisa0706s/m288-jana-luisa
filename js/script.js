const dropList = document.querySelectorAll("form select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");
// Optionen Tag erstellen für Währungen
for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "CHF" ? "selected" : "" : currency_code == "EUR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
}


window.addEventListener("load", () =>{
   getExchangeRate();
});
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Berechne Devisenkurs...";
    let url = "https://v6.exchangerate-api.com/v6/5f37d6d73350eae3a5b6376d/latest/${fromCurrency.value}";
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = "${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}";
    });
}