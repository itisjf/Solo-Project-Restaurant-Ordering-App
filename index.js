import { menuArray } from "./data.js"
const menuSection = document.getElementById("menu-section")

// RENDERING MENU ITEMS
// todo: iterate over the array, add the html to 1 string, set string as .innerHTML

let menuHTML = ''

menuArray.forEach(item => {
    menuHTML += `
            <div class="item-box">
                <div class="item-info">
                    <p class="item-img">${item.emoji}</p>
                    <div class="item-details">
                        <h2 class="item-title">${item.name}</h2>
                        <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
                <button id="${item.id}" class="plus-btn">+</button>
            </div>
    `
})

menuSection.innerHTML = menuHTML

// YOUR ORDER SECTION ---- CREATE AN ARRAY OF ORDERED ITEMS
// pridat "+" buttonom id-cka, ziskat id-cko kliknuteho buttonu pomocou e.target.id

let orderedItemsArray = []

menuSection.addEventListener('click', function(e){
    if(e.target.classList.contains('plus-btn')) {
        orderedItemsArray.push({
            name: menuArray[e.target.id].name,
            price: menuArray[e.target.id].price
        })
        renderOrder()
    }
})

// YOUR ORDER SECTION ---- RENDER ORDER

const orderedItemsList = document.getElementById("ordered-items-list")
const totalPrice = document.getElementById("total-price")
const yourOrderSection = document.getElementById("your-order-section")
const thanksMessage = document.getElementById("thanks-message")

renderOrder()

function renderOrder(){
    if(thanksMessage.style.display === "block") {
        thanksMessage.style.display = "none"
    }
    // EMPTY ARRAY CHECK
    if (orderedItemsArray.length === 0) {
        yourOrderSection.style.display = "none"
    } else {
        yourOrderSection.style.display = "block"
        // RENDER ORDERED ITEMS LIST
        orderedItemsList.innerHTML = orderedItemsArray.map((item, index) => `
            <li data-index="${index}">
                <div class="ordered-item-control">
                    <h2>${item.name}</h2>
                    <button class="remove-btn">remove</button>
                </div>
                <p class="ordered-item-price">$${item.price}</p>
            </li>
        `).join('')
        
        // RENDER TOTAL PRICE
        let sum = 0
        orderedItemsArray.forEach(item => sum += item.price)
        totalPrice.textContent = `$${sum}`    
    }
    
}

// YOUR ORDER SECTION ---- REMOVE BUTTON

orderedItemsList.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn')) {
        const itemIndex = e.target.closest('li').getAttribute('data-index')
        orderedItemsArray.splice(itemIndex, 1)
        renderOrder()
    }
})

// MODAL - CARD DETAILS SECTION ---- Replace non-digit characters in numerical inputs

const numericalInputs = document.getElementsByClassName('numerical-input') // this will return me HTML collection
const numericalInputsArray = Array.from(numericalInputs) // this will convert the HTMLCollection returned by getElementsByClassName into an array,

numericalInputsArray.forEach(numInput => {
    numInput.addEventListener("input", function(){
        // Replace non-digit characters
        this.value = this.value.replace(/[^0-9]/g, '');
    });
})

// MODAL - appear/hide

const modalOverlay = document.getElementById("modal-overlay")
const completeOrderBtn = document.getElementById("complete-order-btn")
const modalCloseBtn = document.getElementById("modal-close-btn")
const body = document.body
let lastFocusedElement = ''
    
completeOrderBtn.addEventListener('click', () => {
    modalOverlay.style.display = "flex"
    body.style.overflow = "hidden"  // disable background scrolling, when modal form opens
    
    // set focus, when modal opens
    lastFocusedElement = document.activeElement
    // console.log(lastFocusedElement)
    modalOverlay.querySelector('input').focus() // focus first input in modal
})

modalCloseBtn.addEventListener('click', () => {
    modalOverlay.style.display = "none"
    body.style.overflow = ""    // restores background scrolling, when modal form closes
    
    lastFocusedElement.focus() // restore focus to last focused element
})

// MODAL - payment form data

// const payBtn = document.getElementById("pay-btn")
const paymentForm = document.getElementById("payment-form")

paymentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const customersName = paymentFormData.get('customersName')
    
    renderThanksMessage(customersName)
    
    modalOverlay.style.display = "none"
    body.style.overflow = ""    // restores background scrolling, when modal form closes
    lastFocusedElement.focus() // restore focus to last focused element
    
    // ordered items array clearance
    orderedItemsArray = []
    // renderOrder()
    yourOrderSection.style.display = "none"
})

// THANKS MESSAGE - render thanks message

function renderThanksMessage(customersName){
    // const thanksMessage = document.getElementById('thanks-message')
    
    thanksMessage.textContent = `Thanks, ${customersName}! Your order is on its way!`
    thanksMessage.style.display = 'block'
}


// task: make Total price work ✅
// task: rename function to "render your order" ✅
// task: make Your order display="none", when order list is empty ✅
// task: nastylovat modal ✅
// task: JS for modal - appear/hide/submit-pay ✅
// task: nastylovat finalnu hlasku ✅
// task: ziskat hodnotu (meno) z formularu ✅
// task: vypisat finalnu hlasku ✅
// task: ked submitnem objednavku, premazat staru objednavku ✅
// task: pozriet sa na: TypeError: undefined is not an object (evaluating 'menuArray[e.target.id].name') ✅
// task: rovnako ako je spraveny remove btn, spravit aj + btn ✅
// task: restore scrolling (in Safari) after submitting a form - check ChatGPT answer
// task: remove Thanks message, after submitting an order and start choosing new items ✅
// task: possibly adjust width to max-width
