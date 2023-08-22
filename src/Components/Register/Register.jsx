import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function Register() {
  let [error , setError] = useState('')
  let [loading , setLoading] = useState(false)
  let navigate = useNavigate()

  let validate = Yup.object({
      name: Yup.string().required('Name is required').min(3,'Minimun Name is 3 Char').max(15,'Maximum Name is 15 Char'),
      email: Yup.string().required('Email is required').email('Email invalid'),
      password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must start with capital letter'),
      rePassword: Yup.string().required('Please Confirm Password').oneOf([Yup.ref('password')],'Password does not match'),
      phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/,'Phone invalid')
  })


  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema: validate,
    onSubmit: Register
  })

  async function Register(values)
  {
    setLoading(true)
    let response = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((err)=>{
      setLoading(false)
      console.log(err);
      setError(err.response.data.errors.msg )

    })
    if(response.data.message === 'success')
    {
      console.log(response);
      setLoading(false)
      toast.success("Account Successfully Created")
      navigate('/Login')
    }
    else{
      toast.error('Error')
    }

  }

  return (
    <>
    <div className="w-75 mx-auto">
    <h3 className='py-3 text-center'>Register Now</h3>
    <form onSubmit={formik.handleSubmit}>
    
    {error?<div className='alert alert-danger'>{error}</div>:null}


      <label htmlFor="name">Name</label>
      <input className='form-control my-2' type="text" id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}   />

      {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div>:null}
      
      <label htmlFor="email">Email</label>
      <input className='form-control my-2' type="email" id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}   />

      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}

      
      <label htmlFor="password">Password</label>
      <input className='form-control my-2' type="password" id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}   />

      {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}

      
      <label htmlFor="rePassword">Confirm Password</label>
      <input className='form-control my-2' type="password" id='rePassword' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}   />

      {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}

      
      <label htmlFor="phone">Phone</label>
      <input className='form-control my-2' type="tel" id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}   />

      {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div>:null}


      {loading? <div className='btn btn-info my-2'><i className="fa-solid fa-spinner fa-spin"></i></div>:
      <button type='submit' className='btn btn-info my-2'>Register</button>
      }

      </form>
    </div>
    </>
  )
}
