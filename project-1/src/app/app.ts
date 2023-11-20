import express, { NextFunction, Request, Response } from 'express'
const app = express()

// parsers
app.use(express.json())
app.use(express.text())


// router
const userRouter = express.Router()
const courseRouter = express.Router()


app.use("/api/v1/users", userRouter)
app.use("/api/v1/courses", courseRouter)

userRouter.post('/create-user', (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User created successfully",
        data: req.body,
    })
})

courseRouter.post('/create-course', (req: Request, res: Response) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course created successfully",
        data: req.body,
    })
})

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    next()
}


app.post('/', logger, async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(
            req.query
        );
        res.json({
            success: true,
            message: "Got data",
            data: req.query
        })
    }
    catch (err) {
        next(err)
    }
})

// app.post('/', (req: Request, res: Response) => {
//     console.log(req.body);
//     res.send("Got data")
// })

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

// global handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something Went wrong"
        })
    }
})

export default app;
