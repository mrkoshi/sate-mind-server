import { intArg, subscriptionField } from '@nexus/schema'
import { withFilter } from 'apollo-server'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

interface User {
  id: string
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export const userSignedIn = subscriptionField('userSignedIn', {
  type: 'User',
  args: {
    userId: intArg({ nullable: false }),
  },
  subscribe: withFilter(
    (_, args, ctx) => {
      const { pubsub } = ctx
      return pubsub.asyncIterator(USER_SIGNED_IN)
    },
    (payload, { userId }) => {
      return payload.id === userId
    },
  ),
  resolve: (payload) => {
    return payload
  },
})
