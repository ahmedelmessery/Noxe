import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

    let Movie_id = useParams()
    
    const [MovieDetails , setMovieDetails] = useState([])

    async function GetMovieDetails ()
    {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${Movie_id.id}{?api_key=8abc7c4ceab277bcd98a54024ea574a7&language=en-US`).catch((Err)=> Err)
        console.log(data);
        setMovieDetails(data)

    }


    useEffect(()=>{
        GetMovieDetails()
    },[])

return (
    <>
    <div className="d-flex justify-content-center align-items-center py-4">

    <div className="col-sm-6 col-md-3">
       {MovieDetails.poster_path? 
        <img className='w-100' id='movie_img' src={'https://image.tmdb.org/t/p/w500'+MovieDetails.poster_path} alt="" />
       :'' }
    </div>
    <div className="col-sm-6 col-md-9 ms-5">
    <h1>{MovieDetails.title}</h1>
    <p className='text-secondary'>{MovieDetails.overview}</p>
    <p className='text-secondary '>{MovieDetails.tagline}</p>

    <div className="Vote d-flex my-2">
    <h4>Vote : <span className='h33'> {MovieDetails.vote_average} </span> </h4>
    <i className="fa-solid fa-star text-warning ms-2"></i>
    </div>

    <h4>Release Date : <span className='h33'> {MovieDetails.release_date} </span> </h4>
    <h4>Original Language : <span className='h33'> {MovieDetails.original_language} </span> </h4>


    </div>

    </div>
    </>
)
}
