import React from 'react';

function Button({text, onClick, className, customAttributes}) {
  return <button onClick={onClick} className={className} {...customAttributes} >{text}</button>;
}

export default Button;
