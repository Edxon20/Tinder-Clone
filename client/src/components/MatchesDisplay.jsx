import { useState } from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'



function MatchesDisplay({matches}) {

  const [ matchedProfiles, setMatcheProfiles  ] = useState(null)
  const matcheduserIds = matches.map(( {user_id}) => user_id)
  

  const getMatches = async() =>{
    try{
      const response = await axios.get('http://localhost:8000/users',{
        params: {userIds : JSON.stringify(matcheduserIds)}
      })
      setMatcheProfiles(response.data)
    } catch(e){
      console.log(e)
    }
  }


  console.log(matchedProfiles)

  return (
    
    <div className='matches-display'>




    </div>

  )
}

export default MatchesDisplay