import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css"
import MyPapers from "../MyPapers";

function Home() {
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

    const MyConf = () =>{
        window.location.href = "./MyConf";
    };
    const MyPapers = () => {
        const id = localStorage.getItem('id');
        window.location.href = `./MyPapers/${id}`;
    };
    const MyReviews = () =>{
        const revid = localStorage.getItem('reviewerId');
        window.location.href = `./MyReviews/${revid}`;
    };
    const logOut = () =>{
        window.localStorage.clear();
        window.location.href = "./Login";
    };

    const viewConference = () =>{
        window.location.href = "./ViewConference";
    };
    const addConference = () =>{
        window.location.href = "./AddConference";
    };




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
                                    <li><a class="dropdown-item" onClick={MyConf}>My Conferences</a></li>
                                    <li><a class="dropdown-item" onClick={MyPapers}>My Papers</a></li>
                                    <li><a class="dropdown-item" onClick={MyReviews}>My Reviews</a></li>
                                    <li><hr class="dropdown-divider" /></li>
                                    <li><a class="dropdown-item"  onClick={logOut}>LogOut</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* HOME IMG */}

        <div>
            <img className ="home-img" height= {"100%"} src="https://png.pngtree.com/background/20211215/original/pngtree-blue-and-purple-modern-background-design-free-png-picture-image_1451507.jpg"/>
            <p className="home-img-text">Connect to the conference World <br/>From the Palm of your Hands</p>
            <button className="btn btn-outline-light btn-lg home-img-button1" onClick={viewConference}>View Conferences</button>
            <button className="btn btn-outline-light btn-lg home-img-button2" onClick={addConference}>Add A Conference</button>
        </div>
        </div>
    );
}

export default Home;