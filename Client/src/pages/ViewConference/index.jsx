import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function ViewConference() {
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

    const [data, setData] = useState([]); 
    useEffect(() => {
        fetch("http://localhost:5000/ViewConference", {
            method: "GET",
            
        })
        .then((res) => res.json())
        .then((data) => {
            const formattedData = data.data.map(conf => ({
                ...conf,
                date: new Date(conf.date).toLocaleDateString()
            }));
            setData(formattedData);
        });
    }, []);


    return (
        <div>

            {/* ----NAVBAR---- */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Conf-Ease</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                  <a className="nav-link" href="/about">About</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"  href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{userDetails.uname}</a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* ----CONFERENCE DATA TABLE---- */}
            
            <div class="container">
  <h2>Conference List</h2>
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-1">Conference Name</div>
      <div class="col col-1">Conference Date</div>
      <div class="col col-1">Location</div>
      <div class="col col-1">Website</div>
    </li>
    </ul>
    {data.map(i=>{
        return(
        <ul class="responsive-table">
            <Link className = "titleLink" to={`/ConfDetail/${i._id}`}><li class="table-row">
                <div class="col-1">{i.name}</div>
                <div class="col-1">{i.date}</div>
                <div class="col-1">{i.location}</div>
                <div class="col-1">{i.website}</div>
            </li></Link>
        </ul>
    )})}
    
</div>
            


        </div>
    );
}

export default ViewConference;