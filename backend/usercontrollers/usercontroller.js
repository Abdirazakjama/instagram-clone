import jwt from 'jsonwebtoken';
import { JWT_SECRET, WEB_URL } from "../config/config.js";
import User from "../models/User.js";
import sendVerificationEmail from "../util/emails/sendVeificationToken.js";
import { generateVerificationToken } from "../util/generation.js";
;

export const registerUser = async (req, res, next) => {

    try {



        const { username, password, email } = req.body;

        const isUserExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });


        if (isUserExists) {

            if (isUserExists.email === email.toLowerCase()) {
                return res.status(400).send("email already exists");
            }
            if (isUserExists.username === username.toLowerCase()) {
                return res.status(400).send("username already exists");
            }
        }


        const verificationToken =generateVerificationToken()
        
        const tokeExpireDate = new Date()

        tokeExpireDate.setHours(tokeExpireDate.getHours() + 24)


        const userInfo = new User({
            username,
            email,
            password,
            token:verificationToken,
            expireDate:tokeExpireDate
           
        });

        await userInfo.save();

       userInfo.password = undefined;

       const verificationLink =` ${WEB_URL}/users/verify-user?token=${verificationToken}&userId=${userInfo._id}` 

       sendVerificationEmail(email,verificationLink)

        res.status(201).send(userInfo);

    } catch (err) {
        console.log("error at user registerUser", err);
        res.status(400).send(err.message);
    }

};


export const verifyUser = async(req,res)=>{
    try {

        const {token,userId:_id} = req.query


        const user = await User.findOne({_id,token})

        if(!user){
            return res.status(404).send("invakid token");
        }

        const expirationTime = user.expireDate;

        if(!expirationTime || expirationTime < new Date()){
            res.status(400).send("Token has expired")
        }

        //check the actual expiration time

        const maxAge = new Date()

        maxAge.setHours(maxAge.getHours() - 24)

        if(expirationTime < maxAge){
            res.status(400).send("Token has expired")
        }

        user.isEmailConfirmed = true;
        user.token = undefined;

        user.expireDate = undefined;

        await user.save();

        res.status(201).send({status:true,message:"token has verified successfuly"})


    } catch (err)  {
        console.log("error at user verification", err);
        res.status(400).send(err.message);
    }
}

export const loginUser = async (req,res) =>{
    try {
        const { username, password, email } = req.body;

        const isUserExists = await User.findOne({
            $or: [
                { email:email?.toLowerCase() },
                { username:username?.toLowerCase() }
            ]
        }).select("+password");



        if(!isUserExists.isEmailConfirmed){
            return res.status(401).send("please comfirm email first")
        }

        if(!isUserExists){
            return res.status(404).send("invalid username or password")
        }

        const validPassword = await isUserExists.comparePassword(password);

        if(!validPassword){
            return res.status(404).send("invalid username or password")
        }

        const expireIn = 7 * 24 * 60 * 60;

        
        const token = jwt.sign({ _id: isUserExists._id }, JWT_SECRET);

        

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            maxAge:expireIn * 1000
        })

        isUserExists.password = undefined;

        res.status(200).send({ ...isUserExists.toJSON(), expireIn });


    } catch (err)  {
        console.log("failed login", err);
        res.status(400).send(err.message);
    }
}

export const logoutUser = (req,res) => {
    try {
        res.clearCookie("token")
        res.send("logout successfuly")
    } catch (error) {
        console.log("error on logout",error)
    }
}