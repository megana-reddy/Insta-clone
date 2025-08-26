import LoginPage from "./LoginPage"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from './ProtectedRoute'
import HomePage from "./HomePage"
import Profile from "./Profile"
import SearchResults from "./SearchPage"
import NotFoundPage from "./NotFoundPage"

function App() {
  return(
    <>
       {/* <LoginPage / > */}
       <BrowserRouter>
         <Routes>
          <Route path="/login" element={<LoginPage />} />
           <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
           <Route path="/profile/:userId?" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
   {/* Normally, Navigate pushes a new route into the browser.
     If you use replace, it replaces the current route instead of adding a new one */}
            <Route path="/search/:searchTerm" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
           <Route
          path="*"
          element={<NotFoundPage/>}
        />

       

         </Routes>
       </BrowserRouter>
       
    </>
  )
  
}

export default App