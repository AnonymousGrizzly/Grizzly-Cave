import React from 'react';

function Input({value, setValue, placeholder, type, customAttributes, required, onKeyPress}) {
  return <input type={type} placeholder={placeholder} onInput={(e)=>setValue(e.target.value)} value={value} {...customAttributes} required={required} onKeyPress={onKeyPress}/>; //required ?
}

export default Input;
