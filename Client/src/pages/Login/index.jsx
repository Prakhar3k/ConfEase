import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
        fetch("http://localhost:5000/login", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                mail: email,
                pass: password
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            if (data.status == "ok"){
                alert("login Successful");
            window.localStorage.setItem("token", data.data);
            window.localStorage.setItem("loggedIn", true);
            window.localStorage.setItem("id", data.id)
            window.localStorage.setItem("reviewerId", data.reviewerId)
            window.location.href="./home"
            }
        });
        

    }

    return(
        <div className="row g-0 vh-100  justify-content-center align-items-center login-container">
            <div className="col-10 row g-0 align-items-center rounded-5 bg-white">

                <div className="d-none d-md-block col-6 rounded-5 img-div">
                    <img src = "https://img.freepik.com/free-vector/gradient-national-science-day-vertical-poster-template_52683-80808.jpg?w=360&t=st=1708370847~exp=1708371447~hmac=dd2a46b8e907b104735456c0cb31e721ac681e72602ebcf1ee607e0fd9c3c331" alt="Event" className="image-fluid opening-img" />
                </div>

                <form onSubmit={handleLogin} className="col-12 col-md-6 py-4 px-3">
                    <h4 className="login-title text-center py-2 mb-4">Login</h4>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e)=>{setEmail(e.target.value)}} />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" placeholder="XXXXXXXX" onChange={(e)=>{setPassword(e.target.value)}} />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="text-center">
                        <button className="login-btn py-3 rounded-3">
                            Login
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        Not Registerd? <Link to = "/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>

    
    )
}

export default Login;