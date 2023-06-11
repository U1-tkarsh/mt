import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';






function M_form({ users }) {

  const[clicked_info,setclicked_info] = useState(false);




  const history = useNavigate()

  console.log(users,"Hello")

  const [credentials, setCredentials] = useState({ orderId: `XB${Math.floor(Math.random() * 1000)}`, quantity: "", address: localStorage.getItem('address'), transporter: "", to: "", form: localStorage.getItem('username') });
  const { orderId, quantity, address, transporter, } = credentials


  const handleClick = async (e) => {



    e.preventDefault();




    try {
      const response = await fetch(`http://localhost:5000/manifacturerChat/m_send/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')

        },

        body: JSON.stringify({ quantity, address, transporter })
      });




      const json = await response.json()

      console.log(json)

      if (json) {
        alert(`Your message sended to ${transporter} succesfully`)
        setCredentials({ ...credentials,orderId: `XB${Math.floor(Math.random() * 1000)}`,quanity: "", transporter: "", })
        window.location.reload();
      }




    } catch (error) {
      alert(`Your message not  sended succesfully to ${transporter}`)
    }




  }



  console.log("it is under the form", users);


  //to get inputs from input fields

  const onChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value, to: e.target.value })


  }
  useEffect(() => {
    
    if(localStorage.getItem('OrderInfo')){
      setclicked_info(JSON.parse(localStorage.getItem('OrderInfo')));
  
    }
    else{
  
      setclicked_info(false);
    }
  }, [localStorage.getItem('OrderInfo')])
  


  return (
    <>
      {/* {

       json &&

        json ? ( 
        setTimeout(() => {
          <div
          className="mb-4 rounded-lg bg-success-100 px-6 py-5 text-base text-success-700"
          role="alert">
          Your Order sended successfully
        </div>
        }, 2000))
        : 
        
        (

          setTimeout(() => {
            <div
                className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
                role="alert">
                Your order not sended plese choose valid input
              </div>
            
           }, 2000)
        )
          

      } */}


<form className="w-full mx-10 py-8">
        <div className="mb-4">
          <label htmlFor="orderID" className="block text-gray-700 font-bold mb-2">
            Order ID
          </label>
          <input
            onChange={onChange}
            type="text"
            id="orderId"
            name="orderId"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={clicked_info?clicked_info.orderId.orderId:orderId} // Generating a random order ID
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
            Quantity
          </label>
          <select

            onChange={onChange}
            id="quantity"
            name="quantity"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >


            {clicked_info?(<option value="" disabled selected>
             {clicked_info.quantity} ton
                </option>):( 
                <>
            <option value="1">1 ton</option>
            <option value="2">2 ton</option>
            <option value="3">3 ton</option>
            </>)}
             
           
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
            Address
          </label>
          <input
            onChange={onChange}
            type="text"
            id="address"
            name="address"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue={clicked_info?(clicked_info.address):(localStorage.getItem('address'))}
           
          />
        </div>
        <div className="mb-4">
          <label htmlFor="transporter" className="block text-gray-700 font-bold mb-2">
            Transporter
          </label>

          <select
            onChange={onChange}
            id="transporter"
            name="transporter"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >

            {clicked_info?( 
            
            <option value="" disabled selected>
              {clicked_info.transporter}
            </option>
            
            ):(<>
              <option value="TATA Delivery">TATA Delivery</option>
            <option value="Birla Delivery">Birla Delivery</option>
            <option value="Fastrack">Fastrack</option>
            {users &&
              users.map((user) => (
                user.role === 'transporter'&&
                <option key={user.id} defaultValue={user.username}>
                  {user.username}
                </option>
              ))}
              </>
            )
             

            }
            
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="to" className="block text-gray-700 font-bold mb-2">
            To
          </label>
          <input
            onChange={onChange}
            value={clicked_info?clicked_info.transporter:transporter}
            type="text"
            id="to"
            name="to"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="from" className="block text-gray-700 font-bold mb-2">
            From
          </label>
          <input
            onChange={onChange}
            type="text"
            id="from"
            name="from"
            defaultValue={localStorage.getItem('username')}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {clicked_info.price?(

            <>
            <div className="mb-4">
          <label htmlFor="from" className="block text-gray-700 font-bold mb-2">
           price
          </label>
          <input
            
            type="text"
           
            defaultValue={clicked_info.price}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
            
            </>

        ):(<></>)}
        
        <button
          onClick={handleClick}
          disabled={clicked_info}
          type="submit"
         className="bg-blue-500 h-10 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed">
        
          Send order
        </button>
      </form>
    </>
    
  )
}

export default M_form