import React, { useState } from 'react'
import PageHeader from '../../Components/PageHeader'
import EmployeesForm from './EmployeesForm'
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import { makeStyles, Paper, TableCell, TableRow,TableBody, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../Hooks/useTable'
import { deleteEmployee, getEmployee, insertEmployee, updateEmployee } from '../../services/employeeService';
import Input from '../../Components/Input';
import { AddCircleRounded, AddIcCallOutlined, Close, ClosedCaption, CropSharp, EditOutlined, Search } from '@material-ui/icons';
import ButtonComponent from '../../Components/ButtonComponent';
import Popup from '../../Components/Popup';
import ActionButton from '../../Components/ActionButton';
import Notification from '../../Components/Notification';
import ConfirmDialog from '../../Components/ConfirmDialog';


const useStyles = makeStyles(theme=>({
        pageContent: {
            margin: theme.spacing(5),
            padding: theme.spacing(3),
        },
        searchInput: {
            width:'75%'
        },
        newButton : {
            position: "absolute",
            right:"10px"

        }
}))


const headCells = [
    {id:'fullName', label:'Employee Name'},
    {id:'email', label:'Email Adress'},
    {id:'mobile', label:'Mobile Number'},
    {id:'department', label:'Department',disableSorting:true},
    {id:'actions', label:'Actions',isableSorting:true}
]


export default function Employees() {

    const classes = useStyles()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records,setRecords] = useState(getEmployee())
    const [filterFn, setFilterFn] = useState({
        fn:items => {return items}
    })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({isOpen:false, message:"",type:""})
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen:false,
        title:"",
        subtitle:""
    })

    const { 
        TblContainer, 
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records,headCells, filterFn)

    const handleSearch = e => {
        let target = e.target
        setFilterFn({
            fn: items => {
                if(target.value === '')
                return items
                else 
                return items.filter(x=> x.fullname.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if(employee.id === 0)
        insertEmployee(employee)
        else 
        updateEmployee(employee)

        setRecordForEdit(null)
        resetForm()
        setOpenPopup(false)
        setRecords(getEmployee)
        setNotify({
            isOpen:true,
            message:"Submitted succesfully",
            type:"success"
        })

    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen:false
        })
        deleteEmployee(id)
        setRecords(getEmployee())
        setNotify({
            isOpen:true,
            message:"Deleted succesfully",
            type:"error"
        })
    

    }

    return (
        <>
         <PageHeader
          title="New Employee"
          subTitle="Form design with validation"
          icon={<PeopleOutlineIcon fontSize="large" />}
        />
        <Paper className={classes.pageContent}>
           
            <Toolbar>
                <Input
                    className={classes.searchInput}
                    label="Search Employees"
                    inputProps= {{
                        startadorment:(
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                    onChange = {handleSearch}
                />
                <ButtonComponent
                    text="Add new"
                    variant = "outlined"
                    startIcon = {<AddCircleRounded />}
                    className={classes.newButton}
                    onClick={()=> {setOpenPopup(true); setRecordForEdit(null)}}
                />
            </Toolbar>
            <TblContainer>
                <TblHead/>
                <TableBody>
                {recordsAfterPagingAndSorting().map(item=>( 
                    <TableRow key={item.id}>
                        <TableCell>{item.fullname}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>
                            <ActionButton color="primary">
                                <EditOutlined fontSize="small"
                                    onClick = {()=> {openInPopup(item)}}
                                />
                            </ActionButton>
                            <ActionButton color="secondary"
                            onClick={()=>{
                                setConfirmDialog({
                                    isOpen:true,
                                    title:"Are you sure to delete?",
                                    subtitle:"You can't undo this operation",
                                    onConfirm:()=>{onDelete(item.id)}

                                })
                                // onDelete(item.id)
                                }}>
                                <Close fontSize="small"/>
                            </ActionButton>
                        </TableCell>

                    </TableRow>
                ))}

                </TableBody>
            </TblContainer>
            <TblPagination/>

        </Paper>
        <Popup
        title="Employee Form"
        openPopup = {openPopup}
        setOpenPopup = {setOpenPopup}>
         <EmployeesForm 
            recordForEdit = {recordForEdit}
             addOrEdit={addOrEdit}
         />

        </Popup>
        <Notification 
            notify={notify}
            setNotify={setNotify}
        />
        <ConfirmDialog 
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}

        />
        </>
    )
}
