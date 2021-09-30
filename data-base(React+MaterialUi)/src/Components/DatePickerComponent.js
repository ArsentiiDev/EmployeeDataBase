import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import React from 'react'
import DateFnsUtils from '@date-io/date-fns'

export default function DatePickerComponent(props) {

    const {name, label, value, onChange} = props


    const convertToDedault = (name,value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils }>
        <KeyboardDatePicker disableToolbar variant="inline" 
        label={label}
        formate="MMM/dd/yyyy"
        name={name}
        value={value}
        onChange={date=>onChange(convertToDedault(name, date))}
        />

        </MuiPickersUtilsProvider>
    )
}
