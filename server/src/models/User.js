import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please add a name"]
    },

    email : {
        type : String,
        required: [true, "Please add an email"],
        unique : true,
        match : [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    
    password : {
        type : String,
        required : [true, "Pleasea add a password"],
        minlength : 6
    },

    productivityStyle : {
        type : String,
        enum : ['Analytical', 'Creative', 'Fast-paced', 'Balanced']
    }
}, {timestamps : true});

export default mongoose.model("User", userSchema);