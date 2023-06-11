import React, { useState } from 'react';

function T_Messages({ messages }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const get_info = (orderId) => {
    localStorage.setItem('T_OrderInfo', orderId);
    setSelectedOrderId(orderId);
    localStorage.removeItem('OrderInfo')
  };


  const get_that_message = async(orderId) => {

    try {
      const response = await fetch(`http://localhost:5000/transporterChat/message/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
  
        },
  
      
      });
  
      const json = await response.json();
      localStorage.setItem('OrderInfo',JSON.stringify(json))
      window.location.reload();
    }
   catch(err){
  
    console.log(err);
   }
  
     


    
  }

  return (
    <div>
      {messages &&
        messages.map((message) => (
          <div
            onClick={() => get_info(message.orderId.orderId)}
            className={`flex justify-between items-center ${selectedOrderId === message.orderId.orderId ? 'bg-blue-500' : 'bg-blue-300'
              } rounded-lg p-4 items-start mb-4 cursor-pointer`}
            key={message.id}
          >
            <div className='flex items-cente justify-between '>
              <div>
              <p className="text-red-800  font-bold">
                {!message.price ? <>Reply to Him</> : <></>}
              </p>
              <p className="text-gray-800 font-medium">
                <span className="text-black font-semibold">Order ID: </span>
                {message.orderId.orderId}
              </p>
              <p className="text-gray-600">
                <span className="text-black font-semibold">Message From </span>
                {message.chatId_from}
              </p>
              {message.price ? (
                <p className="text-blue-800">
                  <p className="font-bold">Replied by {message.chatId_from}</p>
                  <span className="text-black font-semibold">Price:</span> {message.price}
                </p>
              ) : (
                <></>
              )}
              </div>
              
            </div>
            <div  className='flex items-center pt-10'>
               <button  onClick={()=>get_that_message(message.orderId.orderId)}  className="bg-blue-500 h-10 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed">show info</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default T_Messages;
