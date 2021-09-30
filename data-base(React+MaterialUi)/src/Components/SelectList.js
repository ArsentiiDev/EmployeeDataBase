import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

export default function SelectList(props) {

    const {name,label,value, error=null, onChange,options} = props

    return (
        <FormControl
        variant="outlined"
        {...(error && {error:true})}>
        <InputLabel>{label}</InputLabel>
        <Select 
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        >
        <MenuItem value="None">None</MenuItem>
        {
            
            options.map(option=>(
                <MenuItem key={option.id} value={option.id}>{option.title}</MenuItem>
            ))
        }
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}

        </FormControl>
    )
}
