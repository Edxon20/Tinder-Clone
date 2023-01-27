import { useState } from 'react'
import { Form } from 'react-router-dom'
import Nav from '../components/Nav'

function Onboarding() {

  // const handleSubmit = e => {
  //   e.preventDefault();
  // } 

  return (
    <>
      <Nav
        minimal={true}
        showModal={false}
        setShowModal={() => { }}
      />
      <div className='onboarding'>

        <h2>CREATE ACCOUNT</h2>
        
        <form onSubmit={e => e.preventDefault()} >

        </form>


      </div>

    </>


  )
}

export default Onboarding