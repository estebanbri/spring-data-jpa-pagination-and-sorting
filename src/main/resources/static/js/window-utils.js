export var params = new URLSearchParams(window.location.search);

export function updateQueryParams(queryParam) {
    Object.keys(queryParam).forEach(key => {
        params.set(key, queryParam[key]);
    });
    window.location.search = params.toString();
}



