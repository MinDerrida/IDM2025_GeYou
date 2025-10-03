const form = document.getElementById("currency_converter");
from_currency.addEventListener("change", function() {
    const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CNY: "¥"
    };
    document.getElementById("from_unit").textContent = symbols[from_currency.value] || "";})

form.addEventListener("submit", async function calculate(event) {

    event.preventDefault();

    const from_currency = document.getElementById("from_currency").value;
    const to_currency = document.getElementById("to_currency").value;
    const from_amount = parseFloat(document.getElementById("from_amount").value);
    
    if (typeof(from_amount) !== 'number' || isNaN(from_amount)) {
        alert("Please enter an amount.");
        return;
    }


    try {
        const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(from_currency)}&symbols=${encodeURIComponent(to_currency)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[to_currency];
        const to_amount = rate * from_amount;
         document.getElementById("result").textContent = `${to_currency} ${to_amount.toFixed(2)}`;
             

            } catch (error) {
                alert("Error fetching exchange rate.");
                console.error(error);
            }}
);