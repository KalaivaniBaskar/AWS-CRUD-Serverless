import React, { useEffect, useState } from 'react'
import {Box, Typography, Table, TableHead, TableBody, TableCell, 
    TableRow, Button, styled, IconButton, Stack,Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
 
export const BoxComponent = styled(Box)`
 width:80%;
 margin: 50px auto;
 & > h4 {
     margin-bottom: 20px;
 }
 & > div > table > thead {
     background-color : #000;
 }
 & > div > table > thead >tr > th {
     color: #fff;
     font-weight: 600;
     font-size: 16px;
 }
 & > div > table > tbody >tr > td {
     font-size: 16px;
 }
 ` 


const Users = ({setCUser}) => {
  
    const [users, setUsers] = useState([]); 

    const navigate = useNavigate();

    const API_URL = 'https://c3ybj9x35h.execute-api.us-east-1.amazonaws.com/Dev/users';

     useEffect(() => {
        const getData = async() => {
            const response = await axios.get(API_URL);
            //console.log(response.data);
            //console.log((response.data.Items));
            setUsers((response.data.Items));
        }
        getData();
     },[])

    const editEmployee = (id) => {
        const [current] = users.filter( (user) => user.id === id)
        setCUser(current)
        navigate('/edit')
    }
     
    const removeEntry = async (id) => {
        console.log("Deleting Employee");
        const delID = { "id" : id}
        console.log(id, delID);
        // for delete req in axios, req body must be given in data obj
        const response = await axios.delete(API_URL, {data : delID})
        console.log(response.status); 
        if(response.status === 200){
            window.location.reload()
        }
    }
  return (
    <BoxComponent> 
        <Stack direction={'row'} 
        sx={{justifyContent: 'space-between'}}
        my={2}>
        <Typography variant='h5'> EMPLOYEES  </Typography> 
        <Button variant='contained' size='medium' color='info' onClick={() => navigate('/add')}>
             + ADD</Button>   
        </Stack>
        
        <Box sx={{overflowX : 'auto'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Salary</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map( user => {
                           return <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.emp_Name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.salary}</TableCell>
                            <TableCell>{user.age}</TableCell  >
                            <TableCell>
                                <IconButton color='error' 
                                onClick={ () => editEmployee(user.id)}>
                                    <ModeEditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton color='error' 
                                onClick={ () => removeEntry(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>  
                        } ) 
                    }
                </TableBody>
            </Table>
        </Box>
        
    </BoxComponent>
  )
}

export default Users;

// command to upload build folder to bucket: 
// aws s3 sync build/ s3://users-processing-aws