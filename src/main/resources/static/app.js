var page = null;
var params = new URLSearchParams(window.location.search);

async function getPageByProps(props) {

    if(typeof props.page === 'undefined' || props.page == null) props.page = 0;
    if(typeof props.sortField === 'undefined' || props.sortField == null) props.sortField = 'nombre';

    page = await getPage(props);

    var personasTable = document.getElementById("personas-table");
    cleanTable(personasTable);

    personasTable.appendChild(createTHeadFromObject(page.content[0]));
    personasTable.appendChild(createTBodyFromObjectArray(page.content));
    setActivePageItem(props.page);
}

function getPreviousPage() {
    var previousPageNumber = page.number - 1;
    if (previousPageNumber < 0 ) { return; }
    updateQueryParams(previousPageNumber, params.get('sortField'));
}

function getNextPage() {
    var nextPageNumber = page.number + 1;
    if (nextPageNumber > page.totalPages ) { return; }
    updateQueryParams(nextPageNumber, params.get('sortField'));
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

function updateQueryParams(page, sortField) {
    params.set('page', page == null ? 0 : page);
    params.set('sortField', sortField == null ? 'nombre' : sortField);
    window.location.search = params;
}

getPageByProps({page: +params.get('page'), sortField: params.get('sortField')});