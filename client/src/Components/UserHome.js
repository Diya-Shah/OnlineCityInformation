import React,{useEffect,useState} from 'react'
import axios from 'axios'
import './Assets/userhome.css';

const UserHome = () => {
  
    const [city,setCity] = useState([""]);
    useEffect(()=>{
        const getCity = async () =>{
            const res = await axios.post("/displaycity");
            setCity(res.data);
        }
        getCity();
    },[]);
    return(
        <div className="box"><br/><br/>
         <div className="grid"> 
            {city.map((localState, index) => (
        <div className="griditem"> 
            <div className="Card">
            <img className="card-img" src={'/images/' + localState.image } ></img>
            <div className="card-content">
                <div className="card-header">{localState.name}</div>
                <div className="card-text">{localState.details}</div>
            </div><br/>
                <button className="card-btn">
                <a href={'./citydetails?id='+localState._id}>VISIT &rarr;</a>
                </button>
                <br/>
            
            </div>
            </div>    
            ))
        }
        </div>
        <br/><br/><br/>
        </div>
    )
}
export default UserHome