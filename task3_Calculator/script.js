class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement ){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement =currentOperandTextElement 
        this.clear()
    }

    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.op=undefined

    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }
    appendNum(num){
        if (num === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + num.toString()

    }
    
    chooseOp(op){
        if(this.currentOperand===('')) return 
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.op=op
        this.previousOperand =this.currentOperand
        this.currentOperand=''


    }
    compute(){

        let computation
        const prev = parseFloat(this.previousOperand) //convert strint to num
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.op) {
            case '+':
              computation = prev + current
              break
            case '-':
              computation = prev - current
              break
            case '*':
              computation = prev * current
              break
            case '÷':
              computation = prev / current
              break
            default:
              return
        }
        this.currentOperand = computation
        this.op = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(num) {
        const stringNumber = num.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }


    updateDisplay(){
    this.currentOperandTextElement .innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.op != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.op}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
    
}






const numBtn = document.querySelectorAll('[data-num]')
const opBtn = document.querySelectorAll('[data-op]')
const equlBtn = document.querySelector('[data-equl]')
const delBtn = document.querySelector('[data-del]')
const acBtn = document.querySelector('[data-ac]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement  = document.querySelector('[data-current-operand]')


const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement )

//loop over all btn nums
numBtn.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.appendNum(button.innerText) //going to either   2 3 etc
        calculator.updateDisplay()
    })
})

opBtn.forEach(button => {
    button.addEventListener('click',() =>{
        calculator.chooseOp(button.innerText) //going to either   2 3 etc
        calculator.updateDisplay()
    })
})

equlBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})





delBtn.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})




acBtn.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})