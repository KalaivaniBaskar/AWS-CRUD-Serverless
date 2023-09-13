import React, { useState } from 'react'
import {Box, Typography, Button, Stack, Grid, Select, MenuItem, InputLabel, TextField }  from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoxComponent } from './Users';
import axios from 'axios'

const EditUsers = ({cUser}) => {
   // console.log(cUser);
    const navigate = useNavigate();
    const [field, setField] = useState("");
    const [value, setValue] = useState("");
    const API_URL = 'https://c3ybj9x35h.execute-api.us-east-1.amazonaws.com/Dev/users';

    const updateUser = async(update) => {
        const response = await axios.put(API_URL, update)
        return response;
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        //console.log( field, value); 
        console.log("Editing Employee");
        const update = {"id": cUser.id, "updateKey": field, "updateValue": value }
        const response = await updateUser(update)
        console.log(response.status);
        if(response.status === 200){
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
            <Typography variant='h5'> EDIT EMPLOYEE  </Typography> 
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
                type="text" 
                value={cUser.emp_Name}
                readOnly>
                </TextField>
                <TextField label = "Employee ID" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter ID of Employee'
                type="text" 
                value={cUser.id}
                readOnly>
                </TextField>
                <TextField label = "Age" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Age'
                type="number" 
                value={cUser.age}
                readOnly>
                </TextField>

                <TextField label = "Email" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Email of Employee'
                type="text" 
                value={cUser.email}
                readOnly>
                </TextField>
                <TextField label = "Phone" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Phone number'
                type="number" 
                value={cUser.phone}
                readOnly>
                </TextField>
                <TextField label = "Salary" variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder='Enter Salary'
                type="number" 
                value={cUser.salary}
                readOnly>
                </TextField> 
                <Box width='250px'>  
                <InputLabel id="demo-simple-select-label">Select an option</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field}
                    label="Select an option"
                    onChange={(e) => setField(e.target.value)}
                    fullWidth
                    required
                    >
                    <MenuItem value='emp_Name'>Employee Name</MenuItem>
                    <MenuItem value='email'>Email</MenuItem>
                    <MenuItem value='age'>Age</MenuItem>
                    <MenuItem value='phone'>Phone</MenuItem>
                    <MenuItem value='salary'>Salary</MenuItem>
                    </Select>
                </Box> 
                <TextField label = {field} variant="outlined" fullWidth sx={{m: 1, bgcolor: 'white' }} 
                placeholder={`Enter ${field}`}
                type= { field === "emp_Name" ? "text" :  (field === 'email') ? "email" : "number" }
                onChange={ (e) => setValue(e.target.value)}
                required>
                </TextField> 
                 <Button type='submit' variant='contained' size='medium' sx={{m: 1 }} >
                    Edit Details
                 </Button>
            </form>
            </Box>
            </Grid>
        </Grid>
        </BoxComponent>
    </div>
  )
}

export default EditUsers