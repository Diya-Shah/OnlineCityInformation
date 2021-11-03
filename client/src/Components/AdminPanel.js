import React from 'react'
import { NavLink} from 'react-router-dom';
import './Assets/card.css';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
const AdminPanel = () => {
return(
    <div className="admin-box"><br/><br/>
<Card className= "card" className= "card" style={{
   width: '20rem',
   height: '20rem',
    marginLeft: '180px',
 }}>
 <img src="/images/city1.jpg" height="200" width="400"></img>
    <CardActions>
    <Button variant="primary"><NavLink to="/AddCity">Add City</NavLink></Button>
    </CardActions>
</Card>
<br />
<br />
<Card className= "card" className= "card" style={{ 
    width: '20rem',
    height: '20rem',
    marginLeft: '600px',
    marginTop: '-370px'
   }}>
 <img src="/images/place1.jpg" height="200" width="400"></img>
    <CardActions>
    <Button variant="primary"><NavLink to="/AddPlace">Add Places</NavLink></Button>
    </CardActions>
</Card>
<br />
<br />
<Card className= "card" style={{ 
    width: '20rem',
    height: '20rem',
    marginLeft: '1000px',
    marginTop: '-370px'
 }}>
  <img src="/images/food1.jpg" height="200" width="400"></img>
    <CardActions>
    <Button variant="primary"><NavLink to="/AddFood">Add Food</NavLink></Button>
    </CardActions>
</Card>
<br />
<br />
<Card className= "card" style={{ 
    width: '20rem',
    height: '20rem',
    marginLeft: '170px',
    marginTop: '30px'
 }}>
  <img src="/images/city2.jpg"  height="200" width="400"></img>
    <CardActions>
    <Button variant="primary"><NavLink to="/ManageCities">Edit City Details</NavLink></Button>
    </CardActions>
</Card>
<br />
<br />
<Card className= "card" style={{ 
    width: '20rem',
    height: '20rem',
    marginLeft: '600px',
    marginTop: '-370px'
 }}>
 <img src="/images/place2.jpg"  height="200" width="400"></img>
    <CardActions>
    <Button variant="primary"><NavLink to="/ManagePlaces">Edit Place Details</NavLink></Button>
    </CardActions>
</Card>
<br />
<br />
<Card className= "card" style={{ 
    width: '20rem',
    height: '20rem',
    marginLeft: '1000px',
    marginTop: '-370px'
 }}>
  <img src="/images/food2.jpg" height="200" width="400"></img>
    <CardActions>
    <Button variant="primary"><NavLink to="/ManageFood">Edit Food Details</NavLink></Button>
    </CardActions>
</Card><br/><br/><br/>
    </div>
)
}
export default AdminPanel