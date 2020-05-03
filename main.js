//This file is built using ES5 constructor function

//Loan constructor
function Loan(name, aim, sum, date1, date2) {
    this.name = name
    this.aim = aim
    this.sum = sum
    this.date1 = date1
    this.date2 = date2
}




// UI Constructor 
function UI() {

}

UI.prototype.addLoanToList = function(loan) {
    const list = document.getElementById('loan-list')
    const row = document.createElement('tr')

    row.innerHTML = `
        <td>${loan.name}</td>
        <td>${loan.aim}</td>
        <td>${loan.sum}</td>
        <td>${loan.date1}</td>
        <td>${loan.date2}</td>
        <td><a href="#" class="delete">X</td>
    `;
    
    list.appendChild(row)
}

//Delete a loan
UI.prototype.deleteLoan = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}

//Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('name').value = ''
    document.getElementById('aim').value = ''
    document.getElementById('sum').value = ''
    document.getElementById('date1').value = ''
    document.getElementById('date2').value = ''
}




// addEventListeners
document.getElementById('loan-form').addEventListener('submit', function(e){
    //Get form values
    const name = document.getElementById('name').value
    const aim = document.getElementById('aim').value
    const sum = document.getElementById('sum').value
    const date1 = document.getElementById('date1').value
    const date2 = document.getElementById('date2').value

    //Instantiate loan
    const loan = new Loan(name, aim, sum, date1, date2)

    //Instantiate UI
    const ui = new UI()

    //Validating
    if(name == '' || aim == '' || sum == '' || date1 == '' || date2 == '') {
        alert(`Iltimos, kerakli joyni to'ldiring`)
    }
    else {
        //Add loan to list
    ui.addLoanToList(loan)

    //UI clear fields
    ui.clearFields()  
    }

    e.preventDefault()
})


//Event listener for delete 
document.getElementById('loan-list').addEventListener('click', function(e){

    const ui = new UI()
    ui.deleteLoan(e.target)

    e.preventDefault()
})