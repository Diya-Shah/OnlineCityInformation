import React, { useEffect, useState } from 'react'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { Dropdown, DropdownButton } from 'react'
import './Assets/managefood.css'

const ManageFood = () => {

    const history = useHistory();

    const [cities, setCities] = useState([""]);
    useEffect(() => {
        const getCities = async () => {
            const res = await axios.post("/displaycity");
            setCities(res.data);
        }
        getCities();
    }, []);

    let cid = 6;
    const [places, setPlaces] = useState([""]);
    const getPlaces = async () => {
        const res = await axios.post("/viewplaces", {
            cid: cid
        });
        setPlaces(res.data);
    }

    let pid = -1;
    const [food, setFood] = useState([""]);
    const getFood = async () => {
        const res = await axios.post("/viewfood", {
            pid: pid
        });
        setFood(res.data);
    }

    const changePlaces = (e) => {
        cid = cities[e.target.selectedIndex]._id;
        getPlaces();
    }
    const [cityid, setCityId] = useState(6);

    const editFood = (id) => {
        var link = "/editFood?id="+id;
        history.push(link);
    }

    const deleteFood  = async (id) =>  {
        if (window.confirm("Are you sure you want to delete?")) {
            const res = await fetch("/deletefood", {
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
                window.alert("Food Deleted");
                console.log("Food Deleted");
                history.go(0);
            }
        }
    }

    function handleCityChange(event) {
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


    function handlePlaceChange(event) {
        let pid = event.target.value;
        if (pid != "-1") {
            const getFood = async () => {
                const res = await axios.post("/viewfood", {
                    pid: pid
                });
                setFood(res.data);
            }
            getFood();
        }
    }

    if (food) {
        var FoodData = food.map((val, i) => (
            <tr key={i}>
                <td key={val._id} className="clm1">{i + 1}</td>
                <td className="clm2">{val.name}</td>
                <td className="clm3">{val.details}</td>
                <td className="clm4"><button className="btn btn-primary" onClick={()=>editFood(val._id,val)} >Edit</button>&ensp;
                    <button className="btn btn-danger" onClick={()=>deleteFood(val._id,val)} >Delete</button></td>
            </tr>
        ))

    } else {
        FoodData = <tr>
            <td colSpan="4">No Records Found</td>
        </tr>
    }

    return (
        <div className="container-managefood">
              <br/><br/><center><h1>All Food-Items</h1></center>
            <br/><br/><center>
        
            <div>
            <strong id="food-city-strong">Cities : </strong>
                <select id="select4" onChange={handleCityChange} >
                <option value="-1">Select City</option>
                    {cities.map((localState, index) => (
                        <option value={localState._id}>{localState.name}</option>
                    ))
                    }
                </select>
            </div>
            <br/>
            <div>
            <strong id="food-place-strong">Places : </strong>
                <select id="select5" onChange={handlePlaceChange} >
                <option value="-1">Select Place</option>
                    {places.map((localState, index) => (
                        <option value={localState._id}>{localState.name}</option>
                    ))
                    }
                </select>
            </div>
           <br/><br/>
            <div>
                <table bordered className="table-food">
                    <thead>
                        <tr>
                            <th className="clm1">#</th>
                            <th className="clm2">Food Name</th>
                            <th className="clm3">Food Details</th>
                            <th className="clm4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FoodData}
                    </tbody>
                </table>
            </div>
            <section className="back4">
               <center> <NavLink to="/adminpanel" className="back4">Back</NavLink></center>
                <br />
            </section>
            </center>
        </div>
    );
}

export default ManageFood