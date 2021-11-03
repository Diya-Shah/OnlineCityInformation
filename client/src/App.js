import React from 'react'
import "./App.css"
import { Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Signin from './Components/Signin'
import Signup from './Components/Signup'
import AdminPanel from './Components/AdminPanel'
import AddCity from './Components/AddCity'
import AddPlace from './Components/AddPlace'
import AddFood from './Components/AddFood'
import UserHome from './Components/UserHome'
import EditPlace from './Components/EditPlace'
import EditCity from './Components/EditCity'
import EditFood from './Components/EditFood'
import ManageCities from './Components/ManageCities'
import ManagePlaces from './Components/ManagePlaces'
import ManageFood from './Components/ManageFood'
import CityDetails from './Components/CityDetails'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import Cookie from './Components/Cookie'
import Terms from './Components/Terms'

const App = () => {
  return(
    <div>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/signin">
        <Signin />
      </Route>

      <Route path="/adminpanel">
        <AdminPanel />
      </Route>

      <Route path="/addcity">
        <AddCity />
      </Route>

      <Route path="/addplace">
        <AddPlace />
      </Route>

      <Route path="/addfood">
        <AddFood />
      </Route>

      <Route exact path="/userhome">
        <UserHome />
      </Route>

      <Route exact path="/editcity">
        <EditCity />
      </Route>

      <Route exact path="/editplace">
        <EditPlace />
      </Route>

      <Route exact path="/editfood">
        <EditFood />
      </Route>

      <Route exact path="/managecities">
        <ManageCities />
      </Route>

      <Route exact path="/manageplaces">
        <ManagePlaces />
      </Route>

      <Route exact path="/managefood">
        <ManageFood />
      </Route>
      
      <Route exact path="/citydetails">
        <CityDetails />
      </Route>

      <Route exact path="/contact">
        <Contact />
      </Route>

      <Route exact path="/cookie">
        <Cookie />
      </Route>

      <Route exact path="/terms">
        <Terms />
      </Route>

      <Footer/>
      
    </div>
  )
}

export default App