import React,{useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './Assets/signup.css'

const Signup = () => {
    let gender = ["male","female"];
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", 
        email: "" , 
        password: "" , 
        cpassword: "" ,
        gender: "", 
        number: "",
    });
    let name,value;
    const handleInputs = (e) =>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user , [name]:value});
    }

    const PostData = async(e) => {
        e.preventDefault();

        const{name , email , password , cpassword , gender , number} = user;

        const res = await fetch("/signup",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name:name , email:email , password:password , cpassword:cpassword , gender:gender, contactNumber:number
            })
        });

        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }
        else{
            window.alert("Registration Successful");
            console.log("Registration Successfull");

            history.push("/signin");
        }
    }

  return(
    <div class="signup-form">
      <section className="signup">
          <div className="container-signup">
                    <h2>SignUp</h2>
                    <br />
                    <form method="POST">

                        <div className="form-group">
                            <label htmlFor="name">
                                <i class="zmdi zmdi-account material-icons-name"></i>
                            </label>
                            &nbsp;&nbsp;&nbsp;
                            <input type ="text" name="name" id="name" autoComplete="off" placeholder="your name"
                                value = {user.name} onChange={handleInputs}
                            />
                        </div>
                            <br />
                        <div className="form-group">
                            <label htmlFor="email">
                                <i class="zmdi zmdi-email material-icons-name"></i>
                            </label>
                            &nbsp;&nbsp;&nbsp;
                            <input type ="email" name="email" id="email" autoComplete="off" placeholder="your email"
                            value = {user.email} onChange={handleInputs}/>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="password">
                                <i class="zmdi zmdi-lock material-icons-name"></i>
                            </label>
                            &nbsp;&nbsp;&nbsp;
                            <input type ="password" name="password" id="password" autoComplete="off" placeholder="your password"
                                value = {user.password} onChange={handleInputs}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="cpassword">
                                <i class="zmdi zmdi-lock material-icons-name"></i>
                            </label>
                            &nbsp;&nbsp;&nbsp;
                            <input type ="password" name="cpassword" id="cpassword" autoComplete="off" placeholder="your confirm password"
                                value = {user.cpassword} onChange={handleInputs}
                            />
                        </div>
                        <br />
                        
                        <div className="form-group-symbol">
                        <span className="symbol">
                                <i class="zmdi zmdi-male material-icons-name"></i>
                            </span>
                            <div className="form-group-radio">
                            {gender.map(result=>(
                                <>
                                    <input type = "radio" value = {result} name="gender" onChange={handleInputs}/>
                                    <label className='radio-label'>{result}</label>
                                    &nbsp;&nbsp;
                                </>
                            ))}
                            
                        </div>    
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="contact">
                                <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                            </label>
                            &nbsp;&nbsp;&nbsp;
                            <input type ="text" name="number" id="number" autoComplete="off" placeholder="your contact-number"
                                value = {user.number} onChange={handleInputs}/>
                            
                        </div>
                        <br />

                        <div className="form-group form-button">
                            <input type="submit" name="signup" id="signup" value="Register" onClick={PostData} ></input>
                        </div>
                    </form>
                    <br />
                    <NavLink to="/signin">Alerady Registered?</NavLink>
          </div>
      </section>
    </div>
  )
}

export default Signup