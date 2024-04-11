document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const grossIncomeInput = document.getElementById('grossIncome');
    const extraIncomeInput = document.getElementById('extraIncome');
    const ageGroupSelect = document.getElementById('ageGroup');
    const deductionInput = document.getElementById('deduction');
    const grossIncome = parseFloat(grossIncomeInput.value);
    const extraIncome = parseFloat(extraIncomeInput.value);
    const ageGroup = ageGroupSelect.value;
    const deduction = parseFloat(deductionInput.value);
    let showModal = true;
    console.log(grossIncomeInput)
    if (!isNumericAndGreaterThanZero(grossIncomeInput.value)) {
        displayError(grossIncomeInput, "Please enter a valid numeric value greater than 0");
        showModal= false;
    } else {
        hideError(grossIncomeInput);
    }
 
    // Validate Extra Income
    if (extraIncomeInput.value && !isNumericAndGreaterThanZero(extraIncomeInput.value)) {
        displayError(extraIncomeInput, "Please enter a valid numeric value greater than 0");
        showModal= false;
    } else {
        hideError(extraIncomeInput);
    }
 
    // Validate Age Group
    if (!ageGroup) {
        displayError(ageGroupSelect, "Please select an age group");
        showModal= false;
    } else {
        hideError(ageGroupSelect);
    }
 
    // Validate Deduction
    if (deductionInput.value && !isNumericAndGreaterThanZero(deductionInput.value)) {
        displayError(deductionInput, "Please enter a valid numeric value greater than 0");
        showModal= false;
    } else {
        hideError(deductionInput);
    }
    if(showModal === true){
    const overallIncome = grossIncome + extraIncome - deduction;
    // Check if overall income is less than 8 Lakhs
    let taxAmount =0;
    if (overallIncome <= 800000) {
        console.log("No tax applicable");
    } else {
        // Calculate tax rate based on age group
        const taxRate = calculateTaxRate(overallIncome, ageGroup);
        // Calculate tax amount
        taxAmount = (overallIncome - 800000) * taxRate;
        console.log("Tax Amount:", taxAmount);
    }
    sessionStorage.setItem('overallIncome', taxAmount);
    document.getElementById("netamount").textContent = overallIncome - taxAmount;
    const modal = document.querySelector(".modal-overlay");
    modal.classList.remove("hide");
}
});
 
function calculateTaxRate(totalIncome, ageGroup) {
    if (ageGroup === "below40") {
        return 0.3;
    } else if (ageGroup === "40to60") {
        return 0.4;
    } else if (ageGroup === "above60") {
        return 0.1;
    }
}
function isNumericAndGreaterThanZero(value) {
    return !isNaN(value) && parseFloat(value) > 0;
}
function displayError(input, message) {
    console.log(message)
    console.log(input.nextElementSibling.nextElementSibling)
    const errorIcon = input.nextElementSibling.querySelector('.error-icon');
    const tooltip = input.nextElementSibling.nextElementSibling;
    // errorIcon.style.display = 'inline';
    console.log(tooltip)
    if (tooltip) {
    tooltip.textContent = message;
    tooltip.style.visibility = 'visible';
    }
}
 
function hideError(input) {
    const errorIcon = input.nextElementSibling;
    const tooltip = input.nextElementSibling.nextElementSibling;
    if(tooltip){
        console.log(tooltip)
    // errorIcon.style.display = 'none';
    tooltip.style.visibility = 'hidden';
    }
}
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        hideError(this);
    });
});
// function setErrorFor(input, message) {
//     const formControl = input.parentElement; // Get the parent element of the input
//     const errorDiv = formControl.querySelector('.error-message'); // Find the error message div
//     // Add error message to the error div
//     errorDiv.innerText = message;
//     // Add error class to the parent element
//     formControl.classList.add('error');
// }
// function setSuccessFor(input) {
//     const formControl = input.parentElement; // Get the parent element of the input
//     const successDiv = formControl.querySelector('.error-message'); // Find the success message div
//     successDiv.innerText = '';
//     formControl.classList.remove('error');
// }
const openBtn = document.querySelector(".open-modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-modal-btn");
 
 
 
function closeModal(e, clickedOutside) {
    if (clickedOutside) {
        if (e.target.classList.contains("modal-overlay"))
            modal.classList.add("hide");
    } else modal.classList.add("hide");
}
 
// openBtn.addEventListener("click", openModal);
modal.addEventListener("click", (e) => closeModal(e, true));
closeBtn.addEventListener("click", closeModal);