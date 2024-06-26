import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function AddConference() {
    const [name,setConfname] = useState();
    const [date, setDate] = useState();
    const [location,setLocation] = useState();
    const [website, setWebsite] = useState();
    const handleConfAdd = (e) =>{
        e.preventDefault();
        let userId = localStorage.getItem("id");
        alert("Conference Added")
        console.log(name, date, location, website);
        fetch("http://localhost:5000/AddConference",{
        method: "POST",
        crossDomain:true,
        headers:{
            "Content-Type" : "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin":"*"
        }    ,
        body:JSON.stringify({
            name: name,
            date: date,
            location: location,
            website: website,
            id:userId,
        }),
    }).then((res)=>res.json())
    .then((data)=>{
        console.log(data,"confData");
    });
    }

    /////////////////////////////////////////////////////////
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        fetch("http://localhost:5000/home", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userDetails");
            setUserDetails(data.data);
        });
    }, []);

    return (
        <div>

            {/* ----NAVBAR---- */}
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Conf-Ease</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                  <a class="nav-link" href="/about">About</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{userDetails.uname}</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* ----FORM---- */}
            <div className="row g-0 vh-100  justify-content-center align-items-center signup-container">
            <div className="col-10 row g-0 align-items-center rounded-5 bg-white">

                <div className="d-none d-md-block col-6 rounded-5 img-div">
                    <img  src = "https://img.freepik.com/free-vector/gradient-national-science-day-vertical-poster-template_52683-80808.jpg?w=360&t=st=1708370847~exp=1708371447~hmac=dd2a46b8e907b104735456c0cb31e721ac681e72602ebcf1ee607e0fd9c3c331" alt="Event" className="image-fluid opening-img" />
                </div>
            <form onSubmit={handleConfAdd} className="col-12 col-md-6 py-4 px-3">
                    <h4 className="signup-title text-center py-2 mb-4">Create Your own Conference</h4>

                    <div className="form-floating mb-3">
                    <label htmlFor="username">Conference Title</label>
                        <input type="textarea" className="form-control" id="username" placeholder="user" onChange={(e)=>{setConfname(e.target.value)}} />    
                    </div>

                    <div className="form-floating mb-3">
                        <input type="date" className="form-control" id="email" placeholder="name@example.com" onChange={(e)=>{setDate(e.target.value)}} />
                        <label htmlFor="email">Start Date</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="textarea" className="form-control" id="password" placeholder="XXXXXXXX" onChange={(e)=>{setLocation(e.target.value)}} />
                        <label htmlFor="password">Location</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="textarea" className="form-control" id="password" placeholder="XXXXXXXX" onChange={(e)=>{setWebsite(e.target.value)}} />
                        <label htmlFor="password">Website</label>
                    </div>

                    <div className="text-center">
                        <button className="signup-btn py-3 rounded-3">
                            Add Conference
                        </button>
                    </div>

                </form>
                </div>
        </div>


        </div>
    );
}

export default AddConference;