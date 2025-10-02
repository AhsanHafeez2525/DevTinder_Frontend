import React from 'react'

const Premium = () => {
  return (
    <div className="flex w-full">
  <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
    <h1>Silver Membership</h1>
    <ul>
        <li>1000 Credits</li>
        <li>1000 Credits</li>
        <li>1000 Credits</li>
    </ul>
  </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">
    <h1>Gold Membership</h1>
    <ul>
        <li>1000 Credits</li>
        <li>1000 Credits</li>   
        <li>1000 Credits</li>
    </ul>
  </div>
</div>
  )
}

export default Premium