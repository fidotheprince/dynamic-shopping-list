const downloadButton = document.getElementById("download");
const sortedListElement = document.getElementById('sorted-list');
const itemListElement = document.getElementById('item-list');

const generateCategoryPDF = (sortedList, pdf) => {
    let y = 10;
    sortedList.forEach((category) => {
        const key = Object.keys(category);
        const title = key[0];
        pdf.setFontSize(15);
        pdf.text(title, 10, y);
        y += 10;
        pdf.setFontSize(12);
        category[title].forEach((item) => {
            pdf.text(item, 20, y);
            y += 10;
        });
        y += 5;
    });

    pdf.save("shopping-list.pdf");
}

const generateListPDF = (shoppingList, pdf) => {
    let y = 10;
    shoppingList.forEach((item) => {
        pdf.text(item, 10, y);
        y += 10;
    });
    pdf.save("shopping-list.pdf");
}

downloadButton.addEventListener("click", () => {
    const shoppingList = localStorage.getItem('shoppingList') ? JSON.parse(localStorage.getItem('shoppingList')) : [];
    const sortedList = localStorage.getItem('sortedList') ? JSON.parse(localStorage.getItem('sortedList')) : [];
    const pdf = new jsPDF();

    if(sortedListElement.children.length > 0) {
        generateCategoryPDF(sortedList, pdf);
    }

    if(itemListElement.children.length > 0) {
        generateListPDF(shoppingList, pdf);
    }
})