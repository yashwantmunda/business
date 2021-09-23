import { TextField } from '@mui/material'
import React from 'react'

export default function Input({type,label,name,handleInputData,error,dvalue}) {
    return (
        <TextField onChange={handleInputData} value={dvalue}  error={error} fullWidth variant={type} name={name} label={label} sx={{my:'1rem'}}>
        </TextField>
    )
}
