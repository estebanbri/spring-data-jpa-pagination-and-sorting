import { updateQueryParams } from './window-utils.js'

export function createTHeadFromObject(obj) {
    var tHead = document.createElement('tHead');
    var tr = document.createElement('tr');
    for (var i = 0; i < Object.keys(obj).length; i++) {
       var th = document.createElement('th');
       var anchor = document.createElement('a');
       var iElement = document.createElement('i');
       var key = Object.keys(obj)[i];
       anchor.id = key;
       anchor.className = 'sort-field';
       anchor.style.cssText = "cursor:pointer;border-bottom: 1px solid blue;color:blue";
       anchor.addEventListener( 'click', function(){
         updateQueryParams({sortField: this.id});
       } );
       iElement.className='bi bi-caret-down-fill';
       anchor.appendChild(document.createTextNode(key));
       anchor.appendChild(iElement);
       th.appendChild(anchor);
       tr.appendChild(th);
    }
    tHead.appendChild(tr);
    return tHead;
}

export function createTBodyFromObjectArray(objArray) {
    var tBody = document.createElement('tBody');
    for (var i = 0; i < objArray.length; i++) {
            var obj = objArray[i];
            var trData = document.createElement('tr');
            for (var j = 0; j < Object.keys(obj).length; j++) {
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(obj[Object.keys(obj)[j]]));
                trData.appendChild(td);
            }
        tBody.appendChild(trData);
    }
    return tBody;
}

export function cleanTable(table) {
    table.innerHTML = '';
}