function createTHeadFromObject(obj) {
    var tHead = document.createElement('tHead');
    var tr = document.createElement('tr');
    for (var i = 0; i < Object.keys(obj).length; i++) {
       var th = document.createElement('th');
       th.appendChild(document.createTextNode(Object.keys(obj)[i]));
       tr.appendChild(th);
    }
    tHead.appendChild(tr);
    return tHead;
}

function createTBodyFromObjectArray(objArray) {
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

function cleanTable(table) {
    table.innerHTML = '';
}