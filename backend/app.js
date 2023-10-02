import express from 'express'
import connectDB from './config/db.js';
import postsRoute from './routes/post.js';
import usersRoute from './routes/user.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8000
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/users',usersRoute)
app.use('/api/v1/posts',postsRoute)


connectDB();



app.listen(PORT, () =>{
   console.log(`app listen port on ${PORT}`)
})