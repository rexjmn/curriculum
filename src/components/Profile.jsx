import React from 'react'

export default function Profile({nom, prenom}) {

  return (
    <div>
      <div className='flex justify-start items-start flex-col pl-10 pt-[70px]'>
        <img className='w-60 h-60 rounded-full m-5' src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
      <h1 className='text-5xl font-bold text-center pt-5 font-[LeagueSpartan]'>{nom} {prenom}</h1>
        </div>
    </div>
  )
}
