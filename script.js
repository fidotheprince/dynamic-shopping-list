import { handleInvalidEntry, createItem, addToShoppingList, deleteItem, removeFromShoppingList, createSortedCategory} from "./utilities.js";

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearListBtn = document.getElementById('clear');
const fInputContainer = document.querySelector('.filter');
const categorizeButton = document.querySelector('.categorize');
const sortedList = document.getElementById('sorted-list');

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
    fInputContainer.style.display = state;
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
        sortedList.innerHTML = '';
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

const sortItems = () => {
    const input = fInputContainer.children[0];
    const value = input.value.toLowerCase();
    
    if(value.length < 1) {
        //clear existing filtered list
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        loadItems();
    }
    
    if(value.length > 1){
        let filteredItems = shoppingList.filter(item => item.toLowerCase().includes(value));
        //clear existing rendered list
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        filteredItems.forEach(item => createItem(item, itemList));
    }
}

const categorize = async (e) => {
    e.preventDefault();
    console.log(shoppingList)
    const url = 'http://localhost:3000';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoppingList)
    }
    try {
        const response = await fetch(url, options);
        const json = await response.json();
        const { data } = json;
        const content = JSON.parse(data?.message?.content);
        itemList.innerHTML = '';
        content.forEach(category => createSortedCategory(category, sortedList));
    } catch (error) {
        console.error('Error:', error);
    }
}

// Event Listeners
window.onload = loadItems;
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
categorizeButton.addEventListener('click', categorize);
fInputContainer.addEventListener('input', sortItems);
clearListBtn.addEventListener('click', clearItems);