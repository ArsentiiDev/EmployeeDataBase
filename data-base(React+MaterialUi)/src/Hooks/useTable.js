import { Table, TableCell, TableHead, TableRow,makeStyles, TablePagination, TableSortLabel } from '@material-ui/core'
import { Sort } from '@material-ui/icons'
import React, {useState} from 'react'


const useStyles = makeStyles(theme=>({
    table: {
        marginTop: theme.spacing(3),
        '& head th': {
            fontWeight:600,
            color:theme.palette.primary.main,
            backgroundColor:theme.palette.primary.light
        },
        '& tbody td': {
            fontWeight:'300',
        },
        '& tbody tr:hover': {
            backgroundColor:'#fffbf2',
            cursor:'pointer'
        }
    }

}))

export default function useTable(records, headCells, filterFn) {
    
    const classes = useStyles() 
    const pages = [5, 10, 25]
     const [page, setPage] = useState(0)
     const [rowsPerPage, setRowsPerPage]  = useState(pages[page])
     const [order, setOrder] = useState()
     const [orderBy, setOrderBy] = useState()

    const TblContainer = props => ( 
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = id => {
            const isAsc = orderBy === id && order === 'asc'
            setOrder(isAsc?"desc":"asc")
            setOrderBy(id)
        }

        return ( 
            <TableHead>
            <TableRow>
                {
                    headCells.map(item=> ( 
                        <TableCell key={item.id}
                        sortDirection = {orderBy === item.id ? order: false}>
                        {item.disableSorting? item.label:
                            <TableSortLabel
                            active={orderBy === item.id}
                            direction = {orderBy === item.id? order: "asc"}
                            onClick = {()=> {handleSortRequest(item.id)}}
                            >
                            {item.label}
                            </TableSortLabel>}
                            
                        </TableCell>))
                }

            </TableRow>

            </TableHead>
        )
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }
    const TblPagination = () => (
        <TablePagination
        component="div"
        rowsperpagesoptions = {pages}
        count={records.length}
        rowsPerPage={rowsPerPage}
        page = {page}
        onPageChange = {handleChangePage}
        onRowsPerPageChange = {handleChangeRowsPerPage}
        />
    )
    function sort(array, comparator) {
        const stabilizedThis = array.map((el,index)=> [el,index])
        stabilizedThis.sort((a,b)=> {
            const order = comparator(a[0], b[0])
            if(order !==0) return order
            return a[1]-b[1]
        })
        return stabilizedThis.map(el=>el[0])
    }
    function getComparator(order,orderBy) {
        return order === 'desc'
        ? (a,b) => descendingComparator(a,b,orderBy)
        : (a,b)=> -descendingComparator(a,b,orderBy)
    }
    function descendingComparator(a,b,orderBy) {
        if(b[orderBy] < a[orderBy]){
            return -1
        }
        if(b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    const recordsAfterPagingAndSorting = () => {
        return sort(filterFn.fn(records), getComparator(order,orderBy))
        .slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    return { 
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}
