import { urlGlobal } from '../env/config.js'

export async function getPage(props) {
    var response = await fetch( urlGlobal.getPage + "?pageNumber=" + props.pageNumber + "&sortField=" + props.sortField );
    return await response.json();
}