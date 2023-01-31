import TinderCard from "react-tinder-card"
import { useState } from 'react'
import ChatContainer from "../components/ChatContainer"
import axios from 'axios'
import { useEffect } from "react"
import { useCookies } from 'react-cookie';



function Dashboard() {

  

  const [user,setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [cookies, setCookie,removeCookie] = useCookies(['user']);
  const [lastDirection, setLastDirection] = useState()
  const userId = cookies.UserId 
  const characters = [
    {
      name: 'Richard Hendricks',
      url: 'https://i.imgur.com/oPj4A8u.jpeg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://i.imgur.com/Q9WPlWA.jpeg'
    },
    {
      name: 'Monica Hall',
      url: 'https://i.imgur.com/wDmRJPc.jpeg'
    },
    {
      name: 'Jared Dunn',
      url: 'https://i.imgur.com/OckVkRo.jpeg'
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://i.imgur.com/H07Fxdh.jpeg'
    }
  ]
  
  

  //DONT FOUL the await because this make error 

 /////////////////////////////////////////////////////////////////////////////////////////////
 
const getGenderedUsers = async () =>{
  
  try{        
    const response = await axios.get('http://localhost:8000/gendered-users', {
      params: { gender: user.gender_interest }
    })
    setGenderedUsers(response.data)   
  } catch (error) {
    console.log(error)
  }  

}
 
 const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: {userId}
            })
            setUser(response.data)             
            
        } catch (error) {
            console.log(error)
        } 
        
        getGenderedUsers()
    }

      useEffect(() => {
        getUser()

      }, [])

      useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
      }, [user])

      const updateMatches = async(matchedUserId) =>{

        try{
          await axios.put('http://localhost:8000/addmatch', {
            userId,
            matchedUserId
          })
          getUser()
        }  catch(error){
          console.log(error)
        }     

      }


/////////////////////////////////////////////////////////////////////////////////////////////


  const swiped = (direction, swipedUser) => {
    
    if(direction === 'right'){
      updateMatches(swipedUser)
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <>
    {/* To show the dashboard */}
    {user &&
    <div className='dashboard'>    
      <ChatContainer user={user}/>
      <div className='swiper-container'>
        <div>
          <div className='card-container'>
            
            { genderedUsers && genderedUsers.map((character) =>
              <TinderCard 
              className='swipe' 
              key={character.name} 
              onSwipe={(dir)=> swiped(dir, character.user_id)} 
              onCardLeftScreen={() => outOfFrame(character.first_name)}>
                <div 
                style={{ backgroundImage: 'url(' + character.url + ')' }} 
                className='card'>
                  <h3>{character.first_name}</h3>
                </div>
              </TinderCard>
            )}
            {/* // For to add info in matches */}
            <div className="swipe-info">
              {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
            </div>

          </div>
        </div>
      </div>


    </div>
    }
    </>
  )
}

export default Dashboard