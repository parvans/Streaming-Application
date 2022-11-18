import mongoose from "mongoose";
import Joi from "joi";

const Plan=mongoose.model("Plan",{
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },

})

function validatePlan(plan){
    const schema=Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required()
    })
    return schema.validate(plan)
}
export {Plan,validatePlan}