import React, { useState, useEffect } from 'react'
import MessageBox from '../components/MessageBox';
import M_form from '../components/M_form';


function Manufacturer() {

  const [users, setUsers] = useState([]);
  const [form, setform] = useState(false)

  // TO GET TRANSPORTER FROM SERVER

  const [orderInfo, setorderInfo] = useState(false);




  console.log(orderInfo)


  const removeInfo = () => {

    localStorage.removeItem('OrderInfo')
    window.location.reload();

  }

  const getAllTransporter = async () => {




    const response = await fetch(`http://localhost:5000/auth/getalluser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },


    })
    console.log(response)

    const json = await response.json()



    setUsers(json);




  }

  const handleClick = () => {

    setform(true);
    getAllTransporter();

  }

  console.log(users,"users record")



  useEffect(() => {
    if (localStorage.getItem('OrderInfo')) {
      setform(true);
    }


  }, [])

  useEffect(() => {

    if (localStorage.getItem('OrderInfo')) {
      setorderInfo(JSON.parse(localStorage.getItem('OrderInfo')));

    }
    else {

      setorderInfo(false);
    }
  }, [localStorage.getItem('OrderInfo')])




  return (
    <>

      <div className="min-h-screen flex flex-col bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto py-4 px-8">
            <h1 className="text-2xl font-semibold text-gray-800">Message Interface </h1>
          </div>
        </header>
        <main className="container mx-auto flex-grow mt-8 mb-4">

          <MessageBox />
        </main>


        {
          form && <M_form users={users} />

        }


        <footer className="bg-gray-200 py-4">
          <div className="flex items-center justify-center">



            {

              <div>
                {orderInfo ? (<button onClick={removeInfo} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full lg:w-2/3">
                  Click here For New Message to transporter
                </button>) : (

                  <>


                    {
                      !form ? (<button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full lg:w-2/3">
                        Click here for Order to Transporter
                      </button>) :

                        (<button onClick={() => setform(false)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full lg:w-2/3">
                          Click here for not send  Order to Transporter
                        </button>)
                    }


                  </>)}
              </div>



            }



          </div>
        </footer>
      </div>
    </>
  );
};

export default Manufacturer