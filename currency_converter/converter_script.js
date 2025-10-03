const form = document.getElementById("currency_converter");
    const fromCurrency = document.getElementById("from_currency");
    const toCurrency = document.getElementById("to_currency");
    const fromUnit = document.getElementById("from_unit");
    const fromUnitImg = document.getElementById("from_unit_img");
    const toUnit = document.getElementById("to_unit");
    const toUnitImg = document.getElementById("to_unit_img");

    fromCurrency.addEventListener("change", function() {
    const symbolsImg = {
        USD: '<img src="img/dollar.png" alt="dollar" width="25px"/>',
        EUR: '<img src="img/euro.png" alt="euro" width="25px"/>',
        GBP: '<img src="img/pound.png" alt="pound" width="25px"/>',
        CNY: '<img src="img/yuan.png" alt="yuan" width="25px"/>'
    };
    fromUnitImg.innerHTML = symbolsImg[fromCurrency.value] || "";
    fromUnit.textContent = fromCurrency.value || "";})
    
    toCurrency.addEventListener("change", function() {
    const symbolsImg = {
        USD: '<img src="img/dollar.png" alt="dollar" width="25px"/>',
        EUR: '<img src="img/euro.png" alt="euro" width="25px"/>',
        GBP: '<img src="img/pound.png" alt="pound" width="25px"/>',
        CNY: '<img src="img/yuan.png" alt="yuan" width="25px"/>'
    };
    toUnitImg.innerHTML = symbolsImg[toCurrency.value] || "";
    toUnit.textContent = toCurrency.value || "";})

    form.addEventListener("submit", async function calculate(event) {
    
    event.preventDefault();
    const fromAmount = parseFloat(document.getElementById("from_amount").value);
    
        if (isNaN(fromAmount) || fromAmount < 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (fromCurrency.value === toCurrency.value) {
           document.getElementById("result").textContent = `${(fromAmount).toFixed(2)}`;
    }  
    else{
    try {
        const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(fromCurrency.value)}&symbols=${encodeURIComponent(toCurrency.value)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[toCurrency.value];
        const toAmount = rate * fromAmount;
        document.getElementById("result").textContent = `${toCurrency.value} ${toAmount.toFixed(2)}`;
    } catch (error) {
        alert("Error fetching exchange rate.");
        console.error(error);
    }
}
});        