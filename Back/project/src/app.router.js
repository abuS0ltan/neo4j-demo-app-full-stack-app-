import studentRouter from './modules/student/student.js';
import courseRouter from './modules/course/course.js';
import enrolledRouter from './modules/enrolled/enrolled.js';
import cors from 'cors';
const initApp=(express,app)=>{
    app.use(cors());
    app.use(express.json());
    app.use('/student',studentRouter);
    app.use('/course',courseRouter);
    app.use('/enrolled',enrolledRouter);
    app.use('*',(req,res)=>{
        return res.json({message:"page not found"})
    })
}
export default initApp;