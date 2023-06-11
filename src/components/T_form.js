import React,{useState} from 'react'

function T_form() {


  const [credentials, setCredentials] = useState({price:""});
    const {price} = credentials;

  const sendReply = async()=>{
   
    try {
      const orderId =  localStorage.getItem('T_OrderInfo')
      const response = await fetch(`http://localhost:5000/transporterChat/t_send/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
  
        },


        body: JSON.stringify({ price })
      
      });
  
      const json = await response.json();
      
      console.log("Tjis i asdfjajsfd",json)

      if(json){

        alert('Replyed Successfully')
      }
      
       
      window.location.reload();
    }
   catch(err){
  
    alert('Replyed Unsuccessfull internal error')
   
   }
  
  
  }

  const onChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value, to: e.target.value })


  }




  return (
    <> {/* Main Content */}
    <main className="flex-grow pt-8 flex flex-col justify-center items-center">
      <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg shadow-cyan-600">
        {/* Message Thread */}
        <div className="mb-6">
          <div className="flex items-start mb-2">
            
            <div className="ml-3">
              <p className="text-sm font-medium"></p>
              {/* Message Content */}
              <p className="text-gray-600">Hello, how much are you willing to pay for this service?</p>
            </div>
          </div>
          {/* Reply Input */}
          <div className="flex justify-between">
            <input
            onChange={onChange}
              className="w-full bg-gray-100 border border-gray-300 rounded p-2"
              type="text"
              name="price"
              placeholder="Enter your price..."
            />
            <button onClick={sendReply} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Reply Him
            </button>
          </div>
        </div>
      </div>
    </main></>
  )
}

export default T_form