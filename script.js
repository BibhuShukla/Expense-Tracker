const balance = document.getElementById("balance");
 moneyPlus = document.getElementById("moneyPlus");
 moneyMinus = document.getElementById("moneyMinus");
 list = document.getElementById("list");
 form = document.getElementById("form");
 text = document.getElementById("text");
 amount = document.getElementById("amount");

 let transactions = [];

 form.addEventListener("submit", addTransaction);
 function addTransaction(e){
    e.preventDefault();

   const transtaion = {
    id: generateID(),
    text: text.value,
    amount: amount.value,
    };
   
   addTransactionDOM(transtaion);
   transactions.push(transtaion);

   updateTranscation();
   
   text.value = "";
   amount.value = "";
   init();
 }

 function generateID(){
    return Math.floor(Math.random() * 100000000);
 }

function addTransactionDOM(transtaion){
    const sign = transtaion.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transtaion.amount < 0 ? "minus" : "plus");

    item.innerHTML=`${transtaion.text} <div><span>${sign} $${Math.abs(
        transtaion.amount
    )}</span>
    <button class="delete" onclick="removeTransaction(${
        transtaion.id
    })">x<button>`;
    list.appendChild(item);
}

function removeTransaction(id) {
   transactions = transactions.filter((transaction) => transaction.id !== id);
   init();

}

function init() {
    list.innerHTML = "";
    if(transactions.length == 0){
        const item = document.createElement("li");
        item.innerHTML = "No Transaction";
        list.appendChild(item);
    }

    transactions.forEach(addTransactionDOM);
    updateTranscation();
}

function updateTranscation(){
    const amounts = transactions.map((transaction) => Number(transaction.amount)); // Ensure amount is a number
    console.log(amounts);

    
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);

    
    const expense = (
      amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}
