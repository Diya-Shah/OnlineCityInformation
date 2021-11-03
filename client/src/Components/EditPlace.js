import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from "react-router-dom";
import './Assets/editplace.css'


const EditPlace = () => {

	const query = new URLSearchParams(useLocation().search);
	const id = query.get("id");

	const history = useHistory();
	const [cities, setCities] = useState([""]);
	useEffect(() => {
		const getCities = async () => {
			const res = await axios.post("/displaycity");
			setCities(res.data);
		}
		getCities();
	}, []);

	const [place, setPlace] = useState([""]);
	useEffect(() => {
		const getPlace = async () => {
			const res = await axios.post("/viewplace", {
				id: id
			});
			setPlace(res.data);
		}
		getPlace();
	}, []);

	let name, value;
	const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;
		setPlace({ ...place, [name]: value });
	}
	const [selectedFile, setSelectedFile] = useState();
	const handleImage = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const UpdatePlace = async (e) => {
		e.preventDefault();

		var selectElement = document.querySelector('#select1');
		var output = selectElement.value;
		if (output != "-1") {
			console.log(output);

			const { CId, name, image, details, location, latitude, longitude } = place;
			var newimage = place.image;
			if (selectedFile)
				newimage = selectedFile.name;

			const res = await fetch("/editplace", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: id, CId: output, name: name, image: newimage, details: details, location: location, latitude: latitude, longitude: longitude
				})
			});

			const data = await res.json();
			console.log(res.status);
			if (res.status !== 422 || !data) {
				window.alert("Invalid Data Input");
				console.log("Invalid Data Input");
			}
			else {
				window.alert("Place Details Updated");
				console.log("Place Details Updated");

				history.push("/manageplaces");
			}
		}
		else{
			window.alert("Please Select a City");
		}
	}


	const [cid, setCId] = useState(place?.CId);
	useEffect(() => {
        setCId(place?.CId);
    }, [place?.CId]);

	return (
		<div className="updateplace-box">
        <br/><br/><center><h2>Edit Place Information</h2></center><br/><br/>
        <div className="container-updateplace">
			<section className="updateplace">
				<div className="updateplace">
					<form method="POST" enctype="multipart/form-data">
						<div className="selectcityname">
						<strong>City : </strong>
							<select id="select1" value={cid}
								onChange={e => { if(e.target.selectedIndex != 0) {setCId(cities[e.target.selectedIndex - 1]._id)}}}>
									<option value="-1">Select City</option>
								{cities.map((localState, index) => (
									<option value={localState._id}>{localState.name}</option>
								))
								}
							</select>
						</div>
						<br />
						<div className="placeimage">
						<strong>Image : </strong>&emsp;
                            <div classname="updateplace-input">
							<input type="file" name="image" id="placeimage" autoComplete="off" placeholder="Insert Place Image"
								onChange={handleImage}
							/></div>
						</div>
						<br /><br/>
						<div className="placename">
						<strong>Name : </strong>&emsp;
                            <div classname="updateplace-input">
							<input type="text" name="name" id="placename" autoComplete="off" placeholder="Enter Name Here"
								value={place.name} onChange={handleInputs} />
								</div>
						</div>
						<br /><br/>
						<div className="placedetail">
						<strong>Details : </strong>&emsp;
                            <div classname="updateplace-input">
							<input type="text" name="details" id="placedetail" autoComplete="off" placeholder="Enter Place Details"
								value={place.details} onChange={handleInputs} /></div>
						</div>
						<br /><br/>
						<div className="placelocation">
						<strong>Location : </strong>&emsp;
                            <div classname="updateplace-input">
							<input type="text" name="location" id="placelocation" autoComplete="off" placeholder="Enter Place Loction"
								value={place.location} onChange={handleInputs}
							/></div>
						</div>
						<br/><br/>

						<div className="placelatitude">
						<strong>Location Coordinates(Latitude) : </strong>&emsp;
                            <div classname="updateplace-input">
							<input type="text" name="latitude" id="placelocationCoordinates" autoComplete="off" placeholder="Enter Place Latitude"
								required value={place.latitude} onChange={handleInputs}
							/></div>
						</div>
						<br/><br/>
						<div className="placelongitude">							
						<strong>Location Coordinates(Longitude) : </strong>&emsp;
                            <div classname="updateplace-input">
							<input type="text" name="longitude" id="placelocationCoordinates" autoComplete="off" placeholder="Enter Place Longitude"
								required value={place.longitude} onChange={handleInputs}
							/></div>
						</div>
						<br /><br/><br/>
						<div className="submit">
							<input type="submit" name="addplace" id="addplace" value="Update" onClick={UpdatePlace}></input>
						</div>
					</form>
				</div>
			</section>
			</div>
        <div className="editplace-back">
       <center> <NavLink to="/manageplaces" className="editplace-back">Back</NavLink></center>
        </div>
		</div>
	)
}

export default EditPlace