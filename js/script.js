//Konstanten aus Objekten ansprechen und einsetzen
document.getElementById("chf1").innerHTML = franken;
document.getElementById("eur1").innerHTML = euro;
document.getElementById("usd1").innerHTML = dollar;

document.getElementById("chf2").innerHTML = franken;
document.getElementById("eur2").innerHTML = euro;
document.getElementById("usd2").innerHTML = dollar;



//HTML Objekte werden in JavaScript initialisiert
initialCurrency = document.querySelector(".from select"),
    afterCurrency = document.querySelector(".to select"),
    button = document.querySelector("form button");

//EventListener wird auf den Button und das Window gesetzt
window.addEventListener("load", () =>{
    getExchangeRateFromApi();
});
button.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRateFromApi();
});

//Icon werden geholt und auf Klick wird die Währung umgewechselt und gerechnet
const icon = document.querySelector(".fa-exchange-alt");
icon.addEventListener("click", ()=>{
    let tempCode = initialCurrency.value;
    initialCurrency.value = afterCurrency.value;
    afterCurrency.value = tempCode;
    getExchangeRateFromApi();
})

//Zuerst werden die Ausgewählten Währungen aus dem DOM hinausgelesen und dann werden sie validiert.
//Dannach wird ein fetch auf die Untergelegene URL geamcht wenn dies fertig ist wird es in JSON umgewandelt.
//und wenn dies auch fertig ist, wird der Exchangerate aus den gefetchten Daten hinausgelesen und damit den neue Wert ausgerechnet.
function getExchangeRateFromApi(){
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    const amount = document.querySelector("form input");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Berechne Devisenkurs...";
    let url = "https://v6.exchangerate-api.com/v6/a1707610938339cde017aa42/latest/" + initialCurrency.value;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[afterCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = amountVal + " " + initialCurrency.value + " = " + totalExchangeRate + " " + afterCurrency.value;
    });
}
