
import React from 'react'
import { AppBar, Button, TextField, Toolbar,Typography } from '@mui/material'

export default function Header({showForm,searchData}) {
    const handleSearchField = (e) => {
        searchData(e.target.value);
    }
    return (
    <AppBar position="static">
        <Toolbar>
            <>
            <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Business Info
            </Typography>
            </>
            <TextField onChange={handleSearchField} sx={{mr:'20px'}} color="secondary" variant="standard" name="search" label="Search"></TextField>
            <Button variant="contained" onClick={() => showForm(true)} color="secondary">Add new business</Button>
        </Toolbar>
    </AppBar>
    )
}
