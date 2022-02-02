import React from 'react';

function Profile() {
  return <div>
      <div className='profile-cntnr'>
        <div id="user">
            <h2 id="username"></h2>
            <p id="email"></p>
            <p id="password"></p>
            <button classname="classic-button">Change</button>
        </div>
      </div>
  </div>;
}

export default Profile;
