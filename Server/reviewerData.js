const mongoose = require("mongoose");

const reviewerDataSchema = new mongoose.Schema(
    {
        code: String,
        designation: String,
        uname: String, // Change type to String
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserInfo'
        },
        confId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'confData'
        }
    },
    {
        collection: "reviewerData"
    }
);

mongoose.model("reviewerData", reviewerDataSchema);
