import React from 'react'
import { Link } from 'react-router-dom';
import Error404 from "../assets/404.png";

const NotFound = () => {
  return (
    <section className='min-h-screen pb-12 text-center'> 
      <img src={Error404} alt='' className='w-full max-w-xs mx-auto object-cover' />
      <h1 className="text-3xl"> Page Not Found </h1>
      {/* <br/> */}
      <Link to="/" className='btn btn-primary mt-4'> Go Back Home </Link>

    </section>
  )
}

export default NotFound;