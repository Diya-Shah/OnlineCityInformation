import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
import './Assets/addfood.css'
const AddFood = () => {

    const history = useHistory();
    const [city, setCity] = useState([""]);

    let cid;
    const [place, setPlace] = useState([""]);
    const getPlace = async () => {
        const res = await axios.post("/viewplaces", {
            cid: cid
        });
        setPlace(res.data);
    }

    useEffect(() => {
        const getCity = async () => {
            const res = await axios.post("/displaycity");
            setCity(res.data);
        }
        getCity();
    }, []);

    const [food, setFood] = useState({
        CId: "",
        PId: "",
        name: "",
        image: "",
        details: "",
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setFood({ ...food, [name]: value });
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const handleImage = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    const PostData = async (e) => {
        e.preventDefault();
        var selectElement = document.querySelector('#selectcity');
        console.log("here");
        console.log(selectElement.value);
        var cityid = selectElement.value;

        var selectElement1 = document.querySelector('#selectplace');
        var placeid = selectElement1.value;

        if (cityid != "-1" && placeid != "-1") {

            const { CId, PId, name, image, details } = food;
            if (selectedFile) {

                var enteredimage = selectedFile.name;
            }
            else {
                var enteredimage = " ";
            }

            const res = await fetch("/addfood", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    CId: cityid, PId: placeid, name: name, image: enteredimage, details: details
                })
            });

            const data = await res.json();
            console.log(res.status);
            if (res.status !== 422 || !data) {
                window.alert("Invalid Data Input");
                console.log("Invalid Data Input");
            }
            else {
                window.alert("Food Details Added");
                console.log("Food Details Added");

                history.push("/adminpanel");
            }
        }
    }
    const [cityid, setCityId] = useState(-1);

    const changePlaces = (e) => {
        cid = city[e.target.selectedIndex - 1]._id;
        getPlace();
    }

    return (
        <div className="addfood-box">
            <br /><br /><center><h2>Add Food Information</h2></center><br /><br />
            <div className="container-addfood">
                <section className="addfood">
                    <div className="addfood">
                        <form method="POST" enctype="multipart/form-data">
                            <div className="selectcityname">
                                <strong>City : </strong>&emsp;
                                <select id="selectcity" value={cityid}
                                    onChange={e => { setCityId(city[e.target.selectedIndex - 1]._id); changePlaces(e); }} >
                                    <option value="-1"> Select City </option>
                                    {city.map((localState, index) => (
                                        <option value={localState._id} selected>{localState.name}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <br />
                            <div className="selectplacename">
                                <strong>Place : </strong>&emsp;
                                <select id="selectplace">
                                    <option value="-1"> Select Place </option>
                                    {place.map((localState, index) => (
                                        <option value={localState._id}>{localState.name}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <br />
                            <div className="foodimage">
                                <strong>Image : </strong>&emsp;
                                <div classname="addplace-input">
                                    <input type="file" name="image" id="foodimage" autoComplete="off" placeholder="Insert Food Image"
                                        onChange={handleImage}
                                    />
                                </div>
                            </div>
                            <br /><br />
                            <div className="foodname">
                                <strong>Name : </strong>&emsp;
                                <div classname="addplace-input">
                                    <input type="text" name="name" id="foodname" autoComplete="off" placeholder="Enter food name"
                                        value={food.name} onChange={handleInputs}
                                    />
                                </div>
                            </div>
                            <br /><br />
                            <div className="fooddetail">
                                <strong>Details : </strong>&emsp;
                                <div classname="addplace-input">
                                    <input type="text" name="details" id="fooddetail" autoComplete="off" placeholder="Enter food Details"
                                        value={food.details} onChange={handleInputs} />
                                </div>
                            </div>
                            <br /><br /><br />
                            <div className="submit">
                                <input type="submit" name="addfood" id="addfood" value="Add" onClick={PostData}></input>
                            </div>
                        </form>
                    </div>
                </section></div>
            <br />
            <section className="back1">
                <center> <NavLink to="/adminpanel" className="back1">Back</NavLink></center>
                <br />
            </section>
            <br /><br />
        </div>
    )
}
export default AddFood