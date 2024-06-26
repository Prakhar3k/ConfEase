import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

function ReviewPage() {
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


    const [reviewDetails, setReviewDetails] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/ReviewDetail/${id}`, {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setReviewDetails([data.data]);
            window.localStorage.setItem("paperId", data.paperId)
            
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

            {/* Conference details */}
            <div className="conf-details-container">
    <ul>
        {reviewDetails.map(paper => (
            <div key={paper._id}>
                <h1 style={{ textAlign: "center" }}><strong><u>{paper.title}</u></strong></h1>
                <div className="rating-container my-5">
                    <div className="rating-tile">
                        <h3>Intro Rating:</h3>
                        <h1>{paper.intro_rating}/10</h1>
                    </div>
                    <div className="rating-tile">
                        <h3>Hypothesis Rating:</h3>
                        <h1>{paper.hypothesis_rating}/10</h1>
                    </div>
                    <div className="rating-tile">
                        <h3>Methodology Rating:</h3>
                        <h1>{paper.methodology_rating}/10</h1>
                    </div>
                    <div className="rating-tile">
                        <h3>Result Rating:</h3>
                        <h1>{paper.result_rating}/10</h1>
                    </div>
                </div>
                <div>
                    <h3 className="my-5"><strong>Comments:</strong> {paper.comments}</h3>
                    <h3><strong>Recommendations:</strong> {paper.recommendations}</h3>
                </div>
            </div>
        ))}
    </ul>
</div>


            </div>
    );
}

export default ReviewPage;