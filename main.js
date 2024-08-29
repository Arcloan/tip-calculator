let bill = document.querySelector("#total");
let custom = document.querySelector(".grid_button > input");
let n_people = document.querySelector("#n_people");
let reset = document.querySelector(".reset");
let grid_button = document.querySelector(".grid_button");
let tip_el = document.querySelector(".output_tip");
let total_el = document.querySelector(".output_total");
let error = document.querySelector(".error");

let arr = [bill, custom, n_people];


let validate = {
    validateBill : () => {return (bill.value !== "") && !(Number.isNaN(Number(bill.value)))},
    validatePeople: () => {return n_people.value !== "" && !(Number.isNaN(Number(n_people.value))) && 
        Number(n_people.value) === Math.round(Number(n_people.value)) && Number(n_people.value) !== 0},
    validateButton: () => {
        let custom = document.querySelector('.grid_button [type="text"]');
        return Array.from(grid_button.querySelectorAll('[type="checkbox"]')).some((item) => item.checked) || 
        (custom.value !== "" && !(Number.isNaN(Number(custom.value))));
        }
    }


function check_fields() {
    if (!validate.validateBill() || (!validate.validatePeople()) || (!validate.validateButton())) {
        tip_el.textContent = "";
        total_el.textContent = "";
        return;
    }
    let selected_button = document.querySelector(":checked") || document.querySelector("#button_15");
    let tip = Number(bill.value) * Number(selected_button.value) / 100;
    let total = Number(bill.value) + tip;
    let per_person_tip = Math.trunc(tip / Number(n_people.value) * 100) / 100;
    let per_person_total = Math.round(total / Number(n_people.value) * 100) / 100;
    tip_el.textContent = "$" + String(per_person_tip);
    total_el.textContent = "$" + String(per_person_total);
}

function select_button(e) {
    for (let btn of Array.from(grid_button.querySelectorAll('input[type="checkbox"]'))) {
        btn.checked = false;
    }
    e.preventDefault();
    if (e.target.nodeName == "LABEL") {
        let b = e.target.getAttribute("for");
        document.querySelector(`#${b}`).checked = true;
    }
    else {
        e.target.querySelector("input").checked = true;
    }
    custom.value = "";
    check_fields();
}

function select_custom(e) {
    for (let btn of Array.from(grid_button.querySelectorAll('input[type="checkbox"'))) {
        btn.checked = false;
    }
    check_fields();
}

reset.addEventListener("click", (e) => {
    bill.value = "";
    n_people.value = "";
    for (let btn of Array.from(grid_button.querySelectorAll('input[type="checkbox"'))) {
        btn.checked = false;
    }
    custom.value = "";
    tip_el.textContent = "";
    total_el.textContent = "";
    n_people.classList.remove("error");
    error.classList.add("hidden");
})

custom.addEventListener("click", select_custom);

n_people.addEventListener("change", (e) => {
    if (e.target.value == "0") {
        n_people.classList.add("error");
        error.classList.remove("hidden");
    }
    else {
        n_people.classList.remove("error");
        error.classList.add("hidden");
    }
})

arr.forEach((el) => {
    el.addEventListener("change", check_fields);
});

Array.from(grid_button.querySelectorAll("input")).forEach((el) => {
    el.addEventListener("change", check_fields);
});

Array.from(document.querySelectorAll(".button")).forEach((el) => {
    el.addEventListener("click", select_button);
})