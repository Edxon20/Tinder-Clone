import React from 'react'
import Nav from "../components/Nav"

function Home() {

    const authToken = false;

    const handleClick = () =>{
        alert('click')
    }

  return (
    <>
    <Nav 
        minimal={false}
        authToken={false}
    />
    <div className='home'>
        <h1>Swipe Rigth</h1>        
        <button className='primary-button' onClick={handleClick}>  
            {authToken ? 'Signout' : 'Create Account' }
        </button>
    </div>
    </>
  )
}

export default Home