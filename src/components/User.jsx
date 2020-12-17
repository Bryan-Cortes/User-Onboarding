import React from 'react'

export default function User({details}) {
  
  return (
    <div>
      <h2>{details.name}</h2>
      <p><span>Email:</span> {details.email}</p>
      <p><span>Password:</span> {details.password}</p>
      <p><span>Terms:</span> {details.terms}</p>
    </div>
  )
}
