const express = require ("express");
const app =express();
const mongoose = require("mongoose");
const path = require('path');
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.use(cors());
const jwt = require("jsonwebtoken");
const JWT_SECRET = "dfsaf46fadsf324244488878()56";
app.use("/files", express.static("files"))


const mongoUrl = "mongodb+srv://prakhar:ABcd5678@cluster0.0nleyko.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{console.log("Connected to database");})
.catch(e=>console.log(e));

app.listen(5000,() =>{
    console.log("Started");
})



require("./userDetails");
const User = mongoose.model("UserInfo");
require("./confData");
const Data = mongoose.model("confData");
require("./paperData");
const paperData = mongoose.model("paperData");
require("./reviewerData");
const reviewerData = mongoose.model("reviewerData");

//----SIGN-UP----
app.post("/register",async(req,res)=>{
    const {username,email,password}=req.body;
    const encryptedPassword = await bcrypt.hash(password,10);
    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            console.log("User Exists");
            return res.send({ error: "User Exists"});
        }

        const newUser = await User.create({
            uname: username,
            mail: email,
            pass: encryptedPassword,
        });
        res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
})


//----SIGN-IN----
app.post("/login",async(req,res)=>{
    const {mail,pass}=req.body;
        const user = await User.findOne({mail});
        if(!user){
            return res.json({error: "User Doesn't Exists"});
        }
        console.log(user._id);
        if(await bcrypt.compare(pass, user.pass)){
            const token = jwt.sign({email: user.mail}, JWT_SECRET);
            const reviewer = await reviewerData.findOne({ userId: user._id });

            if(res.status(201)){
                return res.json({status: "ok", data:token,id:user._id,reviewerId: reviewer ? reviewer._id : null});
            }else{
                return res.json({error: "error"});
            }
        }
        res.json({status:"error", error:"Invalid pass"});
});



//----TO-HOME----
app.post("/home",async(req,res)=>{
    const {token} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        console.log(user);

        const useremail = user.email;
        User.findOne({mail: useremail})
        .then((data)=>{
            res.send({status:"ok", data:data});
        }).catch((error)=>{
            res.send({ status: "error", data: error});
        });
    } catch (error){}
})



//----ADDING CONFERENCE----
app.post("/AddConference",async(req,res)=>{
    const {name,date,location,website,id}=req.body;
    console.log(id);
    try{
        const newConf = Data.create({
            name: name,
            date: date,
            location: location,
            website: website,
            userId: id,
        });
        res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
})

//----DISPLAY CONFERENCE DATA----

app.get("/ViewConference", async(req,res)=>{
    try{
        const allConf = await Data.find({});
        res.send({status:"ok", data: allConf});
    }catch(error){
        res.send({status:"error"});
    }
})

//----DISPLAY CONFERENCE DETAILS----
app.get("/ConfDetail/:id", async(req,res)=>{
    try{
        const confId = req.params.id;
        const conference = await Data.findById(confId);
        res.send({status:"ok", data: conference, confId: conference._id});
    }catch(error){
        res.send({status:"error"});
    }
})


//----SHOW USER CREATED CONF----
app.get("/MyConf", async (req, res) => {
    const { id } = req.query;
    console.log(id);
    try {
        const userConferences = await Data.find({ userId: id });
        res.send({ status: "ok", data: userConferences });
    } catch (error) {
        res.status(500).send({ status: "error" });
    }
});




/////MULTER////
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'files'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


  //----SUBMIT PAPER-----
app.post("/AddPaper",upload.single("file"),async(req,res)=>{
    const {title,author,instructor,affiliation,id,confId}=req.body;
    const file = req.file.filename;
    console.log(id);
    try{
        const newPaper = paperData.create({
            title: title,
            author: author,
            instructor: instructor,
            affiliation: affiliation,
            files: file,
            userId: id,
            confId: confId,
        });
        res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
})


//----PAPER SUBMISSION LIST----
app.get(`/SubmissionList/:id`, async(req,res)=>{
    try{
        const userId = req.params.id;
        const allPaper = await paperData.find({ confId: userId });
        res.send({status:"ok", data: allPaper});
    }catch(error){
        res.send({status:"error"});
    }
})

//----PAPER FILE RETRIEVAL----
app.get(`/GetPaper`, async(req,res)=>{
    try{
        paperData.find({}).then((data)=>{
            res.send({status:"ok", data: data})
        })
    }catch(error){
        res.send({status:"error"});
    }
})

//----REVIEWER FORM DATA----
app.get("/searchUname", async (req, res) => {
    try {
        const allUser = await User.find({});
        res.send({status:"ok", data: allUser})
    } catch (error) {
        res.send({status:"error"});
    }
});




//----ADD REVIEWER----
app.post("/AddReviewer", async (req, res) => {
    const { code, uname, userId, confId, designation } = req.body;
    try {
        // Find the username based on the _id provided
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ status: "error", message: "User not found" });
        }
        
        // Create reviewer data in the reviewerData collection
        const newReviewer = await reviewerData.create({
            code: code,
            uname: user.uname,
            designation: designation,
            userId: userId,
            confId: confId,
        });
        res.send({ status: "ok", reviewer: newReviewer });
    } catch (error) {
        console.error("Error adding reviewer:", error);
        res.send({ status: "error", error: error.message });
    }
});

//----REVIEWER LIST----
app.get(`/ReviewerList/:id`, async(req,res)=>{
    try{
        const confId = req.params.id;
        const allReviewer = await reviewerData.find({ confId: confId });
        res.send({status:"ok", data: allReviewer});
    }catch(error){
        res.send({status:"error"});
    }
})

app.get("/searchCname", async (req, res) => {
    try {
        const allUser = await reviewerData.find({});
        res.send({status:"ok", data: allUser})
    } catch (error) {
        res.send({status:"error"});
    }
});


//----ASSIGN REVIEWER----
app.put("/AssignReviewer", async (req, res) => {
    const { uname, userId, paperId } = req.body;
    try {
        // Find the paper based on the _id provided
        const paper = await paperData.findById(paperId);
        console.log("data:", paper);
        if (!paper) {
            return res.status(404).send({ status: "error", message: "Paper not found" });
        }

        // Update paperData with reviewer information
        paper.reviewerUname = uname;
        paper.reviewerId = userId;
        await paper.save();

        res.send({ status: "ok", updatedPaper: paper });
    } catch (error) {
        console.error("Error adding reviewer:", error);
        res.status(500).send({ status: "error", error: error.message });
    }
});


//----MY PAPERS LIST----
app.get(`/MyPapers/:id`, async(req,res)=>{
    try{
        const userId = req.params.id;
        const allPaper = await paperData.find({ userId: userId });
        res.send({status:"ok", data: allPaper});
    }catch(error){
        res.send({status:"error"});
    }
})

//----MY REVIEWS LIST----
app.get(`/MyReviews/:id`, async(req,res)=>{
    try{
        const userId = req.params.id;
        const allPaper = await paperData.find({ reviewerId: userId });
        res.send({status:"ok", data: allPaper});
    }catch(error){
        res.send({status:"error"});
    }
})


//----SUBMIT REVIEW----
app.put(`/SendReview`, async(req,res) =>{
    try{
        const { hypothesis_rating, intro_rating, methodology_rating, result_rating, recommendations, comments, accepted, paperId } = req.body;
        const paper = await paperData.findById(paperId);
        console.log("data:", paper);
        if (!paper) {
            return res.status(404).send({ status: "error", message: "Paper not found" });
        }

        paper.hypothesis_rating = hypothesis_rating;
        paper.intro_rating = intro_rating;  
        paper.methodology_rating = methodology_rating;
        paper.result_rating = result_rating;
        paper.recommendations = recommendations;
        paper.comments = comments;
        paper.accepted = accepted;
        await paper.save();

        res.send({ status: "ok", updatedPaper: paper });
    }catch(error){
        console.error("Error Sending review:", error);
        res.status(500).send({ status: "error", error: error.message });
    }
})



//----DISPLAY REVIEW DETAILS----
app.get("/ReviewDetail/:id", async(req,res)=>{
    try{
        const paperId = req.params.id;
        const paper = await paperData.findById(paperId);
        res.send({status:"ok", data: paper, paperId: paper._id});
    }catch(error){
        res.send({status:"error"});
    }
})