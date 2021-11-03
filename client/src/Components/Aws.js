import { createMap, drawPoints} from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState, useEffect } from 'react';
import './Assets/map.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { NavLink} from 'react-router-dom'

function Aws() {

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

    const [place, setPlace] = useState([""]);
    useEffect(() => {
        const getPlace = async () => {
            const res = await axios.post("/viewplaces", {
                cid: id
            });
            setPlace(res.data);
        }
        getPlace();
    }, []);

    const [food, setFood] = useState([""]);
    useEffect(() => {
        const getFood = async () => {
            const res = await axios.post("/viewfoodcity", {
                cid: id
            });
            setFood(res.data);
        }
        getFood();
    }, []);

    const [mapcheck, setMapCheck] = useState(city?.locationCoordinates);
    useEffect(async () => {
        setMapCheck(city?.locationCoordinates);
        if (city.name != undefined && place != undefined){
            const map = await initializeMap();
            addRestaurantLocations(map);
            return function cleanup() {
                map.remove();
            };
        }
    }, [city?.locationCoordinates, place[0]?.name]);

    function addRestaurantLocations(map) {
        var points = [];
        var temparray = [];
        temparray.push(parseFloat(city.longitude));
        temparray.push(parseFloat(city.latitude));
        points.push({
            coordinates: temparray,
                title: city.name,
                address: city.location
        });
        place.forEach(element => {
            var temparray = [];
            temparray.push(parseFloat(element.longitude));
            temparray.push(parseFloat(element.latitude));
            points.push({
                coordinates: temparray,
                    title: element.name,
                    address: element.location
            });
        });
        map.on("load", function () {
            drawPoints("mySourceName",
                points,
                map,
                {
                    showCluster: true,
                    unclusteredOptions: {
                        showMarkerPopup: true,
                    },
                    clusterOptions: {
                        showCount: true,
                    },
                }
            );
        });
    }

    async function initializeMap() {
        const map = await createMap({
            container: "map",
            center: [city.longitude, city.latitude],
            zoom: 8,
        })
        return map;
    }

    return (
        <div className="Aws">
            <div id="map"></div><br/>

            <div className="content">
            <br/><center><h2>Places To Visit</h2></center><br/>
            <div id="places">
                <div className="awsgrid">
                    {place.map((localState, index) => (
                        <div className="awsgriditem">
                            <img className="awscard-img" src={'/images/' + localState.image} ></img>
                            <div className="awscard">   
                                <div className="awscard-content">
                                    <div className="awscard-header">{localState.name}</div>
                                    <div className="awscard-text">{localState.details}</div><br/><br/>
                                    <div className="awscard-text">Location:<br/>{localState.location}</div>
                                </div>
                                
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div><br/>
            <center><h2>Famous Foods</h2></center><br/>
            <div id="food">
                <div className="awsgrid">
                    {food.map((localState, index) => (
                        <div className="awsgriditem">
                            <img className="awscard-img" src={'/images/' + localState.image} ></img>
                            <div className="awscard">
                                <div className="awscard-content">
                                    <div className="awscard-header">{localState.name}</div>
                                    <div className="awscard-text">{localState.details}</div>
                                </div>
                                <br />

                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            <br/>
            <NavLink to="/userhome" className="NavLink">Back</NavLink>
          <br/><br/>
        </div>
      
        </div>

    );
}

export default Aws
