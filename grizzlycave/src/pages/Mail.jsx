import React from 'react';
import "../designs/Mail.css";
import Input from "../components/Input"
import Button from '../components/Button';

function Mail() {
  return <div>
    <div id="mail" className='mail-cntnr'>
      <h1>File Send</h1>
      <div className='mailbox-cntnr'>
        <h3>Mailbox</h3> 
      </div>
      <div className='postaloffice-cntnr'>
        <h3 className='icon'>New Packet</h3><br/>
        <form>
          <p>to:</p>
          <Input required placeholder="Receiver username" type="text"/>
          <p>message:</p>
          <Input placeholder={"message"}/>
          <p>choose file:</p>
          <Button
          text={"Choose"}
          className={"choose-btn"}
          
          /> <br/> <br/>
          <Button
          text={"SEND"}
          className={"secondary-btn"}
          />
        </form>
      </div>
    </div>
  </div>;
}

export default Mail;
