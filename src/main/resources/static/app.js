var page = null;

async function getPageByPageNumber(pageNumber) {

    page = await getPage({page: pageNumber, sortField: 'nombre'});

    var personasTable = document.getElementById("personas-table");
    cleanTable(personasTable);

    personasTable.appendChild(createTHeadFromObject(page.content[0]));
    personasTable.appendChild(createTBodyFromObjectArray(page.content));
    setActivePageItem(pageNumber);
}

function getPreviousPage() {
    return (page.number - 1) < 0 ? 0 : page.number - 1;
}

function getNextPage() {
    return (page.number + 1) < page.totalPages ? page.number + 1 : page.number;
}

function setActivePageItem(pageNumber) {
    unSetPreviousActiveItem();
    var pageItem = document.getElementById("item-" + pageNumber);
    pageItem.classList.add("active");
}

function unSetPreviousActiveItem() {
    var pageItems = document.getElementById("page-items");
    var pageItemsArray = pageItems.querySelectorAll('.page-item');
    pageItemsArray.forEach(pageItem => pageItem.classList.remove("active"))
}

getPageByPageNumber(0);