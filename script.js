import { handleInvalidEntry, createItem, addToShoppingList, deleteItem, removeFromShoppingList } from "./utilities.js";

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearListBtn = document.getElementById('clear')

const shoppingList = localStorage.getItem('shoppingList') ? JSON.parse(localStorage.getItem('shoppingList')) : [];

const filterInput = (input) => {
    if (input.value.length === 0) {
        handleInvalidEntry('Invalid: you need to type something..duh!', itemInput);
        return null;
    }

    if(input.value.length > 20) {
        handleInvalidEntry('Too many characters...you must be a writer!', itemInput);
        return null;
    }

    if(!/^[a-zA-Z]+$/.test(input.value)){
        handleInvalidEntry("No special characters...just letters!", itemInput);
        return null;
    }
}

const filterAndClearButton = (state) => {
    const fInput = document.querySelector('.filter');
    fInput.style.display = state;
    clearListBtn.style.display = state;
}

const loadItems = () => {
    if(shoppingList.length > 0) {
        shoppingList.forEach(item => createItem(item, itemList));
        filterAndClearButton('block');
    }
    shoppingList.length < 1 && filterAndClearButton('none');
}

const addItem = (e) => {
    e.preventDefault(); 
    filterInput(itemInput);

    if(itemInput.value !== '') {
        addToShoppingList(itemInput.value, shoppingList);
        createItem(itemInput.value, itemList);
        filterAndClearButton('block');
    }
};

const removeItem = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('fa-xmark')){
        e.target.closest('li').classList.add('fade-out');
        const item = e.target.closest('li').textContent.trim();
        removeFromShoppingList(item, shoppingList);
        deleteItem(e);
    }

    shoppingList.length < 1 && filterAndClearButton('none');
}

const clearItems = () => {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('shoppingList');
    filterAndClearButton('none');
}

// Event Listeners
window.onload = loadItems;
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearListBtn.addEventListener('click', clearItems);