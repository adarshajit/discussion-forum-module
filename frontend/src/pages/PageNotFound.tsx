import NotFound from '../assets/error.png'

const PageNotfound = () => {
  return (
    <div className='h-screen w-full flex flex-col gap-20 justify-center items-center'>
      <p className='text-3xl font-semibold text-gray-500'>Uh oh! The page you're looking for does not exist! 😔</p>
      <img src={NotFound} alt="Not found" width={200}/>
    </div>
  )
}

export default PageNotfound