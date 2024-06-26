const mongoose= require("mongoose");

const confDataSchema = new mongoose.Schema(
    {
        name: String,
        date: Date,
        location: String,
        website: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserInfo'
        }
    },
    {
        collection:"confData"
    }
)

mongoose.model("confData", confDataSchema);