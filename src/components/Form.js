import React from 'react'
import { Box, Button, Card, CardHeader, Typography, TextField, Select, InputLabel,MenuItem,FormControl } from '@mui/material';
import Input from './Input';
import { useState } from 'react';

export default function Form({showForm}) {
    const [companySize, setSize] = useState('');
    const [businessAdded, setBusinessAdded] = useState(false);
    const [address, setAddress] = useState({
        street:'',
        city:'',
        state:'',
        zipCode:'',
        country:''
    });
    const [formData, setformData] = useState({
        name:'',
        category:'',
        size:'',
        owner:'',
        phone:'',
        email:'',
        description:'',
        location:'',
        address: address
    });
    
    const closeForm = () => {
        showForm(false);
    }

    const [validateForm,setValidateForm] = useState(false);
    const handleFormInput = (e) => {
        formData[`${e.target.name}`] = e.target.value;
        setformData({
            ...formData,
            address:address
        });

    }

    const handleAddressInput = (e) => {
        address[`${e.target.name}`] = e.target.value;
        setformData({
            ...formData,
            address:address
        }) 
    }

    const selecthandleInput = (e) => {
        setSize(e.target.value);
        formData['size'] = e.target.value;
        setformData({
            ...formData,
            address:address
        })
    }

    const formvalidation = async (e) => {
        e.preventDefault();
        const {name,email,phone,category,size,owner, location,description} = formData;
        const {street,state,city,zipCode, country} = formData.address;
        console.log(formData);
        if(name.trim().length !== 0 && email.trim().length !== 0 && validateEmail(email) && phone.trim().length !== 0 &&
         category.trim().length !== 0 && size.trim().length !== 0 && owner.trim().length !== 0 && location.trim().length !== 0 && description.trim().length !== 0 && 
         street.trim().length !== 0 && state.trim().length !== 0 && city.trim().length !== 0 && zipCode.trim().length !== 0 && country.trim().length !== 0){
            const response = await fetch('https://businessbackend.herokuapp.com/api/create', {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            const content = await response.json();
            setBusinessAdded(true)
            
        }else{
            setValidateForm(false);
            console.log('Invalid form');
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    return (
        <Card sx={{maxWidth: 'md',boxShadow: 1, margin:'50px auto'}}>
            <CardHeader title="Business Info"></CardHeader>
            { businessAdded ? 
                <Box sx={{px:'1.5rem',py:'1rem'}}>
                    <Typography component="h5" variant="h5">New business info added successfully</Typography>
                    <Button variant="outlined" onClick={closeForm}>Go back</Button>
                </Box>
            :
            <>
            <Box component="form" sx={{display: 'flex'}}>
                <Box sx={{px:'1.5rem',py:'1rem'}}>
                    <Typography component="h2" variant="h6">Basic detail</Typography>
                    <Input handleInputData={handleFormInput} type="outlined" label="Name" name="name"/>
                    <TextField onChange={handleFormInput} fullWidth variant="outlined"  label="Description" name="description" multiline minRows={4}></TextField>
                    <Input handleInputData={handleFormInput}   type="outlined" name="category" label="Category" />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Size</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={companySize}
                        label="size"
                        name="size"
                        onChange={selecthandleInput}
                        >
                            <MenuItem value={"0-10"}>0-10</MenuItem>
                            <MenuItem value={"10-50"}>10-50</MenuItem>
                            <MenuItem value={"50-500"}>50-500</MenuItem>
                        </Select>
                    </FormControl>
                    <Input handleInputData={handleFormInput}  name="owner" type="outlined" label="Owner" />
                    <Input handleInputData={handleFormInput}  name="phone" type="outlined" label="Phone" />
                    <Input handleInputData={handleFormInput}  name="email" type="outlined" label="Email" />
                    <Input handleInputData={handleFormInput} name="location" type="outlined" label="Location" />
                </Box>
                <Box sx={{px:'1.5rem',py:'1rem'}}>
                    <Typography component="h2" variant="h6">Address</Typography>
                    <Input handleInputData={handleAddressInput}  name="street" type="outlined" label="Street" />
                    <Input handleInputData={handleAddressInput}  name="city" type="outlined" label="City" />
                    <Input handleInputData={handleAddressInput}  name="state" type="outlined" label="State" />
                    <Input handleInputData={handleAddressInput}  name="zipCode" type="outlined" label="Zip" />
                    <Input handleInputData={handleAddressInput}  name="country" type="outlined" label="Country" />
                </Box>
            </Box>
            
            <Button onClick={formvalidation} sx={{m:"1.5rem"}} variant="contained" color="secondary">Submit</Button>
            <Button variant="outlined" onClick={closeForm}>Go back</Button>
            </>
        }
        </Card>
    )
}
