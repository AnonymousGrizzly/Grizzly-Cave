import React, { useEffect, useState } from 'react';
import "../designs/Storage.css";
import useAuth from '../hooks/useAuth';

function Storage() {
  const [userData, setUserData] = useState({});
  const { getProfileData, user } = useAuth();

  useEffect(() => {
    getProfileData().then((data) => setUserData(data));
  }, [user]);


  return <div>
      <div className='storage-cntnr'>
        <div className='storagetitle-cntnr'>
          <h1>File Storage</h1>
        </div>
        <div className='files-cntnr'>

        </div>
        <div className='control-panel'>
          <ul className=''>
            <li>

            </li>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
  </div>;
}

export default Storage;
