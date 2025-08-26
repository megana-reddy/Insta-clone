import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';

export default function Profile() {
    const [profileData, setProfileData] = useState([]);
    
    const {userId} = useParams()
    let url = "";

    if(userId){
      url = `https://apis.ccbp.in/insta-share/users/${userId}`
    }
    else{
      url = 'https://apis.ccbp.in/insta-share/my-profile';
    }

    function getProfile(){
        async function fetchDetails(){
            let apiUrl = '';

            if (userId) {
              apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`;
            } 
            else {
              apiUrl = 'https://apis.ccbp.in/insta-share/my-profile';
            }
            const jwtToken = localStorage.getItem('authToken');
            const options = {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${jwtToken}`
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            if(userId){
              setProfileData(data.user_details);
            }
            else{
              setProfileData(data.profile)
            }
            
        }
        fetchDetails();
    }

    useEffect(getProfile, [userId]);

    return (
  <> 
  <Navbar/>
  <div className="max-w-4xl mx-auto px-4 pt-8 font-sans text-[#262626]">
    {/* Profile Top Section */}
    <div className="flex flex-col md:flex-row md:items-center gap-10 border-b border-gray-300 pb-8">
      <img
        src={profileData.profile_pic}
        alt="profile"
        className="w-36 h-36 rounded-full object-cover"
      />
      
      <div className="flex-1">
        <h1 className='font-bold'>{profileData.user_name}</h1>
        <h1 className="text-2xl font-medium mb-2">{profileData.username}</h1>
        <div className="flex gap-6 text-sm mb-4">
          <span><strong>{profileData.posts_count}</strong> posts</span>
          <span><strong>{profileData.followers_count}</strong> followers</span>
          <span><strong>{profileData.following_count}</strong> following</span>
        </div>
        <p className="font-semibold text-sm">{profileData.user_id}</p>
        <p className="text-sm mt-1">{profileData.bio}</p>
      </div>
    </div>

    {/* Story Highlights */}
    {profileData.stories?.length > 0 && (
      <div className="flex gap-6 mt-6 border-b border-gray-300 pb-6 overflow-x-auto">
        {profileData.stories.map((story, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={story.image}
              className="w-16 h-16 rounded-full object-cover border"
            />
          </div>
        ))}
      </div>
    )}


    {/* Posts Section */}
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <h2 className="text-md font-medium uppercase tracking-wide">Posts</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {profileData.posts?.map((post, index) => (
          <img
            key={index}
            src={post.image}
            className="w-full h-[300px] object-cover"
          />
        ))}
      </div>
    </div>
  </div>
  </> 
);

}