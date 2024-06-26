import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css"
import axios from "axios"

function MyReviews() {
    const [userDetails, setUserDetails] = useState({});
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [IntroRating, setIntroRating] = useState('');
    const [HypothesisRating, setHypothesisRating] = useState('');
    const [MethodologyRating, setMethodologyRating] = useState('');
    const [ResultRating, setResultRating] = useState('');
    const [Recommendation, setRecomendation] = useState('');
    const [Comments, setComments] = useState('');
    const [Accept, setAccept] = useState('');


    const handlePaperSelect = (i) => {
        setSelectedPaper(i);
    };

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
        fetch(`http://localhost:5000/MyReviews/${id}`, {
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

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5000/SendReview", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paperId: selectedPaper._id,
                    intro_rating: IntroRating,
                    hypothesis_rating: HypothesisRating,
                    methodology_rating: MethodologyRating,
                    result_rating: ResultRating,
                    recommendations: Recommendation,
                    comments: Comments,
                    accepted: Accept,
                }),
            });
    
            const data = await response.json();
            alert("Review Submitted");
    
            // Clear selected user after submission
        } catch (error) {
            console.error("Error adding reviewer:", error);
            alert("Error");
        }
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


            {/* ----CONFERENCE DATA TABLE---- */}
        <div className="container">
            <h2>Paper List</h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="cols cols-1">Paper Title</div>
                    <div className="cols cols-2">Author</div>
                    <div className="cols cols-3">Affiliation</div>
                    <div className="cols cols-4">Paper</div>
                    <div className="cols cols-5">Review</div>
                </li>
            </ul>

            {data.length === 0 ? (
                <p>You Ain't a reviewer!!....or maybe no paper assigned</p>
            ) : (
                data.map(i => (
                    <ul className="responsive-table" key={i._id}>
                        <li className="table-row">
                            <div className="cols-1">{i.title}</div>
                            <div className="cols-2">{i.author}</div>
                            <div className="cols-3">{i.affiliation}</div>
                            <div className="cols-4"><a className="btn" onClick={() => showPdf(i.files)}>{i.files}</a></div>
                            <div className="cols-5"><button className="btn btn dropdown-toggle my-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" onClick={() => setSelectedPaper(i._id)}>Add / Modify Review</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={(e) => {e.stopPropagation(); handlePaperSelect(i);}}>
                           


                            <input type="number" className="form-control w-100 my-2" placeholder="Intro Rating /10" value={IntroRating} onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue === '' || (newValue >= 1 && newValue <= 10)) {
                                setIntroRating(newValue);
                                }
                            }}/>
                            <input type="number" className="form-control w-100 my-2" placeholder="Hypothesis Rating /10" value={HypothesisRating} onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue === '' || (newValue >= 1 && newValue <= 10)) {
                                setHypothesisRating(newValue);
                                }
                            }}/>
                            <input type="number" className="form-control w-100 my-2" placeholder="Methodology Rating /10" value={MethodologyRating} onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue === '' || (newValue >= 1 && newValue <= 10)) {
                                setMethodologyRating(newValue);
                                }
                            }}/>
                            <input type="number" className="form-control w-100 my-2" placeholder="Result Rating /10" value={ResultRating} onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue === '' || (newValue >= 1 && newValue <= 10)) {
                                setResultRating(newValue);
                                }
                            }}/>
                            <input type="text" className="form-control w-100 my-2" placeholder="Recommendations" value={Recommendation} onChange={(e) => setRecomendation(e.target.value)}/>
                            <input type="text" className="form-control w-100 my-2" placeholder="Comments" value={Comments} onChange={(e) => setComments(e.target.value)}/>


                            <label className="mx-2">Accept?</label>
                            <div className="form-check my-2">
                                <input className="form-check-input" type="radio" name="accept" id="acceptYes" value="true" checked={Accept === 'true'} onChange={(e) => setAccept(e.target.value)} />
                                <label className="form-check-label" >Yes</label>
                            </div>
                            <div className="form-check my-2">
                                <input className="form-check-input" type="radio" name="accept" id="acceptNo" value="false" checked={Accept === 'false'} onChange={(e) => setAccept(e.target.value)} />
                                <label className="form-check-label" htmlFor="acceptNo">No</label>
                            </div>
                            <button type="submit" onClick={handleReviewSubmit} className="btn btn-primary mx-2">Submit</button>
                            </div>  
                            </div>
                        </li>
                    </ul>
                ))
            )}
        </div>
    </div>
    );
}

export default MyReviews;