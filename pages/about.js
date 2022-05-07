import React from 'react'
import Navbar from '../components/Navbar'

const About = () => {
  return (
    <div>
      <Navbar nothome={true} />
      <div className="w-full h-[30rem] flex justify-center items-center bg-[url('/assets/header.jpg')] bg-cover bg-top relative">
        <div className='absolute w-full h-full bg-black bg-opacity-50'></div>
        <h1 className='text-6xl text-white z-10'>About</h1>
      </div>
      <div className='m-8'>
        <p className='text-2xl'>
          The website will allow people to track and identify the effects that computing machinery 
          has on the environment. This will be showcased using statistics from all over a particular 
          area, or from a broader spectrum, various places in the country or all over the world.
        </p>
      </div>
    </div>
  )
}

export default About