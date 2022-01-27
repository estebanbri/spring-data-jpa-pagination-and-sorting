import { urlGlobal } from '../env/config.js'

export async function getPage(props) {
    var response = await fetch(urlGlobal.getPage + props.pageNumber + "?pSortField=" + props.sortField);
    return await response.json();
}