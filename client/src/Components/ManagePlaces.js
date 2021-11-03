import React, { useEffect, useState } from 'react'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { Dropdown, DropdownButton } from 'react'
import './Assets/manageplace.css'

const ManagePlaces = () => {
    const history = useHistory();

    const [cities, setCities] = useState([""]);
    useEffect(() => {
        const getCities = async () => {
            const res = await axios.post("/displaycity");
            setCities(res.data);
        }
        getCities();
    }, []);

    const [places, setPlaces] = useState([""]);
    function handleChange(event) {
        let cid = event.target.value;
        if (cid != "-1") {
            const getPlaces = async () => {
                const res = await axios.post("/viewplaces", {
                    cid: cid
                });
                setPlaces(res.data);
            }
            getPlaces();
        }
    }

    const editPlace = (id) => {
        var link = "/editPlace?id="+id;
        history.push(link);
    }

    const deletePlace  = async (id) =>  {
        if (window.confirm("Are you sure you want to delete?")) {
            const res = await fetch("/deleteplace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            });

            const data = await res.json();
            console.log(res.status);
            if (res.status !== 422 || !data) {
                window.alert("Invalid Data Input");
                console.log("Invalid Data Input");
            }
            else {
                window.alert("Place Deleted");
                console.log("Place Deleted");
                history.go(0);
            }
        }
    }

    if (places) {
        var PlacesData = places.map((val, i) => (
            <tr key={i}>
                <td key={val._id} className="clm1">{i + 1}</td>
                <td className="clm2">{val.name}</td>
                <td className="clm3">{val.details}</td>
                <td className="clm4">{val.location}</td>
                <td className="clm5"><button className="btn btn-primary" onClick={()=>editPlace(val._id,val)} >Edit</button>&ensp;
                    <button className="btn btn-danger" onClick={()=>deletePlace(val._id,val)} >Delete</button></td>
            </tr>
        ))

    } else {
        PlacesData = <tr>
            <td colSpan="4">No Records Found</td>
        </tr>
    }

    return (
        <div className="container-manageplace">
             <br/><br/><center><h1>All Places</h1></center>
            <br/><br/><center>
            <div>
            <strong id="city-strong">Cities : </strong>
                <select id="select3" onChange={handleChange} >
                <option value="-1">Select City</option>
                    {cities.map((localState, index) => (
                        <option value={localState._id}>{localState.name}</option>
                    ))
                    }
                </select>
            </div>
        <br/><br/>
            <div>
                <table bordered className="table-place">
                    <thead>
                        <tr>
                            <th className="clm1">#</th>
                            <th className="clm2">Place Name</th>
                            <th className="clm3">Place Details</th>
                            <th className="clm4">Place Location</th>
                            <th className="clm5">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PlacesData}
                    </tbody>
                </table>
            </div>
            <section className="back3">
               <center> <NavLink to="/adminpanel" className="back3">Back</NavLink></center>
                <br />
            </section>
            </center>
        </div>
    )
}

export default ManagePlaces