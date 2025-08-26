import React, { useEffect,useState } from 'react'

export default function Stories() {
    const [story, setStory] = useState([]);
  
  function getStories() {
    async function fetchDetails(){
      const url = 'https://apis.ccbp.in/insta-share/stories';
      const jwtToken = localStorage.getItem('authToken');
      const options = {
        method: 'GET',
        headers: {
          Authorization:`Bearer ${jwtToken}`
        }
      }
      let response = await fetch(url,options)
      let data = await response.json();
      setStory(data.users_stories)
    }
    fetchDetails();
}

useEffect(getStories,[])

  return (
    <div className='flex justify-center'>
      <div className='flex justify-between w-250 mt-10'>
        {story.map((eachItem)=>{
          return(<div className='flex flex-col'>
            <img src={`${eachItem.story_url}`} className='rounded-4xl size-15 border-pink-700 border-3' />
            <p className='text-sm ml-4'>{eachItem.user_name.split(" ")[0]}</p>
          </div>)
        })}
      </div>
    </div>
  )
}