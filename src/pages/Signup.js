import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Signup() {


  const [credentials, setCredentials] = useState({ username: "", email: "", password: "", address: "", role: "" });
  const history = useNavigate();


  const handleClick = async (e) => {

    e.preventDefault();

    const { username, email, password, address, role } = credentials;


    const response = await fetch("http://localhost:5000/auth/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',


      },

      body: JSON.stringify({ username, email, password, address, role })
    });
    const json = await response.json()

    console.log(json);
    console.log(role);
    
    if (json.success) {

      localStorage.setItem('token', json.authToken);

      console.log(json.username)
      localStorage.setItem('username', json.name);
      localStorage.setItem('address', json.address);

     
      history(`/${role}`);
    }
    else {
      alert("Invalid credentials");
    }


  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <>
      <div className="h-screen bg-indigo-100 flex justify-center items-center">
        <div className="lg:w-2/5 md:w-1/2 w-2/3">
          <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
            <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Sign Up</h1>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="username">Username</label>
              <input onChange={onChange} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="username" id="username" placeholder="username" />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="email">Email</label>
              <input onChange={onChange} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="email" id="email" placeholder="Email" />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Password</label>
              <input onChange={onChange} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="password" id="password" placeholder="password" />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="Address">Address</label>
              <input onChange={onChange} className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="address" id="address" placeholder="address" />
            </div>
            <div>
              <label htmlFor="role" className="text-gray-800 font-semibold block my-3 bg-white text-md">Select a Role</label>
              <select id="role" onChange={onChange} name="role" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled selected>
                  Choose user type
                </option>
                <option value="manufacturer">Manufacturer</option>
                <option value="transporter">Transporter</option>
              </select>

            </div>
            <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans" onClick={handleClick}>Register</button>
            <hr className="mb-6 border-t" />


            <Link
              className="flex justify-center items-center   text-sm  text-blue-500 align-baseline hover:text-blue-800 "
              to="/login"
            >
              Already have Account?
            </Link>

          </form>
        </div>
      </div>

    </>
  )
}

export default Signup