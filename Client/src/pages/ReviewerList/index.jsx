import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles.css"

function ReviewerList() {
    const [userDetails, setUserDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    
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
    const [userData, setUserData] = useState([]);
    const { id } = useParams();


    

    useEffect(() => {
        fetch(`http://localhost:5000/searchUname`, {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            console.log(data, "userData");
            setUserData(data.data);
            setData(data.data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    // Filter userData based on search query
    const filteredUserData = userData.filter(user => user.uname.toLowerCase().includes(searchQuery.toLowerCase()));

    // Function to handle selection of user
    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    
    const handleReviewerSubmission = async (e) => {
        e.preventDefault();
        if (!selectedUser) return; // Ensure a user is selected
    
        try {
            const response = await fetch("http://localhost:5000/AddReviewer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: e.target.elements.reviewerUname.value,
                    designation: e.target.elements.designation.value, // Get code from form input
                    uname: selectedUser.uname, // Get uname from selected user
                    userId: selectedUser._id, // Get selected user's ID
                    confId: id, // Conference ID (assuming it's available in the component)
                }),
            });
            
            const data = await response.json();
            alert("Reviewer added successfully:");
            
            // Clear selected user after submission
            setSelectedUser(null);
        } catch (error) {
            console.error("Error adding reviewer:", error);
        }
    };
    
    useEffect(() => {
        fetch(`http://localhost:5000/ReviewerList/${id}`, {
            method: "GET",
            
        })
        .then((res) => res.json())
        .then((data) => {
            const formattedData = data.data.map(conf => ({
                ...conf,
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


            {/* ----REVIEWER LIST TABLE---- */}
        <div className="container">
            <h2>Reviewer List</h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="cols cols-1">Reviewer code</div>
                    <div className="cols cols-2">Reviewer Designation</div>
                    <div className="cols cols-2">Reviewer Username</div>
                </li>
            </ul>

            {data.length === 0 ? (
                <p>No Reviewer Found</p>
            ) : (
                data.map(i => (
                    <ul className="responsive-table" key={i._id}>
                        <li className="table-row">
                            <div className="cols-1">{i.code}</div>
                            <div className="cols-2">{i.designation}</div>
                            <div className="cols-2">{i.uname}</div>
                            {/* <div className="cols-5">Reviewer</div> */}

                        </li>
                    </ul>
                ))
            )}







            <div className="dropdown d-flex justify-content-center">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">Add Reviewer</button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" onClick={(e) => e.stopPropagation()}>
                    <input type="text" className="form-control w-100" placeholder="Search by Username" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    {filteredUserData.map(user => (
                        <div key={user._id}>
                            <a className="dropdown-item" href="#" onClick={() => handleUserSelect(user)}>{user.uname}</a>
                            {selectedUser && selectedUser._id === user._id && (
                                <div className="dropdown-submenu">
                                    <form onSubmit={handleReviewerSubmission}>
                                        <div className="mb-3">
                                        <hr className="dropdown-divider" />
                                            <label htmlFor="reviewerUname" className="form-label mx-2">Reviewer Codename for {selectedUser.uname}</label>
                                            <input type="text" className="form-control mx-2 w-75" id="reviewerUname" />
                                            <label htmlFor="reviewerUname" className="form-label mx-2">Reviewer Designation</label>
                                            <input type="text" className="form-control mx-2 w-75" id="designation" /> 
                                            <button type="submit" className="btn btn-primary mx-2">Submit</button>
                                            <hr className="dropdown-divider" />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>                       
        </div>
    </div>
    );
}

export default ReviewerList;