import { User, validateUser } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'
import { nanoid } from 'nanoid'
const sgmailapikey = "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"
dotenv.config()

const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).send('User already registered')
    } else {
        try {
            let HashedPassword = await bcrypt.hash(password, 10)
            let newUser = new User({
                name,
                email,
                password: HashedPassword,
            })
            let result = await newUser.save()
            res.status(201).send(result)
        } catch (error) {
            return res.status(400).send(error)
        }

    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('Invalid email or password')
    } else {
        try {
            let isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send('Invalid email or password')
            } else {
                let token = jwt.sign({ id: user._id, isAdmin: user.isAdmin,subscribed: user.subscribed}, process.env.JWT_SECRET, { expiresIn: '1h' })
                res.status(200).send(token)
            }
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

const sendEmail = async (req, res) => {
    const { email } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('Invalid email')
    } else {
        try {
            // gelerate code
            const otpCode = nanoid(5).toUpperCase()
            // save to db
            user.otpCode = otpCode
            await user.save()
            sgMail.setApiKey(sgmailapikey)
            const msg = {
                to: user.email,
                from: 'parvansajeevan666@gmail.com',
                subject: 'Password reset code',
                html: `<h1>Your password  reset code is: ${otpCode}</h1>`,
            }
            // send email
            const data = await sgMail.send(msg)
            console.log(data);
            res.status(200).send('Email sent')
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

const verifyCode = async (req, res) => {
    const { email, otpCode } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('Invalid email')
    } else {
        try {
            if (user.otpCode === otpCode) {
                res.status(200).send('Code verified')
            } else {
                res.status(400).send('Invalid code')
            }
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

const resetPassword = async (req, res) => {
    const { email, password, confirmpassword } = req.body
    let user = await User.findOne({ email })
    if (!user) {
        return res.status(400).send('Invalid email')
    }
    if (password !== confirmpassword) {
        return res.status(400).send('Password does not match')
    }
    try {
        let HashedPassword = await bcrypt.hash(password, 10)
        user.password = HashedPassword
        await user.save()
        res.status(200).send('Password reset successful')
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getallUsers = async (req, res) => {
    try {
        let users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        return res.status(400).send
    }
}

const profile = async (req, res) => {
    try {
        let user = await User.findById({ _id: req.body.id})
        if(user){
        res.status(200).send(user)
        }else{
            res.status(400).send('User not found')
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const subscribe= async (req, res) => {
    try {
        let user = await User.findById({ _id: req.body.id})
        if(user){
            user.subscribed=true
            user.plan=req.body.plan
            await user.save()
            let token = jwt.sign({ id: user._id, isAdmin: user.isAdmin,subscribed: user.subscribed}, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(200).send(token)
        }else{
            res.status(400).send('User not found')
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const updateProfile = async (req, res) => {
    const data = req.body
    try {
        let user = await User.findByIdAndUpdate({ _id: req.body.id }, { $set: data }, { new: true })
        if (user) {
            try {
                res.status(200).send(user)
            } catch (error) {
                res.status(200).send(error.message)
            }
        }else{
            res.status(400).send('User not found')
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default {
    registerUser,
    loginUser,
    sendEmail,
    verifyCode,
    resetPassword,
    getallUsers,
    profile,
    updateProfile,
    subscribe,}



