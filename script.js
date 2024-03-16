const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const inputLabel = document.getElementById('alert');
inputLabel.style.display = 'none';

const handleInvalidEntry = (message) => {
    itemInput.value = '';
    itemInput.style.borderColor = 'red';
    itemInput.style.backgroundColor = 'pink';
    itemInput.placeholder = message;

    setTimeout(() => {
        inputLabel.style.display = 'none';
        itemInput.style.borderColor = 'black';
        itemInput.style.backgroundColor = 'white';
        itemInput.placeholder = 'Enter Item';
    }, 3750);
}

const filterInput = (input) => {

    if (input.value.length === 0) {
        handleInvalidEntry('Invalid: you need to type something..duh!');
        return null;
    }

    if(input.value.length > 20) {
        handleInvalidEntry('Too many characters...you must be a writer!');
        return null;
    }

    if(!/^[a-zA-Z]+$/.test(input.value)){
        handleInvalidEntry("No special characters...just letters!");
        return null;
    }
}

//Create Item
const createItem = (itemName, itemList) => {
    const li = document.createElement('li');
    li.classList.add('fade-in');
    li.innerHTML = `
        ${itemName}
        <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    itemList ? itemList.appendChild(li) : console.error({ error: 'please input a list element <ol> or <ul>'});

};

const addItem = (e) => {
    e.preventDefault(); 

    filterInput(itemInput);
    
    if(itemInput.value !== '') {
        createItem(itemInput.value, itemList);
    }

};

//Event Listeners
itemForm.addEventListener('submit', addItem);