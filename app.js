//This app js file is built using ES6 classes
class Loan {
    constructor(name, aim, sum, date1, date2) {
        this.name = name
        this.aim = aim
        this.sum = sum
        this.date1 = date1
        this.date2 = date2
    }
}

class UI {
    addLoanToList(loan) {   
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
    deleteLoan(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }
    clearFields() {
        document.getElementById('name').value = ''
        document.getElementById('aim').value = ''
        document.getElementById('sum').value = ''
        document.getElementById('date1').value = ''
        document.getElementById('date2').value = ''
    }
}

//Local storage class
class Store {
    static getLoans() {
        let loans;
        if(localStorage.getItem('loans') === null) {
            loans = []
        }
        else {
            loans = JSON.parse(localStorage.getItem('loans'))
        }
        return loans
    }
    
    static displayLoans() {
        const loans = Store.getLoans()

        loans.forEach( loan => {
            const ui = new UI
            ui.addLoanToList(loan)
        });
    }

    static addLoan(loan) {
        const loans = Store.getLoans()

        loans.push(loan)

        localStorage.setItem('loans', JSON.stringify(loans))
    }
    
    static removeLoan(date2) {
        const loans = Store.getLoans()

        loans.forEach(function(loan, index) {
            if(loan.date2  === date2) {
                loans.splice(index, 1)
            }
        });
        localStorage.setItem('loans', JSON.stringify(loans))
    }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayLoans)

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

    //Add to local storage
    Store.addLoan(loan) 

    //UI clear fields
    ui.clearFields()  
    }

    e.preventDefault()
})


//Event listener for delete 
document.getElementById('loan-list').addEventListener('click', function(e){

    const ui = new UI()
    //delete a loan
    ui.deleteLoan(e.target)

    //removing from local storage
    Store.removeLoan(e.target.parentElement.previousElementSibling.textContent) 


    e.preventDefault()
})