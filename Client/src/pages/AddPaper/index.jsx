import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css"

function AddPaper() {
    const [title,setPaperTitle] = useState();
    const [author, setAuthor] = useState();
    const [instructor,setInstructor] = useState();
    const [affiliation, setAffilliation] = useState();
    const [file, setFile] = useState();

        const handlePaperAdd = async (e) => {
            e.preventDefault();
            let userId = localStorage.getItem("id");
            let confId = localStorage.getItem("confId");
            alert("Paper Added");
            console.log(title, author, instructor, affiliation, file);
        
            const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('instructor', instructor);
            formData.append('affiliation', affiliation);
            formData.append('file', file);
            formData.append('id', userId);
            formData.append('confId', confId);
        
            fetch("http://localhost:5000/AddPaper", {
                method: "POST",
                crossDomain: true,
                body: formData
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "confData");
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
            <form onSubmit={handlePaperAdd} className="col-12 col-md-6 py-4 px-3">
                    <h4 className="signup-title text-center py-2 mb-4">Submit Your Paper</h4>

                    <div className="form-floating mb-3">
                        <input type="textarea" className="form-control" id="title" onChange={(e)=>{setPaperTitle(e.target.value)}} />    
                        <label htmlFor="username">Paper Title</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="textarea" className="form-control" id="author" onChange={(e)=>{setAuthor(e.target.value)}} />
                        <label htmlFor="author">Author Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="textarea" className="form-control" id="instructor" onChange={(e)=>{setInstructor(e.target.value)}} />
                        <label htmlFor="instructor">Co-Author</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="textarea" className="form-control" id="affiliation" onChange={(e)=>{setAffilliation(e.target.value)}} />
                        <label htmlFor="affiliation">Affiliation</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="file" className="form-control" accept="application/pdf"  required onChange={(e)=>{setFile(e.target.files[0])}} />
                    </div>

                    <div className="text-center">
                        <button className="signup-btn py-3 rounded-3">
                            Submit
                        </button>
                    </div>

                </form>
                </div>
        </div>


        </div>
    );
}

export default AddPaper;