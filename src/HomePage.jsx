

import React from 'react'
import Navbar from './Navbar'
import Stories from './Stories'
import Posts from './Posts'

function HomePage() {
  return (
    <div>
      {/* <LoginPage/> */}
      <Navbar/>
      <Stories/>
      <Posts/>
    </div>
  )
}

export default HomePage