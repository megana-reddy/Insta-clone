import { useNavigate } from "react-router-dom"
import { useState } from "react"; // 

function Navbar(){

  const [searchInput, setSearchInput] = useState(""); // 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search/${searchInput.trim()}`); //navigate to SearchResults
    }
  }; 

  function handleLogout(){
    localStorage.removeItem('authToken');
    navigate('/login');
  }

  function handleProfile(){
    navigate('/profile')
  }

  function handleHomePage(){
    navigate('/home')
  }

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      
      <div className="flex items-center space-x-3">
        <img
          className="h-10 w-10 object-cover rounded-full"
          src="https://res.cloudinary.com/dak7gtph6/image/upload/v1752295100/logo_n05zia.jpg"
          alt="Logo"
        />
        <h1 className="text-xl font-semibold text-gray-800">Insta Share</h1>
      </div>

      {/* input+button in a form and use state */}
      <form 
        onSubmit={handleSearch} 
        className="flex items-center border border-gray-300 rounded overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search Caption"
          value={searchInput} // controlled input
          onChange={(e) => setSearchInput(e.target.value)} // update state
          className="p-2 outline-none text-sm w-64"
        />
        <button 
          type="submit" 
          className="bg-gray-200 px-3 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-5 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
      {/* Form ensures pressing Enter works */}

      <div className="flex items-center space-x-6 text-gray-700 font-medium">
        <p className="cursor-pointer hover:text-blue-500" onClick={handleHomePage}>Home</p>
        <p className="cursor-pointer hover:text-blue-500" onClick={handleProfile}>Profile</p>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default Navbar
