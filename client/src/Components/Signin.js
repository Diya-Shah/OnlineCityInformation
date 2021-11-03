import React,{useState} from 'react'
import { NavLink,useHistory } from 'react-router-dom'
import './Assets/signin.css'

const Signin = () => {
    const history = useHistory();
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const loginUser = async(e) =>{
        e.preventDefault();

        const res = await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email:email , password:password
            })
        });
        const data = await res.json();

        if(res.status === 400 || !data){
            window.alert("Invalid email/password");
            console.log("Invalid login");
        }
        else if (res.status === 422){
            window.alert("Login Successful");
            console.log("Login Successful");

            history.push("/userhome");
        }
        else if(res.status === 500)
        {
            window.alert("Admin Login Successfull");
            console.log("Admin Login SuccessFull");
            history.push("/adminpanel");
        }
    }
  return(
    <div class="signin-form">
    <section className="signin">
        <div className="container" id="cont-box">
                  <header >SignIn</header>
                  <form method="POST">
                    <br />
                      <div className="form-group">
                      <span className="symbol">
                              <i class="zmdi zmdi-email material-icons-name"></i>
                          </span>
                          &nbsp;&nbsp;&nbsp;
                          <input type ="email" name="email" id="email" autoComplete="off" placeholder="Enter Your Email"
                              value={email} onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                      <br />
                      <div className="form-group space">
                          <span className="symbol">
                              <i class="zmdi zmdi-lock material-icons-name"></i>
                            </span>
                          &nbsp;&nbsp;&nbsp;
                          <input type ="password" name="password" id="password" autoComplete="off" placeholder="Enter Your Password"
                              value={password} onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                      <br />
                      <div className="form-group">
                          <input type="submit" name="signin" id="signin" value="Login" onClick={loginUser}></input>
                      </div>
                  </form>
                  <br />
                  <div className="link">
                    <NavLink to="/signup">Sign up?</NavLink>
                  </div>
             
        </div>
    </section>
  </div>
  )
}

export default Signin