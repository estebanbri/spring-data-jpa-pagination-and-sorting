import { getPage } from './page-service.js'
import { createTHeadFromObject, createTBodyFromObjectArray, cleanTable  } from './table-utils.js'
import { updateQueryParams, params } from './window-utils.js'

var page = null;

async function main() {

    var pageNumber = getOrDefault(+params.get('page'), 0);
    var sortField = getOrDefault(params.get('sortField'), 'id');

    page = await getPage({pageNumber: pageNumber, sortField: sortField});

    createTableFromPage(page);

    setActivePageItem();
}

function setActivePageItem() {
    unSetPreviousActiveItem();
    var pageItem = document.getElementById("item-" + +params.get('page'));
    pageItem.classList.add("active");
}

function unSetPreviousActiveItem() {
    var pageItems = document.getElementById("page-items");
    var pageItemsArray = pageItems.querySelectorAll('.page-item');
    pageItemsArray.forEach(pageItem => pageItem.classList.remove("active"))
}

function createTableFromPage(page) {
    var personasTable = document.getElementById("personas-table");
    cleanTable(personasTable);
    personasTable.appendChild(createTHeadFromObject(page.content[0]));
    personasTable.appendChild(createTBodyFromObjectArray(page.content));
}

function getOrDefault(value, defaultValue) {
    return typeof value === 'undefined' || value == null ? defaultValue : value;
}

function getPageNumberByElement(anchor) {
    switch(anchor.id) {
        case 'item-prev': return page.number - 1;
        case 'item-next': return page.number + 1;
        default: return +anchor.innerText - 1;
    }
}

document.querySelectorAll('.page-link').forEach(anchor => {
    anchor.addEventListener('click', function() {
        var pageNumber = getPageNumberByElement(anchor);
        if(pageNumber >= page.totalPages || pageNumber < 0) return;
        updateQueryParams({page: pageNumber});
    });
});

document.querySelectorAll('.sort-field').forEach(anchor => {
    anchor.addEventListener('click', function() {
        updateQueryParams({sortField: this.innerText});
    });
});

main();