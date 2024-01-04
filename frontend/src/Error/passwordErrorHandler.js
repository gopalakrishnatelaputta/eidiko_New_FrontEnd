import React from 'react'

export default function passwordErrorHandler(password) {
  let error1={}
  if(!password){
    error1.name="Password field can't be empty"
}
else if(password.length<8 || password.length>20){
    error1.name="Password length must be in between 8 to 20"
}
    
  return error1
}
