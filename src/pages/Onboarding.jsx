import { useState } from 'react'
import { Form } from 'react-router-dom'
import Nav from '../components/Nav'

function Onboarding() {

  // const handleSubmit = e => {
  //   e.preventDefault();
  // } 

  const handleChange = () => {

  }

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
          <section>

            <label htmlFor='first_name'> First Name</label>
            <input
              id='first_name'
              type="text"
              name="first_name"
              placeholder='First Name'
              required={true}
              value={""}
              onChange={handleChange}
            />

            <label> Birthday </label>
            <div className='multiple-input-container' >
              <input
                id='dob_day'
                type="number"
                name="dob_day"
                placeholder='DD'
                required={true}
                value={""}
                onChange={handleChange}
              />

              <input
                id='dob_month'
                type="number"
                name="dob_month"
                placeholder='MM'
                required={true}
                value={""}
                onChange={handleChange}
              />

              <input
                id='dob_year'
                type="number"
                name="dob_year"
                placeholder='YYYY'
                required={true}
                value={""}
                onChange={handleChange}
              />
            </div>

            <label> Gender </label>
            
            <div className='multiple-input-container' >
              
            <input
                id='man-gender-identity'
                type="radio"
                name="gender_identity"
                placeholder='DD'
                value="woman"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor='man-gender-identity'> Man</label>
              
              <input
                id='woman-gender-identity'
                type="radio"
                name="gender_identity"
                placeholder='DD'
                value="man"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor='woman-gender-identity'> Woman</label>

              <input
                id='more-gender-identity'
                type="radio"
                name="gender_identity"
                placeholder='DD'
                value="more"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor='more-gender-identity'> More</label>             
            </div>

            <label htmlFor='show-gender'> Show gender on my profile</label>
            <input
                id='show-gender'
                type="checkbox"
                name="show_gender"
                placeholder='DD'                
                onChange={handleChange}
                checked={false}
              />

              <label>Show me</label>
              <div className='multiple-input-container'>

              <input
                id='man-gender-interest'
                type="radio"
                name="gender_interest"
                placeholder='DD'
                value="woman"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor='man-gender-identity'> Man</label>
              
              <input
                id='woman-gender-interest'
                type="radio"
                name="gender_interest"
                placeholder='DD'
                value="man"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor='woman-gender-interest'> Woman</label>

              <input
                id='everyone-gender-interest'
                type="radio"
                name="gender_interest"
                placeholder='DD'
                value="everyone"
                onChange={handleChange}
                checked={false}
              />
              <label htmlFor='more-gender-interest'> Every One</label>      
              </div>

              <label htmlFor='about'>About me</label>
              <input 
                id='about'
                type="text"
                name="about"
                required = {true}
                placeholder='I like cats and make money...'
                value = {""}
                onChange={handleChange}
              />
              <input 
                type="submit"
                value="SUBMIT"

              />
          </section>

          <section>
            <label htmlFor='about'>Profile Profile</label>
            <div className='photo-container'>
              <input 
                type="url"
                name="url"
                id="url"
                onChange={handleChange}
                required ={true}
              />
            </div>
          </section>
        </form>
      </div>
    </>


  )
}

export default Onboarding