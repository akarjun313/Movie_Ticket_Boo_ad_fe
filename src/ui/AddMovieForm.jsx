import * as React from 'react'
import { TextField } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';



const schema = yup.object({
    name: yup.string().required('Name required'),
    genre: yup.string().required('Genre required'),
    language: yup.string().required('Language required'),
    duration: yup.number().positive().integer().required('Duration required'),
    status: yup.string().required(),
    image: yup.mixed().required('Image required')
}).required()



export default function AddMovieForm() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) })


    const onSubmit = async (data)=>{
        try {
            data.image = data.image[0]
            console.log(data)
            const res = await axios.post('http://localhost:3210/api/v1/admin/add-mov', data, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true})
            
            console.log(res)

            if(res.data.success == true){
                toast.success(res.data.message)
                navigate('/movies')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error("error occured")
            console.log(error)
        }
    }

    return (
        
        <Box sx={{boxShadow:3}} style={{ display: 'flex', position:'absolute', left:450, top:70, zIndex:10, alignItems: 'center', justifyContent: 'center', backgroundColor:'white' }}>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate style={{ margin: '20px', overflow: 'auto', height: '550px', width: '500px', padding:'20px'}}>
                <FormControl style={{ gap: 20 }}>

                    <TextField
                        required
                        label='Movie name'
                        type='text'
                        sx={{ width: '400px' }}
                        {...register("name")}
                   
                    />
                    <TextField
                        required
                        label='Genre'
                        type='text'
                        {...register("genre")}
                    
                    />
                    <TextField
                        required
                        label='Language'
                        type='text'
                        helperText='Enter only one language'
                        {...register("language")}
                    />
                    <TextField
                        required
                        label='Duration'
                        type='number'
                        helperText='Enter time in Minutes(mins)'
                        {...register("duration")}
                    />
                    <TextField
                        label='Description'
                        type='text'
                        multiline
                        rows={5}
                        {...register("description")}
                    
                    />

                    <label style={{textDecoration:'underline'}}>Upload an image as movie thumbnail
                        <Button
                            style={{marginLeft:'5px'}}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <input hidden {...register('image')} type="file" accept='image/png, image/jpeg, image/jpg' id='movieFile'/>
                        </Button>
                    </label>

                    <div style={{paddingLeft:'15px'}}>
                    <FormLabel id="demo-radio-buttons-group-label">Movie status</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="running"
                        name="radio-buttons-group"
                        
                    >
                        <FormControlLabel style={{color:'black'}} {...register("status")} value="upcoming" control={<Radio />} label="Upcoming" />
                        <FormControlLabel style={{color:'black'}} {...register("status")} value="running" control={<Radio />} label="Running" />
                    </RadioGroup>
                    </div>
                    
                    <Button type='submit' sx={{marginLeft:'25px', marginTop:'15px'}} variant='contained'>Create</Button>
                </FormControl>
                
            </Box>
        </Box>
    )
}
