const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //iska matlab hai ki password hashing ke liye bcrypt library ka use kar rahe hain, jisse password ko secure banaya ja sakta hai

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, "Email is required for creating account"],
        unique: [true, "Email already exist"],
        trim : true, //iska matlab hai ki email ke aage ya peeche koi space nahi hona chahiye
        match: [/.+@.+\..+/, "Please enter a valid email address"] //iska matlab hai ki email ka format sahi hona chahiye
    },
    name: {
        type: String,
        required: [true, "Name is required for creating account"],
    },
    password:{
        type: String,
        required: [true, "Password is required for creating account"],
        minlength: [6, "Password must be at least 6 characters long"],
        select : false //iska matlab hai ki password ko query karte waqt by default return nahi karega, isse security badh jati hai
    },
    SystemUser: {
        type: Boolean,
        default: false,
        immutable: true, //iska matlab hai ki SystemUser field ko create hone ke baad update nahi kiya ja sakta, isse ensure hota hai ki ek user ko system user banaya jaye ya nahi, aur uske baad usme koi change na ho
        select: false //iska matlab hai ki SystemUser field ko query karte waqt by default return nahi karega, isse security badh jati hai
    }
}, {
    timestamps: true //iska matlab hai ki createdAt aur updatedAt fields automatically add ho jayenge, jisse pata chalega ki user kab create hua aur kab update hua
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next(); //iska matlab hai ki agar password field modify nahi hua hai, to next middleware ko call karo, isse unnecessary hashing se bach jata hai

    try{
        const hash = await bcrypt.hash(this.password, 10); //iska matlab hai ki password ko hash karne ke liye bcrypt library ka use kar rahe hain, 10 salt rounds ke sath
        //10 salt rounds ka matlab hai ki hashing process ko 10 times repeat karna, jisse password hash aur secure ho jata hai
        this.password = hash; //iska matlab hai ki user document ke password field ko hashed password se replace karna

    }catch(error){
        return next(error); //iska matlab hai ki agar hashing process me koi error aata hai, to us error ko next middleware ko pass karna, jisse error handling middleware usko handle kar sake
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;