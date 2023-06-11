import React,{useState,useEffect} from 'react'

function Cliked_Message() {


    const[clicked_info,setclicked_info] = useState(false);

const removeInfo = ()=>{

    localStorage.removeItem('OrderInfo')


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
    <form className="w-full mx-10 py-8">
    <div className="mb-4">
      <label htmlFor="orderID" className="block text-gray-700 font-bold mb-2">
        Order ID
      </label>
      <input
        
        type="text"
        id="orderId"
        name="orderId"
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={clicked_info?clicked_info.orderId.orderId:""} // Generating a random order ID
        readOnly
      />
    </div>

    <div className="mb-4">
      <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
        Quantity
      </label>
      <select

        
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
        
        id="transporter"
        name="transporter"
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >

        {clicked_info?( 
        
        <option value="" disabled selected>
          {clicked_info.transporter}
        </option>
        
        ):(<>
         
        
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
        
        value={clicked_info?clicked_info.transporter:""}
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
      onClick={removeInfo}
      disabled={clicked_info.price}
      type="submit"
     className="bg-blue-500 h-10 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed">
      
      click here for reply
     
    </button>
  </form>
  )
}

export default Cliked_Message