import { Video, validateVideo } from '../models/Video.js'
import { User } from '../models/User.js'
import { Plan, validatePlan } from '../models/Plans.js'
const getVideos = async (req, res) => {
    try {
        let videos = await Video.find()
        res.status(200).send(videos)
    } catch (error) {
        return res.status(400).send(error)
    }

}

const getVideo = async (req, res) => {
    try {
        let video = await Video.findById(req.params.id)
        if (!video) {
            return res.status(400).send('No video found')
        } else {
            res.status(200).send(video)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const addVideo = async (req, res) => {
    const { error } = validateVideo(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    try {
        let video = new Video(req.body)
        await video.save()
        res.status(200).send(video)
    } catch (error) {
        return res.status(400).send(error)
    }
}

const updateVideo = async (req, res) => {
    const { error } = validateVideo(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    try {
        let video = await Video.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        if (video) {
            try {
                res.status(200).send(video)
            } catch (error) {
                res.status(200).send(error.message)
            }
        } else {
            res.status(400).send('No video found')
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const deleteVideo = async (req, res) => {
    try {
        let video = await Video.findByIdAndDelete(req.params.id)
        if (video) {
            res.status(200).send(video)
        } else {
            res.status(400).send('No video found')
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        let users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        return res.status(400).send(error)
    }
}

const createPlan = async (req, res) => {
    const { error } = validatePlan(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    try {
        let plan = await Plan.create(req.body)
        await plan.save()
        res.status(200).send(plan)
    } catch (error) {
        return res.status(400).send(error)
    }
}

const getAllPlans = async (req, res) => {
    try {
        let plans = await Plan.find()
        if(plans){
        res.status(200).send(plans)
        }else{
            res.status(400).send('No plans found')
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}
const updatePlan = async (req, res) => {
    const { error } = validatePlan(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    try {
        let plan = await Plan.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        if (plan) {
            try {
                res.status(200).send(plan)
            } catch (error) {
                res.status(200).send(error.message)
            }
        } else {
            res.status(400).send('No plan found')
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}
const getAPlan = async (req, res) => {  
    try {
        let plan = await Plan.findById(req.params.id)
        if (!plan) {
            return res.status(400).send('No plan found')
        } else {
            res.status(200).send(plan)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

const deletePlan = async (req, res) => {
    try {
        let plan = await Plan.findByIdAndDelete(req.params.id)
        if (plan) {
            res.status(200).send("Plan deleted")
        } else {
            res.status(400).send('No plan found')
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}


export default  { 
    getVideos, 
    getVideo, 
    addVideo, 
    updateVideo, 
    deleteVideo, 
    getAllUsers, 
    createPlan,
    getAllPlans,
    updatePlan,
    getAPlan,
    deletePlan }