import { Context } from './context'
import { verify } from 'jsonwebtoken'

const { JWT_SECRET } = process.env
export const APP_SECRET = JWT_SECRET

interface Token {
  userId: string;
}

export function getUserId(context: Context): number {
  const Authorization = context.request.req.get('Authorization')

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && parseInt(verifiedToken.userId, 10)
  }
}
