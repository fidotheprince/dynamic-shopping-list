import { handleInvalidEntry, createItem, addToShoppingList, deleteItem, removeFromShoppingList } from "./utilities.js";

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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
        return null;ø
    }
}

const loadItems = () => {
    const shoppingListItems = JSON.parse(localStorage.getItem('shoppingList'));
    shoppingListItems.forEach(item => {
        createItem(item, itemList);
    });
}

const addItem = (e) => {
    e.preventDefault(); 
    filterInput(itemInput);

    if(itemInput.value !== '') {
        addToShoppingList(itemInput.value, shoppingList);
        createItem(itemInput.value, itemList);
    }
};

const removeItem = (e) => {
    e.preventDefault();
    if(e.target.classList.contains('fa-xmark')){
        e.target.closest('li').classList.add('fade-out');
        const item = e.target.closest('li').textContent;
        removeFromShoppingList(item, shoppingList);
        deleteItem(e);
    }
}

// Event Listeners
window.onload = loadItems;
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);