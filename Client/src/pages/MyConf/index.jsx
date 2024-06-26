import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function MyConf() {
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
            setUserDetails(data.data);
        });
    }, []);

    const [data, setData] = useState([]); 

    useEffect(() => {
        let userId = localStorage.getItem("id");
        fetch(`http://localhost:5000/MyConf?id=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setData(data.data);
        })
        .catch((error) => {
            console.error('Error fetching conference data:', error);
        });
    }, []);

    

    return (
        <div>
            {/* Navbar */}
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

            {/* Conference Data */}
            <div className="container">
                <h1>Conferences</h1>
                <div className="row">
                    {data.map(conf => ( 
                        <div className="col-md-4" key={conf._id}>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{conf.name}</h5>
                                    <p className="card-text">Date: {new Date(conf.date).toLocaleDateString()}</p>
                                    <p className="card-text">Location: {conf.location}</p>
                                    <Link to={`/SubmissionList/${conf._id}`}><button className="btn btn-primary">Submission List</button></Link>
                                    <Link to={`/ReviewerList/${conf._id}`}><button className="btn btn-dark mx-2">See Reviewers</button></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyConf;
