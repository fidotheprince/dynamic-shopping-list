export const handleInvalidEntry = (message, inputElement) => {
    if (!inputElement) {
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
        inputElement.placeholder = 'Ready to create your shopping list? Add items here!';
    }, 3750);
}



export const createItem = (itemName, itemList) => {
    const li = document.createElement('li');
    li.classList.add('fade-in');
    li.classList.add('item');
    li.innerHTML = `
        ${itemName}
        <button class="remove-item btn-link text-red">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    itemList ? itemList.appendChild(li) : console.error({ error: 'please input a list element <ol> or <ul>'});
};

export const createSortedCategory = (category, sortedList) => {
    const key = Object.keys(category);
    const title = key[0];
    const li = document.createElement('li');
    li.classList.add('category');
    li.innerHTML = `
        <h3>${title}</h3>
        <ul>${category[title].map(item => `
                <li class="fade-in sorted-item">
                    ${item}
                </li>
            `).join('')}
        </ul>
    `;

    sortedList.appendChild(li);
}

export const fetchChatResponse = async (createSortedCategory, sortedList, shoppingList, itemList) => {
    localStorage.getItem('sortedList') && localStorage.removeItem('sortedList');
    
    const url = 'http://localhost:3000';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shoppingList)
    }
    const response = await fetch(url, options);
    const json = await response.json();
    const { data } = json;
    if(!data) {
        console.error('No data received');
        return null;
    }
    const content = JSON.parse(data?.message?.content);
    localStorage.setItem('sortedList', JSON.stringify(content));
    itemList.innerHTML = '';
    content.forEach(category => createSortedCategory(category, sortedList));
}

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
    shoppingList.length < 1 ? localStorage.removeItem('shoppingList') :
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}