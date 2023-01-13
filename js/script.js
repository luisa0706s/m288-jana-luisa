const droplist = document.querySelectorAll(".drop-list select"),
    getButton = document.querySelector("form button");
// Optionen Tag erstellen für Währungen
for (let i = 0; i < droplist.length; i++) {
    for(currency_code in laender_code){
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "NPR" ? "selected" : "";
        }
        let optionTag = <option value="${currency_code}" ${selected}>${currency_code}</option> ;
        // Optionen Tag in Select Tag einfügen
        droplist[i].insertAdjacentHTML("beforeend", optionTag);
    }
}