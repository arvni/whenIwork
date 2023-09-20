import React from "react";
import {
    Collapse, Container,
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from "@mui/material";
import {KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowUp} from "@mui/icons-material";
import {useState} from "react";


const renderCell = (row, col) => {
    if (col.renderCell)
        return col.renderCell({row, value: row[col.field]});
    else
        return row[col.field];

}

function Row({row, columns, expandedKey, ExpandedComponent}) {
    const [open, setOpen] = useState(false);
    const hasExpandedRow = !!row[expandedKey]
    return (
        <React.Fragment key={"row-"+row.id}>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}} key={"row-"+row.id+"-1"}>
                {ExpandedComponent && <TableCell>
                    {hasExpandedRow &&
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowLeft/>}
                    </IconButton>}
                </TableCell>}
                {columns.map(col => <TableCell key={"col-"+col.field + "-" + row.id}>
                    {renderCell(row, col)}
                </TableCell>)}
            </TableRow>
            {ExpandedComponent && <TableRow  key={"row-"+row.id+"-2"}>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns.length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ExpandedComponent data={row[expandedKey]}/>
                    </Collapse>
                </TableCell>
            </TableRow>}
        </React.Fragment>
    );
}

const DataTable = ({
                       rows,
                       columns,
                       localeText,
                       sortModel,
                       rowsPerPageOptions,
                       pageSize,
                       onPageSizeChange,
                       onPageChange,
                       rowCount,
                       page,
                       loading,
                       onSortModelChange,
                       ExpandedComponent,
                       expandedKey
                   }
) => {
    const handleSortChange = (field, sortable) => () => {
        if (!sortable)
            return;
        if (field === sortModel.field) {
            if (sortModel.sort === "desc")
                onSortModelChange()
            else
                onSortModelChange({field, sort: "desc"})
        } else
            onSortModelChange({field, sort: "asc"})
    }
    return <Container maxWidth={"xl"} sx={{overflow: "auto"}}>
        <Table>
            <TableHead>
                <TableRow>
                    {ExpandedComponent && <TableCell/>}
                    {columns.map(({headerName, sortable = true, field, type}) => <TableCell key={field}>
                        <Link onClick={handleSortChange(field, sortable)} underline={"none"}
                              sx={{cursor: sortable && "pointer"}}>
                            {headerName}
                            <TableSortLabel hideSortIcon={!sortable || type === "action"}
                                            active={field === sortModel.field && type !== "action" && sortable}
                                            direction={sortModel.sort}/>
                        </Link>
                    </TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.length > 0 ? rows.map(row => <Row key={row.id} row={row} columns={columns}
                                                        expandedKey={expandedKey}
                                                        ExpandedComponent={ExpandedComponent}/>) :

                    <TableRow>
                        <TableCell colSpan={columns.length + 1} sx={{textAlign: "center"}}>
                            {localeText.noResultsOverlayLabel}
                        </TableCell>
                    </TableRow>}
            </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={rowCount}
            rowsPerPage={pageSize}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onPageSizeChange}
            {...localeText.MuiTablePagination}
        />
    </Container>
}

export default DataTable;
