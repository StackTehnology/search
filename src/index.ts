require('dotenv').config()
import express, { Application, NextFunction, Request, Response } from 'express'

import routes from './api/routes'
import dbInit from './db/init'

dbInit()

const port = 3000

export const get = () => {
    const app: Application = express()

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.get('/', async(req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${port}/api/v1` })
    })
    
    app.use('/api/v1', routes)

    // Global Error Handler
    // app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    //     err.status = err.status || 'error';
    //     err.statusCode = err.statusCode || 500;
    //
    //     res.status(err.statusCode).json({
    //         status: err.status,
    //         message: err.message,
    //     });
    // });



    return app
}

export const start = () => {
    const app = get()
    try {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`)
        })
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`)
    }
}

start()
