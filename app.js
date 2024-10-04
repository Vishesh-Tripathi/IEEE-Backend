import express from 'express';
import cors     from 'cors';
import cookieParser from 'cookie-parser';
import router from './Routes/user.routes.js';
import eventrouter from './Routes/events.routes.js'
import trouter from './Routes/team.routes.js';
import hrouter from './Routes/Highlights.routes.js';

app.use(cors({
    origin: ['https://ieee-frontend-j0losar5y-vishesh-tripathis-projects.vercel.app'],
    credentials: "include"
}))
app.use(cors());
app.use(express.json({limit :"16kb"}))
app.use(express.urlencoded({extended :true ,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use("/api/v1/users",router)
app.use('/events',eventrouter);
app.use('/teams',trouter);
app.use('/highlights',hrouter);


export{app};
