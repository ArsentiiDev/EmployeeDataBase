import { Checkbox, FormControl, FormControlLabel } from "@material-ui/core";
import { LocalConvenienceStoreTwoTone } from "@material-ui/icons";
import React from "react";

export default function CheckBoxComponent(props) {
  const { name, label, value, onChange } = props;

  const convertToDedault = (name,value)=> ({
      target: {
          name, value
      }
      
  })

  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={e=>onChange(convertToDedault(name, e.target.checked))}
          />
        }
        label={label}

      />
    </FormControl>
  );
}
