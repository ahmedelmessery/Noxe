import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Login(props) {
  let [error , setError] = useState('')
  let [loading , setLoading] = useState(false)
  let navigate = useNavigate()

  let validate = Yup.object({
      email: Yup.string().required('Email is required').email('Email invalid'),
      password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must start with capital letter'),
  })


  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema: validate,
    onSubmit: Login
  })

  async function Login(values)
  {
    setLoading(true)
    let response = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((err)=>{
      setLoading(false)
      console.log(err);
      setError(err.response.data.errors.msg )

    })
    if(response.data.message === 'success')
    {
      localStorage.setItem('userToken', response.data.token)
      props.saveUserData()
      setLoading(false)
      navigate('/')
    }
    else{
      toast.error('Error')
    }

  }



  return (
    <>
    <div className="w-75 mx-auto">
    <h3 className='py-3 text-center'>Login</h3>
    <form onSubmit={formik.handleSubmit}>
    
    {error?<div className='alert alert-danger'>{error}</div>:null}



      <label htmlFor="email">Email</label>
      <input className='form-control my-2' type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}   />

      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}

      
      <label htmlFor="password">Password</label>
      <input className='form-control my-2' type="password" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}   />

      {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}



      {loading? <div className='btn btn-info my-2'><i className="fa-solid fa-spinner fa-spin"></i></div>:
      <button type='submit' className='btn btn-info my-2'>Login</button>
      }
      

      <div className='my-2'>
        <h6>Don't Have An Account ? <Link to={'/Register'}> <span><u> Register Now</u></span> </Link> </h6>
      </div>
      </form>
    </div>
    </>
  )
}
