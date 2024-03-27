const downloadButton = document.getElementById("download");
const sortedListElement = document.getElementById('sorted-list');
const itemListElement = document.getElementById('item-list');
downloadButton.addEventListener("click", () => {
    const shoppingList = localStorage.getItem('shoppingList') ? JSON.parse(localStorage.getItem('shoppingList')) : [];
    const sortedList = localStorage.getItem('sortedList') ? JSON.parse(localStorage.getItem('sortedList')) : [];
    const pdf = new jsPDF();

    if(sortedListElement.children.length > 0) {
        let y = 10;
        sortedList.forEach((category, index) => {
            const key = Object.keys(category);
            const title = key[0];
            pdf.setFontSize(15);
            pdf.text(title, 10, y);
            y += 10;
            pdf.setFontSize(12);
            category[title].forEach((item, index) => {
                pdf.text(item, 20, y);
                y += 10;
            });
            y += 5; // Add extra space between categories
        });
    
        pdf.save("shopping-list.pdf");
    }

    if(itemListElement.children.length > 0) {
        let y = 10;
        shoppingList.forEach((item, index) => {
            pdf.text(item, 10, y);
            y += 10;
        });
        pdf.save("shopping-list.pdf");
    }
})