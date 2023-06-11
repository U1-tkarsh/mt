import React, { useState, useEffect } from 'react';

import Messages from './Messages'

function MessageBox() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    
    async function fetchMessages() {
      try {
        const response = await fetch(`http://localhost:5000/manifacturerChat/all_messages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
  
          },
  
        
        });

        const json = await response.json();

        console.log(json)
        setMessages(json)
      
        
        // console.log(json);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  
    fetchMessages(); 
  }, []);




  return (
  <>
  <h1 className='text-black font-bold'> Transporters Messages (to see click on messages ) (blues are defined message not replied yet and green shows replied)</h1>
  <br/>
  
  <div className="bg-gray-200 p-4 rounded-lg overflow-y-auto h-80 py-4">


  <Messages messages={messages}/>





  

   
    
    
    </div>
    </>
  )
}

export default MessageBox