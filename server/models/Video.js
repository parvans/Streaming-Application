import mongoose from "mongoose";
import Joi from "joi";
const Video=mongoose.model("Video",new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    thumbnailUrl:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
}));

function validateVideo(video){
    const schema=Joi.object({
        title:Joi.string().required().min(3).max(255),
        description:Joi.string().required().min(3).max(255),
        videoUrl:Joi.string().required(),
        thumbnailUrl:Joi.string().required(),
        category:Joi.string().required().min(3).max(255),
    });
    return schema.validate(video);
}

export {Video,validateVideo};




