import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ViewConference from './pages/ViewConference';
import AddConference from './pages/AddConference';
import ConfDetail from './pages/ConfDetail';
import MyConf from './pages/MyConf';
import AddPaper from './pages/AddPaper';
import SubmissionList from './pages/SubmissionList';
import ReviewerList from './pages/ReviewerList';
import MyPapers from './pages/MyPapers';
import MyReviews from './pages/MyReviews';
import ReviewPage from './pages/ReviewPage';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = {isLoggedIn == "true" ? <Home/> : <Login/>}/>
        <Route path = "/Login" element={<Login/>}/>
        <Route path = "/Signup" element={<Signup/>}/>
        <Route path = "/Home" element = {<Home/>}/>
        <Route path = "/ViewConference" element = {<ViewConference/>}/>
        <Route path = "/AddConference" element = {<AddConference/>}/>
        <Route path = "/AddPaper" element = {<AddPaper/>}/>
        <Route path = "/ConfDetail/:id" element = {<ConfDetail/>}/>
        <Route path = "/MyConf" element = {<MyConf/>}/>
        <Route path = "/SubmissionList/:id" element = {<SubmissionList/>}/>
        <Route path = "/ReviewerList/:id" element = {<ReviewerList/>}/>
        <Route path = "/MyPapers/:id" element = {<MyPapers/>}/>
        <Route path = "/MyReviews/:id" element = {<MyReviews/>}/>
        <Route path = "/ReviewPage/:id" element = {<ReviewPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
