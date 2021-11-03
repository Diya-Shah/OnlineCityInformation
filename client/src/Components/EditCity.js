import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from "react-router-dom";
import './Assets/editcity.css'
const EditCity = () => {
    const history = useHistory();

    const query = new URLSearchParams(useLocation().search);
    const id = query.get("id");

    const [city, setCity] = useState([""]);
    useEffect(() => {
        const getCity = async () => {
            const res = await axios.post("/viewcity", {
                id: id
            });
            setCity(res.data);
        }
        getCity();
    }, []);

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setCity({ ...city, [name]: value });
    }
    const [selectedFile, setSelectedFile] = useState();
    const handleImage = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const UpdateCity = async (e) => {
        e.preventDefault();

        const { image, name, details, location,latitude,longitude } = city;
        var newimage = city.image;
        if (selectedFile)
            newimage = selectedFile.name;

        const res = await fetch("/editcity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id ,image: newimage, name: name, details: details, location: location,latitude:latitude,longitude:longitude
            })
        });

        
        const data = await res.json();
        if (res.status !== 422 || !data) {
            window.alert("Invalid Data Input");
            console.log("Invalid Data Input");
        }
        else {
            window.alert("City Details Updated");
            console.log("City Details Updated");

            history.push("/managecities");
        }
    }

    return (
        <div className="updatecity-box">
        <br/><br/><center> <h2>Update City Information</h2></center><br/><br/>
        <div className="container-updatecity">
            <section className="updatecity">
                <div className="updatecity">
                    <form method="POST">
                    <div className="cityimage">
                        <strong>Image : </strong>&emsp;
                            <div classname="updatecity-input">
                            <input type="file" name="image" id="cityimage" autoComplete="off" placeholder="Insert City Image"
                                onChange={handleImage}
                            />
                            </div>
                        </div>
                        <br/><br/>
                        <div className="cityname">
                        <strong>Name : </strong>&emsp;
                            <div classname="updatecity-input">
                            <input type="text" name="name" id="cityname" autoComplete="off" placeholder="Enter City Name"
                                value={city.name} onChange={handleInputs}
                            />
                            </div>
                        </div>
                        <br /><br/>
                        <div className="citydetail">
                        <strong>Details : </strong>&emsp;
                            <div classname="updatecity-input">
                            <input type="text" name="details" id="citydetail" autoComplete="off" placeholder="Enter City Details"
                                value={city.details} onChange={handleInputs} />
                                </div>
                        </div>
                        <br /><br/>
                        <div className="citylocation">
                        <strong>Location : </strong>&emsp;
                            <div classname="updatecity-input">
                            <input type="text" name="location" id="citylocation" autoComplete="off" placeholder="Enter City Loction"
                                value={city.location} onChange={handleInputs}
                            /></div>
                        </div>
                        <br /><br/>
                        <div className="citylatitude">
                        <strong>Location Coordinates(Latitude) : </strong>&emsp;
                            <div classname="updatecity-input">
                            <input type="text" name="latitude" id="citylocationcoordinates" autoComplete="off" placeholder="Enter City Latitude "
                                required value={city.latitude} onChange={handleInputs}
                            /></div>
                        </div>
                        <br/><br/>
                        <div className="citylongitude">
                        <strong>Location Coordinates(Longitude) : </strong>&emsp;
                            <div classname="updatecity-input">
                            <input type="text" name="longitude" id="citylocationcoordinates" autoComplete="off" placeholder="Enter City Longitude "
                                required value={city.longitude} onChange={handleInputs}
                            /></div>
                        </div>
                        <br /><br/><br/>
                        <div className="submit">
                            <input type="submit" name="updatecity" id="updatecity" value="Update" onClick={UpdateCity}></input>
                        </div>
                    </form>
                </div>
            </section>
            </div>
            <div className="back">
                <center><NavLink to="/managecities" className="back">Back</NavLink></center>
            </div>
            <br /><br/>
        </div>
    )
}

export default EditCity