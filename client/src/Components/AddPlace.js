import React,{useEffect, useState} from 'react'
import { NavLink,useHistory} from 'react-router-dom'
import axios from 'axios'
import './Assets/addplace.css'
const AddPlace = () => {
    
    const history = useHistory();
    const [city,setCity] = useState([""]);
    useEffect(()=>{
        const getCity = async () =>{
            const res = await axios.post("/displaycity");
            setCity(res.data);
        }
        getCity();
    },[]);

     const [place, setPlace] = useState({
        CId: "",
        name:"",
        image: "", 
        details: "" , 
        location: "" , 
        latitude: "",
        longitude: ""
    });
    
    let name,value;
    const handleInputs = (e) =>{
        name = e.target.name;
        value = e.target.value;
        setPlace({...place , [name]:value});
    }

    const [selectedFile, setSelectedFile] = useState(null);  
     const handleImage = (event )=> {
        setSelectedFile(event.target.files[0]);
      };
      

    const PostData = async(e) => {
        e.preventDefault();
       
        var  selectElement = document.querySelector('#select1');
        var output = selectElement.value;
        console.log(output);
        
        const{CId ,name,image, details , location, latitude,longitude} = place;
        // var enteredimage=selectedFile.name;
        if(selectedFile){
            
            var enteredimage=selectedFile.name;
        }
        else{
            var enteredimage=null; 
        }
        
        const res = await fetch("/addplace",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                CId: output,name:name, image:enteredimage , details:details , location:location,latitude:latitude, longitude: longitude  })
        });

        const data = await res.json();
        console.log(res.status);
        if(res.status !== 422 || !data){
            window.alert("Invalid Data Input");
            console.log("Invalid Data Input");
        }
        else{
            window.alert("Place Details Added");
            console.log("Place Details Added");

            history.push("/adminpanel");
        }
    }

return(
    <div className="addplace-box">
            <br/><br/><center><h2>Add Place Information</h2></center><br/><br/>
        <div className="container-addplace">
        <section className="addplace">
          <div className="addplace">
                    <form method="POST" enctype="multipart/form-data">
                         <div className="selectcityname">
                         <strong>City : </strong>
                            <select id="select1">
                            <option value="-1">Select City</option>
                            {city.map((localState, index) => (
                                <option value={localState._id}>{localState.name}</option>
                            ))
                            }
                            </select>
                        </div> 
                        <br/>
                        <div className="placeimage">
                        <strong>Image : </strong>&emsp;
                            <div classname="addplace-input">
                            <input type ="file" name="image" id="placeimage" autoComplete="off" placeholder="Insert Place Image"
                                onChange={handleImage}
                                required />
                                </div>
                        </div>
                            <br /><br/>
                        
                        <div className="placename">
                        <strong>Name : </strong>&emsp;
                            <div classname="addplace-input">
                            <input type ="text" name="name" id="placename" autoComplete="off" placeholder="Enter Name Here"
                            value = {place.name} onChange={handleInputs}/>
                            </div>
                        </div>
                        <br /><br/>
                        <div className="placedetail">
                        <strong>Details : </strong>&emsp;
                            <div classname="addplace-input">
                            <input type ="text" name="details" id="placedetail" autoComplete="off" placeholder="Enter Place Details"
                            value = {place.details} onChange={handleInputs}/>
                            </div>
                        </div>
                        <br /><br/>
                        <div className="placelocation">
                        <strong>Location : </strong>&emsp;
                            <div classname="addplace-input">
                            <input type ="text" name="location" id="placelocation" autoComplete="off" placeholder="Enter Place Loction"
                                value = {place.location} onChange={handleInputs}
                            />
                            </div>
                        </div>
                        <br/><br/>

                        <div className="placelatitude">
                        <strong>Location Coordinates(Latitude) : </strong>&emsp;
                            <div classname="addplace-input">
                            <input type="text" name="latitude" id="placelocationCoordinates" autoComplete="off" placeholder="Enter Place Latitude"
                                required value={place.latitude} onChange={handleInputs}
                            /></div>
                        </div>
                        <br/><br/>
                        <div className="placelongitude">
                        <strong>Location Coordinates(Longitude) : </strong>&emsp;
                            <div classname="addplace-input">
                            <input type="text" name="longitude" id="placelocationCoordinates" autoComplete="off" placeholder="Enter Place Longitude"
                                required value={place.longitude} onChange={handleInputs}
                            /></div>
                        </div>
                        <br /><br/><br/>
                        <div className="submit">
                            <input type="submit" name="addplace" id="addplace" value="Add" onClick={PostData}></input>
                        </div>
                    </form>
                    </div>
                    </section>
            </div>
        <div className="addplace-back">
       <center> <NavLink to="/adminpanel" className="addplace-back">Back</NavLink></center>
        </div>
        <br/><br/><br/><br/>
    </div>
)
}
export default AddPlace
