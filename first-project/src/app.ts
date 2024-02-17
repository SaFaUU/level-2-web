/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import cookieParser from 'cookie-parser'

const app: Application = express()

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

//application routes
app.use('/api/v1', router)

const test = async (req: Request, res: Response) => {
  // Promise.reject()
  const a = 10
  res.send(a)
}

app.get('/', test)

app.use(globalErrorHandler)

app.use(notFound)

export default app
