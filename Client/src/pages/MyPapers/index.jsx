import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css"
import axios from "axios"

function MyPapers() {
    const [userDetails, setUserDetails] = useState({});
    const [accept, setAccept] = useState("")
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
                token: window.localStorage.getItem("token") || "",
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userDetails");
            setUserDetails(data.data);
        });
    }, []);

    const [data, setData] = useState([]);
    const { id } = useParams();
    const [allImage, setAllImage] = useState(null);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        getPdf();
    }, []);
    const getPdf = async () =>{
        const result = await axios.get("http://localhost:5000/GetPaper");
        console.log(result.data.data);
        setAllImage(result.data.data);
    }


    const showPdf=(pdf)=>{
        window.open(`http://localhost:5000/files/${pdf}`, "blank", "noreferrer");
    };

    useEffect(() => {
        fetch(`http://localhost:5000/MyPapers/${id}`, {
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
    }, [id]);
    


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
        <div className="container">
            <h2>Paper List</h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="cols cols-1">Paper Title</div>
                    <div className="cols cols-2">Author</div>
                    <div className="cols cols-3">Affiliation</div>
                    <div className="cols cols-4">Paper</div>
                    <div className="cols cols-4">Accepted?</div>
                    <div className="cols cols-5">Verdict</div>
                </li>
            </ul>

            {data.length === 0 ? (
                <p>No Papers Found</p>
            ) : (
                data.map(i => (
                    <ul className="responsive-table" key={i._id}>
                        <li className="table-row">
                            <div className="cols-1">{i.title}</div>
                            <div className="cols-2">{i.author}</div>
                            <div className="cols-3">{i.affiliation}</div>
                            <div className="cols-4"><a className="btn" onClick={() => showPdf(i.files)}>{i.files}</a></div>
                            <div className="cols-4">{i.accepted ? "Yes" : "No"}</div>
                            <div className="cols-5"><a href={`/ReviewPage/${i._id}`}>Review</a></div>
                        </li>
                    </ul>
                ))
            )}
        </div>
    </div>
    );
}

export default MyPapers;