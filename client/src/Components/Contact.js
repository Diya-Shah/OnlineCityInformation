import React from 'react'
import './Assets/contact.css';

const handleQuery = (event) => {
    var email =document.getElementById("email");
    var query = document.getElementById("query");
    if (document.getElementById("email").value != "" && document.getElementById("query").value != "") {
        document.getElementById("heading").innerHTML = "Thankyou for your response !!  Your Query/Suggestion has been Considered !!";
    }
    // if(email.value()!= null && query.value!=null){
    //     document.getElementById("heading").innerHTML = "Thankyou for your response !!  Your Query/Suggestion has been Considered !!";
    // }

};

const Contact = () => {
    return (
        
        <div class="contact">
             <center><br /><h1>Contact Us</h1><br/><br/>
                <table id="table1">
                    <tr>
                        <th id="heading" >Enter your Query/Suggestions Here</th>
                    </tr>
                    <br />
                    <tr>
                        <td id="email"><input type="email" name="email" id="email" placeholder="Enter Your Email" required /></td>
                    </tr>
                    <br />
                    <tr>
                        <td id="query"><textarea placeholder="Enter Your Query/Suggestion" id="query" required></textarea></td>
                    </tr>
                    <br />
                    <tr>
                        <td id="submit-btm"><input type="submit" name="submit" onClick={handleQuery} value="Submit" /></td>
                    </tr>
                    <br />
                </table>
            </center>
        </div>

    )
}
export default Contact