const mongoose= require("mongoose");

const userDetailsSchema = new mongoose.Schema(
    {
        uname: String,
        mail: {type: String, unique: true},
        pass: String,
    },
    {
        collection:"UserInfo"
    }
)

mongoose.model("UserInfo", userDetailsSchema);