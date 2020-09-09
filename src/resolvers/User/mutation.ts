import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inputObjectType, mutationField, stringArg } from '@nexus/schema'

import { APP_SECRET } from '../../utils'
import { USER_SIGNED_IN } from './subscription'

export const UserInputType = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.string('email', {
      required: true,
    })
    t.string('password', {
      required: true,
    })
    t.string('name')
  },
})

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.string('name')
  },
})

export const signUp = mutationField('signUp', {
  type: 'AuthPayload',
  args: {
    user: 'UserCreateInput',
  },
  resolve: async (_parent, { user }, ctx) => {
    const { name, email, password } = user
    const hashedPassword = await hash(password, 10)
    const created = await ctx.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return {
      token: sign({ userId: created.id }, APP_SECRET),
      user: created,
    }
  },
})

export const signIn = mutationField('signIn', {
  type: 'AuthPayload',
  args: {
    email: stringArg({ nullable: false }),
    password: stringArg({ nullable: false }),
  },
  resolve: async (_parent, { email, password }, ctx) => {
    const { pubsub } = ctx

    const user = await ctx.prisma.user.findOne({
      where: {
        email,
      },
    })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    pubsub.publish(USER_SIGNED_IN, user)
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    }
  },
})
