import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div  className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl font-bold'>Want to learn more about Javascript?</h2>
        <p className='text-gray-500 my-2'>Checkout these resources with 100 Javascript Courses</p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <a href="https://ww.100jsprojects.com" type='_blank' rel='noopener noreferrer'>100 Javascript Projects</a>
            Learn More
        </Button>
      </div>
      <div className='p-7 flex-1 '>
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" className='w-96 h-48'/>
      </div>
    </div>
  )
}