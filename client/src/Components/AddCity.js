import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import "./Assets/addcity.css"

const AddCity = () => {
    const history = useHistory();
    const [city, setCity] = useState({
        image: "",
        name: "",
        details: "",
        location: "",
        latitude:"",
        longitude:""
    });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setCity({ ...city, [name]: value });
    }
    const [selectedFile, setSelectedFile] = useState(null);
    const handleImage = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const PostData = async (e) => {
        e.preventDefault();

        const { image, name, details, location ,latitude,longitude} = city;
        if(selectedFile){
            
            var enteredimage=selectedFile.name;
        }
        else{
            var enteredimage=" "; 
        }
        // var enteredimage = selectedFile.name;
        const res = await fetch("/addcity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                image: enteredimage, name: name, details: details, location: location, latitude:latitude, longitude:longitude
            })
        });

        const data = await res.json();
        if (res.status !== 422 || !data) {
            window.alert("Invalid Data Input");
            console.log("Invalid Data Input");
        }
        else {
            window.alert("City Details Added");
            console.log("City Details Added");

            history.push("/adminpanel");
        }
    }


    return (
        <div className="addcity-box">
            <br/><br/><center><h2>Add City Information</h2></center><br/><br/>
            <div className="container-addcity">
            <section className="addcity">
                <div className="addcity">
                    <form method="POST">
                        <div className="cityimage">
                            <strong>Image : </strong>&emsp;
                            <div classname="addcity-input">
                            <input type="file" name="image" id="cityimage" autoComplete="off" placeholder="Insert City Image"
                                required onChange={handleImage}
                            />
                            </div>
                        </div>
                        <br /><br/>
                        <div className="cityname">
                        <strong>Name : </strong>&emsp;
                        <div classname="addcity-input">
                            <input type="text" name="name" id="cityname" autoComplete="off" placeholder="Enter City Name"
                                required value={city.name} onChange={handleInputs}
                            />
                            </div>
                        </div>
                        <br /><br/>
                        <div className="citydetail">
                        <strong>Details : </strong>&emsp;
                        <div classname="addcity-input">
                            <input type="text" name="details" id="citydetail" autoComplete="off" placeholder="Enter City Details"
                                required value={city.details} onChange={handleInputs} />
                        </div>
                        </div>
                        <br /><br/>
                        <div className="citylocation">
                        <strong>Location : </strong>&emsp;
                        <div classname="addcity-input">
                            <input type="text" name="location" id="citylocation" autoComplete="off" placeholder="Enter City Loction"
                                required value={city.location} onChange={handleInputs}
                            />
                            </div>
                        </div>
                        <br /><br/>
                        <div className="citylatitude">
                        <strong>Location Coordinates(Latitude) : </strong>&emsp;
                        <div classname="addcity-input">
                            <input type="text" name="latitude" id="citylocationcoordinates" autoComplete="off" placeholder="Enter City Latitude"
                                required value={city.latitude} onChange={handleInputs}
                            /></div>
                        </div>
                        <br/><br/>
                        <div className="citylongitude">
                        <strong>Location Coordinates(Longitude) : </strong>&emsp;
                        <div classname="addcity-input">
                            <input type="text" name="longitude" id="citylocationcoordinates" autoComplete="off" placeholder="Enter City Longitude"
                                required value={city.longitude} onChange={handleInputs}
                            /></div>
                        </div>
                        <br /><br/><br/>
                        <div className="submit">
                            <input type="submit" name="addcity" id="addcity" value="Add" onClick={PostData}></input>
                        </div>
                    </form>
                </div>
            </section>
            </div>
        <div className="back">
                <center><NavLink to="/adminpanel" className="back">Back</NavLink></center>
            </div>
            <br /><br/>
        </div>
    )
}
export default AddCity