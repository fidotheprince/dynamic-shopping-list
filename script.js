import { 
    removeFromShoppingList, 
    createSortedCategory,
    handleInvalidEntry,  
    fetchChatResponse,
    addToShoppingList,
    createItem, 
    deleteItem,  
} from "./utilities.js";

const clearListBtn = document.getElementById('clear');
const itemList = document.getElementById('item-list');
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const sortedList = document.getElementById('sorted-list');
const fInputContainer = document.querySelector('.filter');
const categorizeButton = document.querySelector('.categorize');
const shoppingList = localStorage.getItem('shoppingList') ? JSON.parse(localStorage.getItem('shoppingList')) : [];
const hideSortingOptions = () => shoppingList.length < 10 ? categorizeButton.style.display = 'none' : categorizeButton.style.display = 'block';

const filterInput = (input) => {
    if (input.value.length === 0) {
        handleInvalidEntry('Invalid: you need to type something..duh!', itemInput);
        return null;
    }

    if(input.value.length > 20) {
        handleInvalidEntry('Too many characters...you must be a writer!', itemInput);
        return null;
    }

    if(!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(input.value)){
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
    hideSortingOptions()
}

const addItem = (e) => {
    e.preventDefault(); 
    filterInput(itemInput);

    if(itemInput.value !== '') {
        sortedList.innerHTML = '';
        shoppingList.length < 10 ? categorizeButton.style.display = 'none' : categorizeButton.style.display = 'block';
        addToShoppingList(itemInput.value, shoppingList);
        createItem(itemInput.value, itemList);
        itemInput.value = '';
        filterAndClearButton('block');
    }
};

const removeItem = (e) => {
    e.preventDefault();
    hideSortingOptions();
    if(e.target.classList.contains('fa-xmark')){
        e.target.closest('li').classList.add('fade-out');
        const item = e.target.closest('li').textContent.trim();
        removeFromShoppingList(item, shoppingList);
        deleteItem(e);
    }
    shoppingList.length < 1 && filterAndClearButton('none');
}

const clearItems = (e) => {
    e.preventDefault();
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    while(sortedList.firstChild) {
        sortedList.removeChild(sortedList.firstChild);
    }
    localStorage.removeItem('shoppingList');
    filterAndClearButton('none');
}

const sortItems = () => {
    const input = fInputContainer.children[0];
    const value = input.value.toLowerCase();
    
    if(value.length < 1) {
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        loadItems();
    }
    
    if(value.length > 1){
        sortedList.innerHTML = '';
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
    sortedList.innerHTML = '';
    try {
        fetchChatResponse(createSortedCategory, sortedList, shoppingList, itemList);
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