import React from 'react';
import { styled } from '@mui/material/styles';
import {Box, Table, TableBody, TableCell,TableHead, TableRow,TableContainer, Paper, IconButton, Button } from '@mui/material';
import { Delete, Edit,Refresh } from '@mui/icons-material'
import { tableCellClasses } from '@mui/material/TableCell';
import { useState, useEffect } from 'react';
import EditForm from './EditForm';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


export default function BusinessList({searchText}) {

    const [businessData, setbusinessData] = useState([]);
    let [filteredBusinessData,setfilteredBusinessData] = useState([]);
    const [searchBusiness, setSearchBusniess] = useState('');
    const [open, setOpen] = useState(false);
    const [businessId, setBusinessID] = useState('');
    const [editBusinessData, setEditBusinessData] = useState({
        name:'',
        category:'',
        size:'',
        owner:'',
        phone:'',
        email:'',
        description:'',
        location:'',
        address: {
            street:'',
            city:'',
            state:'',
            zipCode:'',
            country:''
        }
    });
    const removeBusiness = (id) => {
        fetch(`/api/delete/${id}`,{
            method: 'DELETE',
        }).then(res => res.json()) // or res.json()
        .then(result => console.log(result));
        const filteredBusiness = businessData.filter(data => data._id !== id);
        setbusinessData(filteredBusiness);
    }

    const fetchBusinessId = (id) => {
        fetch(`/api/fetch/${id}`,{
            method: 'GET',
        }).then(res => res.json()) // or res.json()
        .then(result => setEditBusinessData({...result.data}));
    }

    const handleOpen = (id) => {
        setOpen(true);
        fetchBusinessId(id);
        setBusinessID(id);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const filterBusinessList = (list) => {
        let newList = filteredBusinessData.filter(l => (l.name).toLowerCase().includes(searchText) || (l.category).toLowerCase().includes(searchText));
        setfilteredBusinessData(newList);
    }

    const getBusinessList = () => {
        fetch(`/api/fetch`).then(res => res.json()).then(result => (setbusinessData(result.data), setfilteredBusinessData(result.data)));
    }
    
    useEffect(() => {
      getBusinessList();
    },[]);

    useEffect(() => {
        if(searchText.length !== 0){
            setSearchBusniess(searchText);
            filterBusinessList(businessData);
        }
        else{
            setfilteredBusinessData([...businessData]) 
        }
    },[searchText])

    return (
        <>
        <Box sx={{maxWidth:'1280px',m:'30px auto 0 auto'}}>
            <Button onClick={getBusinessList} variant="contained" endIcon={<Refresh />} color="secondary">Refresh</Button>
        </Box>
        <TableContainer component={Paper} sx={{maxWidth:'1280px',m:'60px auto'}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Category</StyledTableCell>
                    <StyledTableCell align="right">Owner</StyledTableCell>
                    <StyledTableCell align="right">Size</StyledTableCell>
                    <StyledTableCell align="right">Location</StyledTableCell>
                    <StyledTableCell align="right">Category</StyledTableCell>
                    <StyledTableCell align="right">Edit</StyledTableCell>
                    <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {filteredBusinessData.map((row) => (
                    <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.category}</StyledTableCell>
                    <StyledTableCell align="right">{row.owner}</StyledTableCell>
                    <StyledTableCell align="right">{row.size}</StyledTableCell>
                    <StyledTableCell align="right">{row.location}</StyledTableCell>
                    <StyledTableCell align="right">{row.category}</StyledTableCell>
                
                    <StyledTableCell align="right">
                        <IconButton onClick={() => handleOpen(row._id)} aria-label="edit" color="primary">
                            <Edit />
                        </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <IconButton aria-label="delete" color="secondary" onClick={() => removeBusiness(row._id)}>
                            <Delete />
                        </IconButton>
                    </StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <EditForm businessId={businessId} businessInfo={editBusinessData} open={open} handleCloseModal={handleClose} />
        </>
    )
}
