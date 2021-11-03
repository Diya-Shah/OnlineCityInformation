import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from "react-router-dom";
import './Assets/editfood.css'

const EditFood = () => {

	const query = new URLSearchParams(useLocation().search);
	const id = query.get("id");

	const [food, setFood] = useState([""]);
	useEffect(() => {
		const getFood = async () => {
			const res = await axios.post("/viewsinglefood", {
				id: id
			});
			setFood(res.data);
		}
		getFood();
		setCityId(food.CId);
	}, []);

	const history = useHistory();
    const [city, setCity] = useState([""]);

	let cid = food.CId;
    const [place, setPlace] = useState([""]);
    const getPlace = async () => {
        const res = await axios.post("/viewplaces", {
            cid: cid
        });
        setPlace(res.data);
        console.log("Here place=");
        console.log(place);
        setPlaceId(food.PId);
        console.log("Here placeid=");
        console.log(placeid);
    }

    useEffect(() => {
        const getCity = async () => {
            const res = await axios.post("/displaycity");
            setCity(res.data);
        }
        getCity();
    }, []);
	
	let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setFood({ ...food, [name]: value });
    }

    const [selectedFile, setSelectedFile] = useState();
    const handleImage = (event) => {
        setSelectedFile(event.target.files[0]);
    };

	const UpdateFood = async (e) => {
        e.preventDefault();
        if (placeid != "-1") {
            const { CId, PId, name, image, details } = food;
            var newimage = place.image;
            if (selectedFile)
                newimage = selectedFile.name;
            const res = await fetch("/editfood", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id, CId: cityid, PId: placeid, name: name, image: newimage, details: details
                })
            });

            const data = await res.json();
            console.log(res.status);
            if (res.status !== 422 || !data) {
                window.alert("Invalid Data Input");
                console.log("Invalid Data Input");
            }
            else {
                window.alert("Food Details Edited");
                console.log("Food Details Edited");

                history.push("/managefood");
            }
        }
        else{
            window.alert("Please Select a Place");
        }
    }

	const [cityid, setCityId] = useState(food?.CId);

	useEffect(() => {
        setCityId(food?.CId);
		cid = food.CId;
        console.log("inside useeffect");
        console.log(cid);
		getPlace();
    }, [food?.CId]);
    cid = food.CId;


	const [placeid, setPlaceId] = useState(food.PId);

    const changePlaces = (e) => {
        // if(e.target.selectedIndex)
        setCityId(city[e.target.selectedIndex]._id);
        console.log("Inside changePlaces");
        console.log(e.target.selectedIndex);
        cid = city[e.target.selectedIndex]._id;
        getPlace();
    }

	return (
		<div className="updatefood-box">
             <br/><br/><center><h2>Edit Food Information</h2></center><br/><br/>
        <div className="container-updatefood">
			<section className="addfood">
                <div className="addfood">
                    <form method="POST" enctype="multipart/form-data">
                        <div className="selectcityname">
                            <strong>City : </strong>&emsp;
                            <select id="select1" value={cityid} onLoad={getPlace}
                                onChange={e =>  {setCityId(city[e.target.selectedIndex]._id);changePlaces(e); } } >
                                {city.map((localState, index) => (
                                    <option value={localState._id} selected>{localState.name}</option>
                                ))
                                }
                            </select>
                        </div>
                        <br />

                        <div className="selectplacename">
                        <strong>Place : </strong>&emsp;
                            <select id="select2" value={placeid}
							 onChange={e => {if(e.target.selectedIndex != 0) {setPlaceId(place[e.target.selectedIndex - 1]._id)}} }>
                                {/* <option value="-1">Select Place</option> */}
                                {place.map((localState, index) => (
                                    <option value={localState._id}>{localState.name}</option>
                                ))
                                }
                            </select>
                        </div>
                        <br />
                        <div className="foodimage">
                        <strong>Image : </strong>&emsp;
                            <div classname="updateplace-input">
                            <input type="file" name="image" id="foodimage" autoComplete="off" placeholder="Insert Food Image"
                                onChange={handleImage}
                            /></div>
                        </div>
                        <br /><br/>
                        <div className="foodname">
                        <strong>Name : </strong>&emsp;
                            <div classname="updateplace-input">
                            <input type="text" name="name" id="foodname" autoComplete="off" placeholder="Enter food name"
                                value={food.name} onChange={handleInputs}
                            /></div>
                        </div>
                        <br /><br/>
                        <div className="fooddetail">
                        <strong>Details : </strong>&emsp;
                            <div classname="updateplace-input">
                            <input type="text" name="details" id="fooddetail" autoComplete="off" placeholder="Enter food Details"
                                value={food.details} onChange={handleInputs} /></div>
                        </div>
                        <br /><br/><br/>
                        <div className="submit">
                            <input type="submit" name="addfood" id="addfood" value="Update" onClick={UpdateFood}></input>
                        </div>
                    </form>
                </div>
            </section>
            </div>
            <br/>
            <section className="back1">
               <center> <NavLink to="/managefood" className="back1">Back</NavLink></center>
                <br />
            </section>
            <br/><br/>
		</div>
	)
}

export default EditFood