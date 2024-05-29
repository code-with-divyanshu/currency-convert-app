const base_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updateExchangeRate();
});

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  const regex = /^[0-9]+$/;
  if (amtVal === "" || amtVal < 1 || !regex.test(amtVal)) {
    let para = document.querySelector(".exchange-rate");
    para.innerHTML = `Your Input: ${amtVal}:-> Please Provide right input`;
    para.style.color = "red";
    amtVal = 1;
    amount.value = "1";
  }

  const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  //   console.log(data);
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  //   console.log(rate);

  let finalAmt = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};
