let select = document.querySelectorAll(".Currency");
let body = document.querySelector("body");
let p = document.querySelector("p");
let loader = document.querySelector(".loader");
let box = document.querySelector(".box");
// let bg = document.querySelector(".load");
async function start() {
  try {
    let res = await fetch("https://api.frankfurter.app/currencies");
    if (!res.ok) {
      throw new Error("API is Mistake Please Check");
    }
    let data = await res.json();
    displayDropdown(data);
  } catch (error) {
    // body.append(error.message);
    alert(error.message);
  }
}
start();
function displayDropdown(data) {
  let val = Object.entries(data);
  //   console.log(val);
  for (let i = 0; i < val.length; i++) {
    // console.log(val[i][0]);
    let op = `<option value="${val[i][0]}">${val[i][0]}</option>`;
    // console.log(op);
    select[0].innerHTML += op;
    select[1].innerHTML += op;
  }
}
const btn = document.querySelector(".btns");
const input_1 = document.querySelector(".input1");
btn.addEventListener("click", () => {
  curr1 = select[0].value;
  curr2 = select[1].value;
  //   console.log(curr1, curr2);
  inputs_1 = input_1.value;
  if (!input_1.value) {
    alert("Please Enter From Value");
    return;
  }
  if (curr1 == curr2) {
    // alert("Select Different Currency");
    p.style.display = "block";
    setTimeout(() => {
      p.style.display = "none";
    }, 1000);
  } else {
    currency(curr1, curr2, inputs_1);
  }
});
async function currency(curr1, curr2, inputs_1) {
  const host = await "api.frankfurter.app";
  if (inputs_1 >= 0) {
    loader.style.display = "block";
    box.style.display = "none";
    fetch(`https://${host}/latest?amount=${inputs_1}&from=${curr1}&to=${curr2}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //   console.log(Object.values(data.rates)[0]);
        let rate = Object.values(data.rates)[0];
        input_2 = document.querySelector(".input2");
        input_2.value = rate;
      })
      .catch((err) => {
        const h4 = document.querySelector("h4");
        if (select[0].value == "" || select[1].value == "") {
          h4.textContent = "Please Select Country ";
          setTimeout(() => {
            h4.textContent = "";
          }, 2000);
        } else if (err) {
          h4.textContent = "Network Issue or Please Check Country";
          setTimeout(() => {
            h4.textContent = "";
          }, 2000);
        }
      })
      .finally(() => {
        loader.style.display = "none";
        box.style.display = "block";
      });
  } else {
    alert("Not Using Negative Numbers");
  }
}
const btn2 = document.querySelector(".btn2");
btn2.addEventListener("click", () => {
  input_2.value = "";
  input_1.value = "";
  select[0].value = "";
  select[1].value = "";
});
