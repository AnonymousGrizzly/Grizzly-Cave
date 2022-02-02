import React, {useState} from 'react';

function Input({value, setValue, placeholder, type, customAttributes, required}) {

  
  return <input type={type} placeholder={placeholder} onInput={(e)=>setValue(e.target.value)} value={value} {...customAttributes} required={required} />; //required ?
}

export default Input;
