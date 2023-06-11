import React, { useEffect } from 'react';

function Messages({ messages }) {

const get_info = async(orderId)=>{

  try {
    const response = await fetch(`http://localhost:5000/manifacturerChat/message/${orderId}`, {
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
  


  console.log(messages)
  return (
    <div>
      {messages &&
        messages.map((message) => (

          <div onClick={()=>get_info(message.orderId.orderId)} className={`flex ${!message.price?'bg-blue-300':'bg-green-300'} rounded-lg p-4 items-start mb-4 cursor-pointer`} key={message.id}>
            <div>
              <p className="text-gray-800 font-medium"><span className='text-black font-semibold'>Order ID: </span>{message.orderId.orderId}</p>
              <p className="text-gray-600">
                <span className='text-black font-semibold'>Sended To:</span> {message.senderId_to}
              </p>
              {
                message.price?

              (<p className="text-blue-800">
                <p className='font-bold'>
                  Repllied by {message.senderId_to}
                </p>
                <span className='text-black font-semibold'>price:</span> {message.price}
              </p>):(<></>)}
            </div>
          </div>
         
        ))}
    </div>

  );
}

export default Messages;
