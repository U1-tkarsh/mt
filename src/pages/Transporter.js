import React, { useState, useEffect } from 'react'
import T_form from '../components/T_form'
import T_MessageBox from '../components/T_MessageBox'
import Cliked_Message from '../components/Cliked_Message'

function Transporter() {

  const [form, setform] = useState(false)

  const [Filledform, setFilledform] = useState(false)

  useEffect(() => {

    if (localStorage.getItem('T_OrderInfo')) {
      setform(true);
    }


  }, [])

  useEffect(() => {

    if (localStorage.getItem('OrderInfo')) {
      setFilledform(true);
    }


  }, [])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 py-4">
        <h1 className="text-white text-center text-2xl">Message Box</h1>
      </header>
      <main className="container mx-auto flex-grow mt-8 mb-4">

        <T_MessageBox />

{
    
    Filledform?(<Cliked_Message/>):(<>{

      !form ? (<></>) : (<T_form />)


    }
</>)

   

}



        
      </main>


    </div>
  )
}

export default Transporter