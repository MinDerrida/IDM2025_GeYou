const form = document.getElementById("currency_converter");
form.addEventListener("submit", async(event) =>{
    event.preventDefault();
    const from = document.getElementById("from_currency").value;
    const to = document.getElementById("to_currency").value;
    const from_amount = parseFloat(document.getElementById("from_amount").value);
    
    if (typeof(from_amount) !== 'number' || isNaN(from_amount)) {
        alert("Please enter an amount.");
        return;
    }

const unit_symbol = document.getElementById("from_unit");

const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CNY: "¥"
};

from.addEventListener("change", function() {
    const curreny_code = from.value;
    unit_symbol.textContent = symbols[curreny_code] || "?";
  });

    try {
        const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(from)}&symbols=${encodeURIComponent(to)}`;
        
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const rate = data.rates[to];
                const to_amount = rate * from_amount;
                document.getElementById("result").textContent = to_amount + " " + to;
            })
            .catch((error) => {
                alert("Error fetching exchange rate.");
                console.error(error);
            });
    } catch (error) {
        alert("An unexpected error occurred.");
        console.error(error);
    }
});