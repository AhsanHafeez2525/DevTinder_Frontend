import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, about, skills} = user;
    console.log(user)
  return (
<div className="card bg-base-300 w-96 shadow-sm mb-24">
  <figure className="px-10 pt-10">
    <img
      src={photoUrl}
      alt={`${firstName} ${lastName}`} 
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Send Request</button>
    </div>
  </div>
</div>
  )
}

export default UserCard
