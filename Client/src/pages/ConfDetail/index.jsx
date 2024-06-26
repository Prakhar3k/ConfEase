import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

function ConfDetail() {
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

    const AddPaper = () =>{
        window.location.href = "../AddPaper";
    };

    const [confDetails, setConfDetails] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/ConfDetail/${id}`, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setConfDetails([data.data]);
            window.localStorage.setItem("confId", data.confId)
            
        });
    }, [id]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${month}/${day}/${year}`;
    };
    

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

            {/* Conference details */}
            <div className="conf-details-container">
                <ul>
                    {confDetails.map(conf => (
                        <div key={conf._id}>
                            <h1>{conf.name}</h1><br/><br/>
                            <h3>Date: {formatDate(conf.date)}</h3><br/>
                            <h3>Location: {conf.location}</h3><br/>
                            <h3>Website: <a href={conf.website}>{conf.website}</a></h3><br/>
                            <h3>Details:<br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
                        </div>
                    ))}
                </ul>
            </div>


            
                
            <button className="btn btn-outline-dark btn-lg details-button1" onClick={AddPaper}>Submit Paper</button>

            </div>
    );
}

export default ConfDetail;