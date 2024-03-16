import { Route, Routes } from "react-router-dom"
import { Cards } from "../components/Cards/Cards"
import { NavBar } from "../components/NavBar/NavBar"
import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { Posts } from "../components/Posts/Posts"
import { ProfilePage } from "../components/profile/ProfilePage"
import { Favs } from "../components/favs/Favs"
import { Details } from "../components/Details/Details"



export const ApplicationViews = () => {

  const [currentUser, setCurrentUser] = useState({})

  useEffect( () => {
    const getData  = async () => {
      const localLearningUser = await localStorage.getItem("learning_user")
      const learningUserObject = await  JSON.parse(localLearningUser)
      setCurrentUser(learningUserObject)
    }
    getData();
  }, [])

  return (
    <Routes>

      <Route path="/" element={
              <>
              <NavBar/>
              <Outlet/>
              </>
            } >
        
        <Route path="/">
          <Route index element={<Cards currentUser={currentUser}/>} />
        </Route>

        <Route path="posts">
          <Route index element={<Posts currentUser={currentUser}/>} />
        </Route>
      </Route>

      <Route path="profile">
        <Route index element={<ProfilePage currentUser={currentUser}/>} />
        <Route path=":postId" element={<Details currentUser={currentUser}/>} />
      </Route>

      <Route path="favorites">
        <Route index element={<Favs currentUser={currentUser}/>} />
      </Route>

  

    </Routes>
  )

}