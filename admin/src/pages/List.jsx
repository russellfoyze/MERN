import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../config'
import { toast } from 'react-toastify'
import { currency } from '../App'

const List = ({token}) => {

  const [list , setList]= useState([])
  const fatchList = async ()=>{

    try {
      
      const response = await axios.get(backendUrl + '/api/product/list' , {headers:{token}})
      
      if (response.data.products) {
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
      
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }

  const removeProduct = async (id)=> {
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove', {id} , {headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message)
        await fatchList()
      }else{
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fatchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>

      {/* ------------list Table Title */}
      <div className='hiddem md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {/* ----------Product List---------- */}

      {
        list.map((item , index)=>(
          <div className='grid  grid-cols-[3fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1- px-2 border border-gray-300 text-sm' key={index}>
            <img className='w-50'  src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <div>  <p>{item.category}</p>
            <p>{item.price}{currency}</p></div>
           
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>

        ))


    }

      </div>


    </>
  )
}

export default List
