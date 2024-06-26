const mongoose = require("mongoose");

const paperDataSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        instructor: String,
        affiliation: String,
        files: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserInfo'
        },
        confId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'confData'
        },
        reviewerUname: {
            type: String,
            default: null
        },
        reviewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reviewerData',
            default: null
        },
        intro_rating:{
            type: String,
            default: `-`
        },
        hypothesis_rating:{
            type: String,
            default: `-`
        },
        methodology_rating:{
            type: String,
            default: `-`
        },
        result_rating:{
            type: String,
            default: `-`
        },
        recommendations:{
            type: String,
            default: `-`
        },
        comments:{
            type: String,
            default: `-`
        },
        accepted:{
            type: Boolean,
            default: false
        }
        
    },
    {
        collection: "paperData"
    }
);

mongoose.model("paperData", paperDataSchema);
