import React from 'react'
import notFound from '../../public/Animation/notFound.json'
import Lottie from 'lottie-react'

const Error = () => {
  return (
    <>
      <div className='flex justify-center items-center min-h-screen flex-col'>
         <Lottie className='animation' animationData={notFound} loop={true} />
         <h1 className='text-[64px]'>PAGE NOT FOUND</h1>
      </div>
    </>
  )
}

export default Error
