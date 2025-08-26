import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function SearchResults() {
  const { searchTerm } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`https://apis.ccbp.in/insta-share/posts?search=${searchTerm}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Error fetching search results", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">
          Search Results
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No results found.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.post_id}
              className="bg-white rounded-lg shadow-md mb-8 overflow-hidden border border-gray-200"
            >
             
              <div className="flex items-center p-4">
                <img
                  src={post.profile_pic}
                  alt={post.user_name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <span className="ml-3 font-semibold text-gray-800">
                  {post.user_name}
                </span>
              </div>

            
              <img
                src={post.post_details.image_url}
                alt={post.post_details.caption}
                className="w-full object-cover"
              />

             
              <div className="flex items-center gap-4 px-4 pt-4 text-gray-700">
                <button className="hover:text-red-500">
                  ❤️
                </button>
                <button className="hover:text-blue-500">
                  💬
                </button>
                <button className="hover:text-green-500">
                  ↗
                </button>
              </div>

             
              <p className="px-4 pt-2 font-semibold text-gray-800">
                {post.likes_count} Likes
              </p>

              
              <p className="px-4 py-2 text-gray-700">
                <span className="font-semibold">{post.user_name}</span>{" "}
                {post.post_details.caption}
              </p>

              
              {post.post_details.hashtags && (
                <p className="px-4 pb-2 text-blue-500 text-sm">
                  {post.post_details.hashtags.map((tag) => `#${tag} `)}
                </p>
              )}

              
              <p className="px-4 pb-4 text-xs text-gray-500">
                {post.created_at}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
