import { getPage } from '../js/page-service.js'
import { createTHeadFromObject, createTBodyFromObjectArray, cleanTable  } from '../js/table-utils.js'

var page = null;
var params = new URLSearchParams(window.location.search);

async function main() {

    var pageNumber = getOrDefault(+params.get('page'), 0);
    var sortField = getOrDefault(params.get('sortField'), 'nombre');

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

function updateQueryParams(page, sortField) {
    params.set('page', page == null ? 0 : page);
    params.set('sortField', sortField == null ? 'nombre' : sortField);
    window.location.search = params;
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

document.getElementById('item-prev').addEventListener('click', function() {
    var previousPageNumber = page.number - 1;
    if (previousPageNumber < 0 ) { return; }
    updateQueryParams(previousPageNumber, params.get('sortField'));
});

document.getElementById('item-next').addEventListener('click', function() {
        var nextPageNumber = page.number + 1;
        if (nextPageNumber > page.totalPages ) { return; }
        updateQueryParams(nextPageNumber, params.get('sortField'));
});


main();