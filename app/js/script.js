const form = document.getElementById("form");
const resetBtn = document.getElementById("resetBtn");
const percentageSelect = document.getElementById("button_select");

const tipText = document.getElementById("tip");
const totalText = document.getElementById("total");

let percentage = "5";
let bill = 0;
let numPeople = 0;

/*
* Helper Functions
* */
const validateAmount = (value) => {
    const posNumberPattern = /^\d+(\.\d{1,2})?$/;
    return posNumberPattern.test(value);
};


const validateData = () => {
    const billField = document.getElementById("bill");
    const numPeopleField = document.getElementById("num_people");
    const billErrorMessage = document.getElementById("bill-error");
    const numPeopleErrorMessage = document.getElementById("num-people-error");

    // invalid for empty fields
    if (isNaN(bill) || isNaN(numPeople)) {
        return false;
    }

    if (!validateAmount(bill)) {
        // invalid input for bill field
        billField.classList.add("error-field");
        billErrorMessage.classList.add("error-message");
        return false;

    } else if (!(numPeople>0 && Number.isInteger(numPeople))) {
        // invalid input for num people field
        billField.classList.remove("error-field");
        billErrorMessage.classList.remove("error-message");

        numPeopleErrorMessage.classList.add("error-message");
        numPeopleField.classList.add("error-field");
        return false;
    }

    // remove error state for valid input
    resetBtn.disabled = false;
    billErrorMessage.classList.remove("error-message");
    billField.classList.remove("error-field");
    numPeopleErrorMessage.classList.remove("error-message");
    numPeopleField.classList.remove("error-field");
    return true;
}


const computeTip = (bill, percentage, numPeople) => {
    return bill * percentage / 100 / numPeople;
};


const computeCost = (bill, percentage, numPeople) => {
    return bill / numPeople;
};


const handleChange = () => {
    // Tip Amount
    const tip = computeTip(bill, percentage, numPeople);
    tipText.innerHTML = Number(tip.toFixed(2));

    // Total
    const cost = computeCost(bill, percentage, numPeople);
    totalText.innerHTML = Number((cost + tip).toFixed(2));

}


const handleTipSelection = () => {
    const tips = new Set(["5", "10", "15", "25", "50"]);
    const customInputField = document.getElementById("option_custom");

    // remove all highlights
    for (const item of tips) {
        const tipInputField = document.getElementById("option_" + item);
        tipInputField.checked = false;
        tipInputField.classList.remove("selected");
    }

    if (tips.has(percentage)) {
        // add highlight for selected tip
        const tipInputField = document.getElementById("option_" + percentage);
        tipInputField.checked = true;
        tipInputField.classList.add("selected");

        customInputField.value = "";
        customInputField.classList.remove("selected");

    } else {
        // add highlight when custom field is selected
        customInputField.classList.add("selected");
    }
}

/*
* Event Listeners
* */
form.addEventListener("change", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    bill = parseInt(data.bill);
    numPeople = parseInt(data.num_people);

   if (validateData()) {
       handleChange();
   } else {
       tipText.innerHTML = "0.00";
       totalText.innerHTML = "0.00";
   }
});


percentageSelect.addEventListener("change", (e) => {
    e.preventDefault();
    if (e.target.value > 0) {
        percentage = e.target.value;
        handleTipSelection();
    }
});


resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    form.reset();
    percentage = "5";
    handleTipSelection();
    tipText.innerHTML = "0.00";
    totalText.innerHTML = "0.00";
});



