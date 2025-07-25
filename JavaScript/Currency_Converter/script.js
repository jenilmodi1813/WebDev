const BASE_URL =  "https://v6.exchangerate-api.com/v6/f82058057da3a9bf46e6712b/latest";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg  = document.querySelector(".msg");

for (let select of dropdowns) {
  for(let currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode; 
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected"
    }
    else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected"
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}



const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];  
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;  
    let img =  element.parentElement.querySelector("img");   
    img.src = newSrc                 
}

btn.addEventListener("click",async (eve) =>{
  eve.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if(amtval === "" || amtval < 1){
    amtval = 1;
    amount.value = "1";
  }
  


   const URL = `${BASE_URL}/${fromCurr.value}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();

    // Access the nested rate correctly
    let rate = data.conversion_rates[toCurr.value];
    let finalAmount = (amtval * rate).toFixed(2);

    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Something went wrong. Please try again.";
    console.error("Fetch error:", error);
  }
});