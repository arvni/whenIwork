import {DataGrid, faIR} from "@mui/x-data-grid";
import AddButton from "@/Components/AddButton";
import {convertNumber} from "@/Services/helper";
import DataTable from "@/Layouts/Components/DataTable";

const TableLayout = ({
                         columns,
                         reload,
                         data,
                         children,
                         loading,
                         onClickAddNew,
                         addNewTitle,
                         defaultValues,
                         rowHeight,
                         Filter = null,
                         addNew = false,
                         ExpandedComponent = null,
                         expandedKey
                     }) => {
    const handlePageSizeChange = (p) => reload(1, defaultValues.filters, defaultValues.sort[0], p);
    const handlePageChange = (p) => reload(p + 1, defaultValues.filters, defaultValues.sort[0], defaultValues.pageSize);
    const handleFilterChange = (filter) => () => reload(1, filter, defaultValues.sort[0], defaultValues.pageSize);
    const handleSortChange = (sortModel) => reload(1, defaultValues.filters, sortModel, defaultValues.pageSize)
    return (
        <>
            {Filter && <Filter defaultFilter={defaultValues.filters} onFilter={handleFilterChange}/>}
            <DataTable rows={data.data}
                       ExpandedComponent={ExpandedComponent}
                       columns={columns}
                       autoHeight
                       filterMode={"server"}
                       sortingMode={"server"}
                       paginationMode={"server"}
                       disableColumnFilter
                       rowHeight={rowHeight ?? 50}
                       localeText={{
                           ...faIR.components.MuiDataGrid.defaultProps.localeText,
                           MuiTablePagination: {
                               ...faIR.components.MuiDataGrid.defaultProps.localeText.MuiTablePagination,
                               labelDisplayedRows: ({
                                                        From,
                                                        to,
                                                        count
                                                    }) => ` ردیف ${convertNumber((data.current_page - 1) * defaultValues.pageSize + 1)} تا  ${convertNumber(to)}  |  تعداد کل ردیف ها : ${convertNumber(count)}`,

                           }
                       }}
                       sortModel={defaultValues.sort}
                       rowsPerPageOptions={[10, 20, 100]}
                       pageSize={defaultValues.pageSize * 1}
                       onPageSizeChange={handlePageSizeChange}
                       onPageChange={handlePageChange}
                       rowCount={data.total * 1}
                       page={data.current_page - 1}
                       loading={loading}
                       onSortModelChange={handleSortChange}
                       hideFooterSelectedRowCount
                       expandedKey={expandedKey}
            />
            {children}
            {addNew ? <AddButton onClick={onClickAddNew} title={addNewTitle}/> : null}
        </>
    )
}

export default TableLayout;
