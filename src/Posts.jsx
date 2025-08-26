import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Posts(){
  const [postsArr, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    async function fetchPosts(){
      const url = 'https://apis.ccbp.in/insta-share/posts';
      const jwtToken = localStorage.getItem('authToken');
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        }
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setPost(data.posts);
    }
    fetchPosts();
  }, []);

  function getUserProfile(userId){
    navigate(`/profile/${userId}`)
  }

  return (
  <div className="flex flex-col items-center gap-6 mt-6">
    {postsArr.map((post) => {
      return (<div key={post.post_id} className="w-[500px] bg-white rounded-md shadow">
        {/* Profile Header */}
        <div className="flex items-center gap-2 p-4" onClick={()=>getUserProfile(post.user_id)}>
          <img src={post.profile_pic} alt="profile" className="h-10 w-10 rounded-full" />
          <p className="font-semibold">{post.user_name}</p>
        </div>

        {/* Post Image */}
        <img
          src={post.post_details.image_url}
          alt="post"
          className="w-full h-[400px] object-cover"
        />

        {/* Icons */}
        <div className="p-4 flex gap-4 text-xl">
          <span>❤</span>
          <span>💬</span>
          <span>📤</span>
        </div>

        {/* Like Count */}
        <div className="px-4 font-semibold">{post.likes_count} likes</div>

        {/* Caption */}
        <div className="px-4">
          <p className="mb-1">
            <span className="font-semibold">{post.user_name} </span>
            {post.post_details.caption}
          </p>
        </div>

        {/* Comments */}
        <div className="px-4">
          {post.comments.slice(0, 2).map((comment, index) => (
            <p key={index}>
              <span className="font-semibold">{comment.user_name} </span>
              {comment.comment}
            </p>
          ))}
        </div>

        {/* Timestamp */}
        <p className="px-4 py-2 text-xs text-gray-500">{post.created_at}</p>
      </div>)
})}
  </div>
);

}

export default Posts;