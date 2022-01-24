async function getPage(props) {
    const url = "/api/v1/personas/2";
    var response = await fetch(url + "?pageNumber=" + props.page + "&sortField=" + props.sortField);
    if(response.status != 200) throw Error("Error api call to " + url + " [" + response.status + "]");
    return await response.json();
}