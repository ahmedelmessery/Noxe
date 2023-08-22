import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isLoading , setisLoading] = useState(null)
  const [movies, setMovies] = useState([])

  async function getTrending() {
    try {
      setisLoading(true)
      let { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=8abc7c4ceab277bcd98a54024ea574a7');
      setMovies(data.results);
      setisLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(()=>{
    getTrending()
    
  },[])

  
  return   <>

<Helmet><title>Home</title></Helmet>

   {isLoading !== true ?  
   
   <>
   <div className="row d-flex align-items-center py-3">
     <div className="col-md-4">
       <h1>Trending <br /> Movies <br /> Right Now</h1>
       
       <p>Top Trending Movies By Week</p>
     </div>


     

     
     {movies.map((movie , key)=> <div key={movie.id} className='col-md-2 text-center d-flex align-items-center flex-column'>
     <Link to={`/Movie/${movie.id}`}>

      <div className="over position-relative">
       <img id='img' className='w-100 position-relative' src={'https://image.tmdb.org/t/p/w500'+ movie.poster_path} alt=""/>

       <div className="position-absolute top-0 end-0 rate">
        <p>{movie.vote_average} <i className="fa-solid fa-star text-warning"></i></p>
        
       </div>
       </div>



       </Link>
       <h6 className='fw-bold pt-3'>{movie.title}</h6>
     </div> )}
     
   </div>
   </>
   : 
   <div className="circle">
        <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
        </svg>
    </div>
   }

    </>
  
}

