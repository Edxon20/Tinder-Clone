import TinderCard from "react-tinder-card"
import { useState } from 'react'
import ChatContainer from "../components/ChatContainer"
import axios from 'axios'
import { useEffect } from "react"
import { useCookies } from 'react-cookie';



function Dashboard() {

  

  const [user,setUser] = useState(null)
  const [cookies, setCookie,removeCookie] = useCookies(['user']);
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
  const [lastDirection, setLastDirection] = useState()
  const userId = cookies.UserId 

  //DONT FOUL the await because this make error 

 
 const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: {userId}
            })
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

useEffect(() => {
  getUser()

}, [])

  


  

  
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (

    <div className='dashboard'>    
      <ChatContainer user={user}/>
      <div className='swiper-container'>
        <div>
          <div className='card-container'>
            {characters.map((character) =>
              <TinderCard 
              className='swipe' 
              key={character.name} 
              onSwipe={(dir)=> swiped(dir, character.name)} 
              onCardLeftScreen={() => outOfFrame(character.name)}>
                <div 
                style={{ backgroundImage: 'url(' + character.url + ')' }} 
                className='card'>
                  <h3>{character.name}</h3>
                </div>
              </TinderCard>
            )}
            <div className="swipe-info">
              {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Dashboard