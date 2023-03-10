import { useState } from 'react';
import { Form } from 'react-router-dom';
import Nav from '../components/Nav';
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Onboarding() {

  const [cookies, setCookie,removeCookie] = useCookies(['user']);
  

  const[formData, setFormData] = useState({    
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    url: '',
    about: '',
    matches: []
  })

  const {user_id, first_name, dob_day, dob_month, dob_year, show_gender, gender_identity, gender_interest, email, url, about, matches} = formData;

  const handleChange = (e) => {
    
    if(e.target.type == 'checkbox'){      
      setFormData({
        ...formData,
        ["show_gender"]: !formData.show_gender,
      })
      return
    }

    setFormData({
      ...formData,
      [e.target.name] : e.target.value
  })
  }
  let navigate = useNavigate()
  const handleSubmit = async (e) => {

    e.preventDefault()

    try{
      const response = await axios.put('http://localhost:8000/user', {formData})
      const success = response.status === 200      
      if(success) navigate('/dashboard')
    } catch(err){
      console.log(err)
    }

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

        <form onSubmit={handleSubmit} >
          <section>

            <label htmlFor='first_name'> First Name</label>
            <input
              id='first_name'
              type="text"
              name="first_name"
              placeholder='First Name'
              required={true}
              value={first_name}
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
                value={dob_day}
                onChange={handleChange}
              />

              <input
                id='dob_month'
                type="number"
                name="dob_month"
                placeholder='MM'
                required={true}
                value={dob_month}
                onChange={handleChange}
              />

              <input
                id='dob_year'
                type="number"
                name="dob_year"
                placeholder='YYYY'
                required={true}
                value={dob_year}
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
                value="man"
                onChange={handleChange}
                checked={gender_identity === 'man'}
              />
              <label htmlFor='man-gender-identity'> Man</label>

              <input
                id='woman-gender-identity'
                type="radio"
                name="gender_identity"
                placeholder='DD'
                value="woman"
                onChange={handleChange}
                checked={gender_identity === 'woman'}
              />
              <label htmlFor='woman-gender-identity'> Woman</label>

              <input
                id='more-gender-identity'
                type="radio"
                name="gender_identity"
                placeholder='DD'
                value="more"
                onChange={handleChange}
                checked={gender_identity === 'more'}
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
              checked={show_gender}
            />

            <label>Show me</label>
            <div className='multiple-input-container'>
              
              <input
                id='man-gender-interest'
                type="radio"
                name="gender_interest"
                placeholder='DD'
                value="man"
                onChange={handleChange}
                checked={gender_interest === 'man'}
              />
              <label htmlFor='man-gender-interest'> Man</label>

              <input
                id='woman-gender-interest'
                type="radio"
                name="gender_interest"
                placeholder='DD'
                value="woman"
                onChange={handleChange}
                checked={gender_interest === 'woman'}
              />
              <label htmlFor='woman-gender-interest'> Woman</label>

              <input
                id='everyone-gender-interest'
                type="radio"
                name="gender_interest"
                placeholder='DD'
                value="everyone"
                onChange={handleChange}
                checked={gender_interest === 'everyone'}
              />
              <label htmlFor='everyone-gender-interest'> Every One</label>
            </div>

            <label htmlFor='about'>About me</label>
            <input
              id='about'
              type="text"
              name="about"
              required={true}
              placeholder='I like cats and make money...'
              value={about}
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
                required={true}
              />
              <div>
                {formData.url && (<img src={url}  alt="profile pic preview"/>)} 
              </div>
            </div>
          </section>
        </form>
      </div>
    </>


  )
}

export default Onboarding