import React, { useState, useEffect } from 'react';
import { Box, Modal, Button, Typography, TextField, Select, InputLabel,MenuItem,FormControl } from '@mui/material';
import Input from './Input';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth:'1080',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function EditForm({open,handleCloseModal,businessInfo,businessId}) {
    const [companySize, setSize] = useState(businessInfo.size)
    const [address, setAddress] = useState({});
    const [formData, setformData] = useState({});
    const [infoUpdated, setInfoUpdated] = useState(false);

    useEffect(() => {
        setformData({
            ...businessInfo,
            address: { ...businessInfo.address }
        })
        setAddress({
            ...businessInfo.address 
        })
        setSize(businessInfo.size);
    },[businessInfo])

    const [validateForm,setValidateForm] = useState(false);
    const selecthandleInput = (e) => {
        setSize(e.target.value);
        formData['size'] = e.target.value;
        setformData({
            ...formData,
            address:address
        })
    }

    const handleClose = () => {
        handleCloseModal();
        setInfoUpdated(false);
        
      };

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

    const formvalidation = async (businessID) => {
        const {name,email,phone,category,size,owner, location,description} = formData;
        const {street,state,city,zipCode, country} = formData.address;
        console.log(formData);
        if(name.trim().length !== 0 && email.trim().length !== 0 && validateEmail(email) && phone.trim().length !== 0 &&
         category.trim().length !== 0 && size.trim().length !== 0 && owner.trim().length !== 0 && location.trim().length !== 0 && description.trim().length !== 0 && 
         street.trim().length !== 0 && state.trim().length !== 0 && city.trim().length !== 0 && zipCode.trim().length !== 0 && country.trim().length !== 0){
            const response = await fetch(`https://businessbackend.herokuapp.com/api/update/${businessID}`, {
                    method: 'PUT',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            
            setInfoUpdated(true);
            
            
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
    <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="update business info"
        aria-describedby="update all details of business "
      >
       { 
       infoUpdated ? 
       <Box sx={{...style}}>
           <Typography component="h5" variant="h5">Business info updated succesfully</Typography> 
           <Button onClick={handleClose}>Close</Button>
        </Box>
           :  
        <>
        <Box component="form" sx={{display: 'flex', ...style}}>
            <Box sx={{px:'1.5rem',py:'1rem'}}>

                <Typography component="h2" variant="h6">{businessInfo.name} Basic detail</Typography>
                <Input handleInputData={handleFormInput} dvalue={formData.name}  type="outlined" label="Name" name="name"/>
                <TextField onChange={handleFormInput} fullWidth variant="outlined" defaultValue={formData.description}  label="Description" name="description" multiline minRows={2}></TextField>
                <Input handleInputData={handleFormInput} dvalue={formData.category}  type="outlined" name="category" label="Category" />
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
                <Input handleInputData={handleFormInput} dvalue={formData.owner} name="owner" type="outlined" label="Owner" />
                <Input handleInputData={handleFormInput} dvalue={formData.phone}  name="phone" type="outlined" label="Phone" />
                <Input handleInputData={handleFormInput} dvalue={formData.email} name="email" type="outlined" label="Email" />
                <Input handleInputData={handleFormInput} dvalue={formData.location} name="location" type="outlined" label="Location" />
            </Box>
            <Box sx={{px:'1.5rem',py:'1rem'}}>
                <Typography component="h2" variant="h6">Address</Typography>
                <Input handleInputData={handleAddressInput} dvalue={address.street} name="street" type="outlined" label="Street" />
                <Input handleInputData={handleAddressInput} dvalue={address.city} name="city" type="outlined" label="City" />
                <Input handleInputData={handleAddressInput} dvalue={address.state} name="state" type="outlined" label="State" />
                <Input handleInputData={handleAddressInput} dvalue={address.zipCode} name="zipCode" type="outlined" label="Zip" />
                <Input handleInputData={handleAddressInput} dvalue={address.country} name="country" type="outlined" label="Country" />
            </Box>
            <Box sx={{width:'100%'}}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => formvalidation(businessId)} sx={{m:"1.5rem"}} variant="contained" color="secondary">Update</Button>
            </Box>
            
            </Box>
        </>
}
      </Modal>
    )
}
