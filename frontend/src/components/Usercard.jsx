import React from 'react'

const Usercard = ({user}) => {
  if (!user) {
    return <div>No user data available</div>;
  }
  const {firstName, lastName, gender, age, photoUrl, skills} =user;
  return (
    <div className="flex justify-center items-center mt-20 md:mt-0 min-h-screen/2 md:min-h-screen z-0">

    <div className="card card-compact bg-base-300 w-80 md:w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl}
        alt="Shoes" 
        className='max-h-64 md:max-h-full'
        />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName+" "}{lastName}</h2>
     <span>{age+ ","}{gender}</span> <span>{skills+" "}</span>
      <div className="card-actions justify-center">
        <button className="btn btn-sm btn-primary">Ignore</button>
        <button className="btn btn-sm btn-secondary ml-3">Interested</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Usercard;
