import React from 'react';
import "../designs/Button.css";
import {HashLink as Link} from 'react-router-hash-link';
const STYLES = ['btn--primary', 'btn--outline', 'btn--signup', 'btn--language'], SIZES = ['btn--medium', 'btn--large'];
const Where =["#start", "/login"];
export const Button = ({children, type, onClick, buttonStyle, buttonSize, where}) =>{
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const checkWhere = Where.includes(where)? where : Where[0]; 
    return (
        <Link   to={checkWhere} className= 'btn-mobile'>
            <button className = {`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type = {type} > {children}
            </button>
        </Link>
    )
};