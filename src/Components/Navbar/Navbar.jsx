import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData , Logout}) {
  return (

  <>
  <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
                <Link className="navbar-brand h33 fw-bold ms-3" to={''}>Noxe</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
          
            <li className="nav-item">
              <Link className="nav-link" to={''}>Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={''}>Movies</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={''}>TvShow</Link>
            </li>

            <li className="nav-item"> 
              <Link className="nav-link" to={''}>People</Link>
            </li>
          </ul>



    <ul className="navbar-nav ms-auto">
    {localStorage.getItem('userToken')!== null ?    
      <>
      <li className="nav-item">
        <Link className="nav-link" to={''} onClick={Logout}>

        <button class="Btn">
          <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
          <div class="text">Logout</div>
        </button>

        </Link>
      </li>
      </> 
      : 
      <>
      <li className="nav-item">
        <Link className="nav-link" to={'/Register'}>Register</Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to={'/Login'}>Login</Link>
      </li>
      </>
      }


    </ul>

  </div>

    </nav>
    </div>
  </>

  )
}
