import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Switch } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TheatreList() {

    const [theatres, setTheatres] = React.useState([])
    const [movieNames, setMovieNames] = React.useState({})
    const [ownerNames, setOwnerNames] = React.useState({})



    const handleStatus = async (status, id) => {
        console.log("status : ", status)
        console.log("id : ", id)

        try {

            const newStatus = status ? false : true

            const response = await axios.patch(`http://localhost:3210/api/v1/admin/approve-t/${id}`,
                { status: newStatus },
                { withCredentials: true })
            console.log("response : ", response)
            if (response.data.success != false) {
                toast.success("Status updated successfully")
                getTheatres()
            } else {
                toast.error("Something went wrong")
            }

        } catch (error) {
            console.log(error)
        }

    }

    const findMovie = async (movie) => {
        try {
            const movRes = await axios.get(`http://localhost:3210/api/v1/admin/movie/${movie}`, { withCredentials: true })
            console.log(movRes.data.name)
            return movRes.data.name
        } catch (error) {
            console.log(error)
        }
    }

    const findOwner = async (owner) => {
        try {
            const ownerRes = await axios.get(`http://localhost:3210/api/v1/admin/user/${owner}`, { withCredentials: true })
            console.log(ownerRes.data.email)
            return ownerRes.data.email
        } catch (error) {
            console.log(error)
        }
    }


    const getTheatres = async () => {
        try {
            const res = await axios.get('http://localhost:3210/api/v1/admin/t-list', { withCredentials: true })
            setTheatres(res.data)

            const movieNames = {}
            const ownerNames = {}
            for (const theatre of res.data) {
                if (theatre.movie) {
                    movieNames[theatre.movie] = await findMovie(theatre.movie);
                }
                if (theatre.owner) {
                    ownerNames[theatre.owner] = await findOwner(theatre.owner);
                }
            }
            setMovieNames(movieNames)
            setOwnerNames(ownerNames)
        } catch (error) {
            console.log(error)
        }

    }

    React.useEffect(() => {
        getTheatres()
    }, [])


    return (
        <div>
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 70 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Owner's email</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>State</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>City</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Landmark</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>No. of seats</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Movie playing</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>change status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {theatres.map((theatre) => (
                                <TableRow
                                    key={theatre._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {theatre.name}
                                    </TableCell>

                                    {/* Give owners email  */}
                                    <TableCell align="right">{ownerNames[theatre.owner]}</TableCell>

                                    <TableCell align="right">{theatre.state}</TableCell>
                                    <TableCell align="right">{theatre.city}</TableCell>
                                    <TableCell align="right">{theatre.landmark}</TableCell>

                                    <TableCell align="right">{theatre.seatR * theatre.seatC}</TableCell>

                                    <TableCell align="right">{movieNames[theatre.movie]}</TableCell>

                                    <TableCell align="right">{theatre.status ? 'Active' : 'Inactive'}</TableCell>

                                    <TableCell align="right"><Switch onChange={() => handleStatus(theatre.status, theatre._id)} checked={theatre.status ? true : false} /></TableCell>


                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
