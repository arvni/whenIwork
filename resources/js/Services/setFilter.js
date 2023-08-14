export default function setFilter(defaultValue, newValue) {
    let output = defaultValue;
    if (newValue.hasOwnProperty("filterModel") && newValue.filterModel)
        output.filterModel = {...output.filterModel, ...newValue.filterModel}
    if (newValue.hasOwnProperty("sort") && newValue.sort)
        output.sort = {...output.sort, ...newValue.sort}
    if (newValue.hasOwnProperty("page") && newValue.page)
        output.page = {...output.page, ...newValue.page}
    if (newValue.hasOwnProperty("pageSize") && newValue.pageSize)
        output.pageSize = {...output.pageSize, ...newValue.pageSize}

    return output;
}
