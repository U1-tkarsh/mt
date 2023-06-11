import React ,{useState,useEffect}from 'react'
import T_Messages from './T_Messages'

function T_MessageBox() {




    const [messages, setMessages] = useState([]);

    useEffect(() => {

        async function fetchMessages() {
            try {
                const response = await fetch(`http://localhost:5000/transporterChat/all_messages`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')

                    },


                });

                const json = await response.json();

              
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

            <h1 className='text-black  font-extrabold text-2xl '> Choose Order Messages to Reply Manufacturer</h1>
            <br />

            <div className="bg-gray-200 p-4 rounded-lg overflow-y-auto h-80 py-4">


                <T_Messages messages={messages} />

            </div>
        </>
    )
}

export default T_MessageBox