import React, { useState } from 'react'
import {Box, Typography, Button, Stack, Grid, IconButton, TextField }  from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoxComponent } from './Users';
import axios from 'axios'


const AddUsers = () => { 

    const [newUser, setNewUser] =  useState({});
    const navigate = useNavigate();
    const API_URL = 'https://c3ybj9x35h.execute-api.us-east-1.amazonaws.com/Dev/users';
    
    const addEmployee = async(newUser) => {
        const response = await axios.post(API_URL, newUser);
        //console.log(response, response.status);
       return response.status;
    }
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        const status = await addEmployee(newUser);
        console.log(status);
        if(status === 200){
            navigate('/')
        }
        else{
            window.alert('Error occured')
        }
    }

  return (
    <div>
         <BoxComponent>
         <Stack direction={'row'} 
            sx={{justifyContent: 'space-between'}}
            my={2}>
            <Typography variant='h5'> ADD EMPLOYEE  </Typography> 
            <Button variant='contained' size='medium' color='info' onClick={() => navigate('/')}>
                Home </Button>   
            </Stack>
        <Grid container my={3} columnSpacing={1} rowSpacing={2} 
        justifyContent={'center'} >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
            <Box  p={1} >
            <form onSubmit={handleSubmit} >
                <TextField label = "Employee Name" variant="outlined" fullWidth sx={{ m: 1, bgcolor: 'white' }} 
                placeholder='Enter Name of Employee'
                onChange={(e) => setNewUser({...newUser, emp_Name: e.target.value})}
                type="text" 
                required>
                </TextField>
                <TextField label = "Employee ID" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter ID of Employee'
                onChange={(e) => setNewUser({...newUser, id: e.target.value})}
                type="text" 
                required>
                </TextField>
                <TextField label = "Age" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Age'
                onChange={(e) => setNewUser({...newUser, age: e.target.value})}
                type="number" 
                required>
                </TextField>

                <TextField label = "Email" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Email of Employee'
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                type="email" 
                required>
                </TextField>
                <TextField label = "Phone" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Phone number'
                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                type="number" 
                required>
                </TextField>
                <TextField label = "Salary" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Salary'
                onChange={(e) => setNewUser({...newUser, salary: e.target.value})}
                type="number" 
                required>
                </TextField>
                 
                 <Button type='submit' variant='contained' size='medium' sx={{m: 1 }} >
                    Add Employee
                 </Button>
            </form>
            </Box>
            </Grid>
        </Grid>
        </BoxComponent>
    </div>
  )
}

export default AddUsers