import { NextApiRequest } from 'next'
import Cors from 'cors'

export const checkOrigin = async (req: NextApiRequest) => {
  const { headers } = req
  const localRegex = new RegExp(/localhost:3000/)
  const isVercel = new RegExp(/.*\.vercel.*/)
  const isLocalhost = localRegex?.test(headers?.host || '')
  console.error({ isLocalhost, isVercel })
  if (!isVercel || !isLocalhost) {
    throw new Error('unauthorized')
  }
}

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

export const cors = initMiddleware(
  Cors({
    origin: ['localhost:3000', /.vercel\.app/, /alchemy\.com/],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Access-Control-Allow-Headers',
      'Authorization',
      'X-Requested-With',
    ],
  })
)
