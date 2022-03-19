import React, { useState } from 'react';
import "../designs/Mail.css";
import Input from "../components/Input"
import Button from '../components/Button';

function Mail() {

  const [NumOfMail, setNumOfMail] = useState(false);

  return <div>
    <div id="mail" className='mail-cntnr'>
      <h1>File Send</h1>
      <div className='mailbox-cntnr'>
        <h3>Mailbox</h3> 
        {NumOfMail ? (<div>
          tole je pa treba še narest
        </div>) : (
          <p> You have no mail </p>
        )}
      </div>
      <div className='postaloffice-cntnr'>
        <h3 className='icon'>New Packet</h3>
        <div>
          <p>to:</p>
          <Input required
           placeholder="Receiver username"
            type="text"
          />
          <p>short message:</p>
          <Input
           placeholder={"message"}
          />
          <p>choose file:</p>
          <div className='office-btns'>
            <Button
            text={"Choose file"}
            className={"choose-btn"}
            
            /><br/>
            <Button
            text={"SEND"}
            className={"secondary-btn"}
            />
          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default Mail;
