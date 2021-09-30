import {  Checkbox, FormControlLabel, FormGroup, Grid} from '@material-ui/core'
import { validate } from '@material-ui/pickers'
import { useEffect } from 'react'
import ButtonComponent from '../../Components/ButtonComponent'
import CheckBoxComponent from '../../Components/CheckBox'
import DatePickerComponent from '../../Components/DatePickerComponent'
import Input from '../../Components/Input'
import RadioGroupComponent from '../../Components/RadioGroup'
import SelectList from '../../Components/SelectList'
import {useForm, Form} from '../../Hooks/useForm'
import  {getDepartmentCollection, insertEmployee}    from '../../services/employeeService'


const initialValue = {
    id: 0,
    fullname: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false
}

const genderItems = [
    {id:'male',title:'Male'},
    {id:'female',title:'Female'},
    {id:'other',title:'Other'},
]


export default function EmployeesForm(props) {

    const {addOrEdit, recordForEdit }  = props
    
    const validationInput = () => {
        let temp = {}
        temp.fullname = values.fullname? "": "this field is required"
        temp.email = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(values.email)? "" : "is invalid" 
        temp.mobile = values.mobile >=9? "": "is too short"
        temp.departmentId = values.departmentId.length !==0? "": "this field is required"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    const {values, setValues,errors,setErrors ,handleInputChange,resetForm} =  useForm(initialValue)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(validationInput())
        if(validationInput())
            addOrEdit(values,resetForm)
    }

    useEffect(() => {
        if(recordForEdit !== null)
        setValues({
            ...recordForEdit
        })
        
    }, [recordForEdit])
   

    return (
        <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
               <Input 
                   name="fullname"
                   label="Full Name"
                   value={values.fullname}
                   onChange={handleInputChange}
                   error={errors.fullname}
               />
               <Input 
                   name="email"
                   label="Email"
                   value={values.email}
                   onChange={handleInputChange}
                   error={errors.email}
               />
               <Input 
                   name="mobile"
                   label="Mobile"
                   value={values.mobile}
                   onChange={handleInputChange}
                   error={errors.mobile}
               />
               <Input 
                   name="city"
                   label="City"
                   value={values.city}
                   onChange={handleInputChange}
               />
                
            </Grid>
            <Grid item xs={6}>
            <RadioGroupComponent 
                name="gender"
                label="Gender"
                value={values.gender} 
                onChange={handleInputChange}
                items={genderItems}

            />
            <SelectList
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            options={getDepartmentCollection}
            error= {errors.departmentId}
            />
            <DatePickerComponent 
                 name="hireDate"
                label="Hire Date"
                value={values.hireDate}
                onChange={handleInputChange}
            />
            <CheckBoxComponent 
                name="isPermanent"
                label="Permanent Employee"
                value={values.isPermanent}
                onChange={handleInputChange}
            />
            <div>
                <ButtonComponent
                    text="submit"
                    type="submit"
                />
                <ButtonComponent
                    text="reset"
                    color="default"
                    onClick = {resetForm}
                />
            </div>
            </Grid>

        </Grid>
        </Form>

    )
}
