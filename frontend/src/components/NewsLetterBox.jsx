import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
    }
    
  return (
    <div className='mt-10 text-center '>
        <p className='text-2xl font-medium text-gray-800'>Join Our Community</p>
        <p className='mt-3 text-gray-400'>Subscribe to our newsletter to get the latest updates on new arrivals and exclusive offers.</p>
        <form onClick={onSubmitHandler} className='flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2'>
            <input 
                className='w-full outline-none sm:flex-1' 
                type="email" 
                placeholder='hello@gmail.com'
                required 
            />
            <button type='submit' className='px-10 py-4 text-xs text-white bg-black'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
