const droplist = document.querySelectorAll(".drop-list select");
fromCurrency= document.querySelector(".from select"),
toCurrency= document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < droplist.length; i++) {
    for(currency_code in country_code){
        //selecting USD by default as FROM currency and INR as TO Currency 
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected": " ";
        }else if(i == 1){
            selected = currency_code == "INR" ? "selected": " ";
        }

        //creating option tag with passing currency code as text and value
       let optionTag = `<option value = "${currency_code}" ${selected}> ${currency_code} </option>`;
       //inserting optiond tag inside select tag
       droplist[i].insertAdjacentHTML("beforeend",optionTag)
    }
    droplist[i].addEventListener("change",e =>{
        loadFlag(e.target)
    })
}
function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src= `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`
        }
    }
}


window.addEventListener("load", e =>{
    getExchangeRate();
})

getButton.addEventListener("click", e =>{
    e.preventDefault();  //preventing from submitting
    getExchangeRate();
});

const exchnageIcon = document.querySelector(".drop-list .icon")
exchnageIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value=toCurrency.value
    toCurrency.value=tempCode
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();

})
//if user don't enter any value or enter 0 then the by default  1 value in the input box
function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateText = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1
    }
    exchangeRateText.innerText = "Getting the Exchange Rate..."
    let url = `https://v6.exchangerate-api.com/v6/633a2ab07d74486e6061ff94/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal * exchangeRate.toFixed(2))
       
        exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value} `
    })
}