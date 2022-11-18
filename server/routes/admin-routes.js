import express from 'express'
import admincontroll from '../controllers/admin-controller.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/getall', admincontroll.getAllUsers)
router.post('/uploadvedio', admincontroll.addVideo)
router.get('/deletevedio/:id', admincontroll.deleteVideo)
router.post('/createplan', admincontroll.createPlan)
router.get('/getallplans', admincontroll.getAllPlans)
router.get('/getaplan/:id', admincontroll.getAPlan)
router.put('/updateplan/:id', admincontroll.updatePlan)
router.delete('/deleteplan/:id', admincontroll.deletePlan)
export default router
