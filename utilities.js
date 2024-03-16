export const handleInvalidEntry = (message, inputElement) => {
    if (!inputElement || !inputLabel) {
        console.error('Invalid input element or label arguments');
        return null;
    }
    inputElement.value = '';
    inputElement.style.borderColor = 'red';
    inputElement.style.backgroundColor = '#F8C8DC';
    inputElement.placeholder = message ? message : 'Invalid Entry';
    setTimeout(() => {
        inputElement.style.borderColor = 'black';
        inputElement.style.backgroundColor = 'white';
        inputElement.placeholder = 'Enter Item';
    }, 3750);
}

export const createItem = (itemName, itemList) => {
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

export const deleteItem = (e) => {
    setTimeout(() => {
        e.target.closest('li').remove();
    }, 500);
}

export const addToShoppingList = (item, shoppingList) => {
    shoppingList.push(item);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

export const removeFromShoppingList = (item, shoppingList) => {
    const index = shoppingList.indexOf(item);
    shoppingList.splice(index, 1);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}