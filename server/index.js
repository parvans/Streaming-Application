import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js'
import userRoutes from './routes/user-routes.js'
import adminRoutes from './routes/admin-routes.js'
// database connection
connectDB()
dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`))