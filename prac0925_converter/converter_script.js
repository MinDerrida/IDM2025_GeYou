const form = document.getElementById("currency_converter");
form.addEventListener("submit", async function calculate() {

    calculate.preventDefault();

    const from_currency = document.getElementById("from_currency").value;
    const to_currency = document.getElementById("to_currency").value;
    const from_amount = parseFloat(document.getElementById("from_amount"));
    const unit_symbol = document.getElementById("from_unit").value;
    
    if (typeof(from_amount) !== 'number' || isNaN(from_amount)) {
        alert("Please enter an amount.");
        return;
    }

    const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CNY: "¥"
    };

    try {
        const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`;
        
        fetch(url)
            .then(function response(){
                 const rate = response.rates[to_currency];
                 const to_amount = rate * from_amount;
                document.getElementById("result").textContent = to_amount + " " + to;)
            }
             
               
            .catch((error) => {
                alert("Error fetching exchange rate.");
                console.error(error);
            });
    } catch (error) {
        alert("An unexpected error occurred.");
        console.error(error);
    }
});