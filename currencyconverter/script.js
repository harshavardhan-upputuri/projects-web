
const BASE_URL =  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{from}/{to}.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for(let select of dropdowns){
    for (const currCode in countryList){
         let newOption = document.createElement("option");
         newOption.innerText = currCode;
         newOption.value= currCode;
         if(select.name === "from" && currCode === "USD"){
            newOption.selected='selected';
         }
         if(select.name === "to" && currCode === "INR"){
            newOption.selected='selected';
         }
         select.appendChild(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode =element.value;
    let countryCode = countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;
};

btn.addEventListener("click" , (evt)=>{
    evt.preventDefault();
    getExchangeRate();
});

 async function  getExchangeRate(){
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal <1){
        amtVal =1;
        amount.value="1";
    }
    const fromCurrency = fromCurr.value.toLowerCase();  
    const toCurrency = toCurr.value.toLowerCase();
    const url = ` https://v6.exchangerate-api.com/v6/90ceab7beb3c76a8b88e6fde/latest/${fromCurrency}`;
    const response = await fetch(url);
    const result = await response.json();
    
    let exchangeRate = result.conversion_rates[toCurr.value];
    let totalExchangeRate = (amtVal*exchangeRate).toFixed(2);
        
    msg.innerText =`${amtVal} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value}`;
}

window.addEventListener("load" ,() =>{
    getExchangeRate();
})