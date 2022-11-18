import express from 'express'
import usercontroll from '../controllers/user-controller.js'
import admincontroll from '../controllers/admin-controller.js'
import auth from '../middleware/auth.js'

const router=express.Router()

router.post('/register',usercontroll.registerUser)
router.post('/login', usercontroll.loginUser)
router.post('/send-email', usercontroll.sendEmail)
router.post('/verify-otp', usercontroll.verifyCode)
router.post('/reset-password', usercontroll.resetPassword)
router.put('/update-user',usercontroll.updateProfile)
router.get('/profile',auth,usercontroll.profile)
router.post('/subscribe',usercontroll.subscribe)

router.get('/getvedios', admincontroll.getVideos)
router.get('/getvedio/:id', admincontroll.getVideo)


export default router