import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Switch, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddMovie from '../components/AddMovie';
import AddMovieForm from '../ui/AddMovieForm';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function MoviesList() {

    const [openForm, setOpenForm] = React.useState(false)
    const [movies, setMovies] = React.useState([])




    const handleStatus = async (status, id) => {
        console.log("status : ", status)
        console.log("id : ", id)

        try {
            if (status == 'running') {

                const res = await axios.patch(`http://localhost:3210/api/v1/admin/movie-status/${id}`, { status : 'upcoming' }, { withCredentials: true })
                if (res.data.success) {
                    toast.success(res.data.message)
                    getMovies()
                } else {
                    toast.error(res.data.message)
                }
            } else {
                const res = await axios.patch(`http://localhost:3210/api/v1/admin/movie-status/${id}`, { status : 'running' }, { withCredentials: true })
                if (res.data.success) {
                    toast.success(res.data.message)
                    getMovies()
                } else {
                    toast.error(res.data.message)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }



    const delMovie = async (movie) => {
        const delRes = await axios.delete(`http://localhost:3210/api/v1/admin/delete-mov/${movie}`, { withCredentials: true })
        console.log(delRes)
        if (delRes.data.success == true) {
            toast.success(delRes.data.message)
            getMovies()
        } else {
            toast.error(delRes.data.message)
        }
    }

    const loadNewMovForm = () => {
        if (openForm != true) {
            setOpenForm(true)
        } else {
            setOpenForm(false)
        }
    }

    const getMovies = async () => {
        const res = await axios.get('http://localhost:3210/api/v1/admin/movies', { withCredentials: true })
        if (res.data.length == 0) {
            console.log(res.data)
        } else {
            setMovies(res.data)
        }
    }

    React.useEffect(() => {
        getMovies()
    }, [])

    return (
        <div>
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 70 }}>
                <div onClick={loadNewMovForm} style={{ display: 'flex', marginTop: '30px', marginRight: '50px', justifyContent: 'end' }}>
                    <AddMovie /></div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Language</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}></TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {movies.map((movie) => (
                                <TableRow
                                    key={movie._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Avatar src={movie.image} alt='Movie_image' sx={{ width: 70, height: 90 }} variant='rounded'>M</Avatar>
                                    </TableCell>
                                    <TableCell align="right">{movie.name}</TableCell>
                                    <TableCell align="right">{movie.language}</TableCell>
                                    <TableCell align="right">{movie.status}</TableCell>
                                    <TableCell align="right"><Switch onChange={() => handleStatus(movie.status, movie._id)} checked={(movie.status == 'running') ? true : false} /></TableCell>
                                    <TableCell align="right"><IconButton aria-label="delete" onClick={() => delMovie(movie._id)}>


                                        <DeleteIcon />
                                    </IconButton></TableCell>

                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openForm}

            >
                {openForm ? <AddMovieForm /> : null}
                <Box sx={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    zIndex: 12,
                    border: 1,
                    borderColor: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 0,
                    padding: 0,
                    position: 'absolute',
                    top: 80,
                    right: 550
                }}>
                    <Button onClick={loadNewMovForm}><Typography sx={{ color: 'black' }}>X</Typography></Button>
                </Box>

            </Backdrop>
        </div>
    )
}
