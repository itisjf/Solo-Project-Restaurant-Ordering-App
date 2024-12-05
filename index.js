// -------- IMPORT data.js --------

import { menuArray } from "./data.js"

// -------- RENDERING MENU ITEMS --------

const menuSection = document.getElementById("menu-section")
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

// -------- YOUR ORDER SECTION -------- 

// ---- creating an array of ordered items ----

let orderedItemsArray = []

menuSection.addEventListener('click', function(e) {
    if(e.target.classList.contains('plus-btn')) {
        orderedItemsArray.push({
            name: menuArray[e.target.id].name,
            price: menuArray[e.target.id].price
        })
        renderOrder()
    }
})

// ---- rendering order ----

const orderedItemsList = document.getElementById("ordered-items-list")
const totalPrice = document.getElementById("total-price")
const yourOrderSection = document.getElementById("your-order-section")
const thanksMessage = document.getElementById("thanks-message")

function renderOrder(){
    // HIDING THANKS MESSAGE
    if(thanksMessage.style.display === "block") {
        thanksMessage.style.display = "none"
    }
    
    // EMPTY ARRAY CHECK / RENDERING ORDERED ITEMS LIST
    if (orderedItemsArray.length === 0) {
        yourOrderSection.style.display = "none"
    } else {
        yourOrderSection.style.display = "block"
        // RENDER ORDERED ITEMS LIST
        orderedItemsList.innerHTML = orderedItemsArray.map((item, index) => {
            return `
            <li data-index="${index}">
                <div class="ordered-item-control">
                    <h2>${item.name}</h2>
                    <button class="remove-btn">remove</button>
                </div>
                <p class="ordered-item-price">$${item.price}</p>
            </li>
            `
        }).join('')
        
        // RENDER TOTAL PRICE
        let sum = 0
        orderedItemsArray.forEach(item => sum += item.price)
        totalPrice.textContent = `$${sum}`    
    }
    
}

// ---- remove button ----

orderedItemsList.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn')) {
        const itemIndex = e.target.closest('li').getAttribute('data-index')
        orderedItemsArray.splice(itemIndex, 1)
        renderOrder()
    }
})

// -------- MODAL - PAYMENT -------- 

// ---- removing non-digit characters in numerical inputs ----

// HTMLCollection of numerical inputs
const numericalInputs = document.getElementsByClassName('numerical-input')

// convertion of the HTMLCollection into an array
const numericalInputsArray = Array.from(numericalInputs)

numericalInputsArray.forEach(numInput => {
    numInput.addEventListener("input", function(){
        // replace non-digit characters
        this.value = this.value.replace(/[^0-9]/g, '');
    });
})

// ---- modal open / modal close ----

const modalOverlay = document.getElementById("modal-overlay")
const completeOrderBtn = document.getElementById("complete-order-btn")
const modalCloseBtn = document.getElementById("modal-close-btn")
const body = document.body
let lastFocusedElement = ''
    
completeOrderBtn.addEventListener('click', () => {
    modalOverlay.style.display = "flex"
    body.style.overflow = "hidden"  // disable background scrolling, when modal form opens
    lastFocusedElement = document.activeElement // stores lastFocusedElement, when modal opens
    modalOverlay.querySelector('input').focus() // focus first input field in modal
})

modalCloseBtn.addEventListener('click', () => closeModal())

function closeModal(){
    modalOverlay.style.display = "none"
    body.style.overflow = ""    // restores background scrolling, when modal form closes
    lastFocusedElement.focus()  // restores focus to last focused element
}

// ---- payment form data ----

const paymentForm = document.getElementById("payment-form")

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    closeModal()
    
    orderedItemsArray = [] // clearing ordered items array
    
    yourOrderSection.style.display = "none"
    
    const paymentFormData = new FormData(paymentForm)
    const customersName = paymentFormData.get('customersName')

    renderThanksMessage(customersName)
})

// -------- THANKS MESSAGE --------

// ---- render thanks message ----

function renderThanksMessage(customersName){    
    thanksMessage.textContent = `Thanks, ${customersName}! Your order is on its way!`
    thanksMessage.style.display = "block"
}
