import { intArg, queryField, stringArg } from '@nexus/schema'
import { getUserId } from '../../utils'

export const getPacks = queryField('getPacks', {
  type: 'Pack',
  list: true,
  args: {
    searchString: stringArg({ nullable: true }),
  },
  resolve: (parent, { searchString }, ctx) => {
    return ctx.prisma.pack.findMany({
      where: {
        title: { contains: searchString },
      },
    })
  },
})

export const getMyPacks = queryField('getMyPacks', {
  type: 'Pack',
  list: true,
  args: {
    searchString: stringArg({ nullable: true }),
  },
  resolve: (parent, { searchString }, ctx) => {
    const userId = getUserId(ctx)

    return ctx.prisma.pack.findMany({
      where: {
        AND: [
          { authorId: userId },
          { title: { contains: searchString } }
        ]
      },
    })
  },
})

export const getPackById = queryField('getPackById', {
  type: 'Pack',
  nullable: true,
  args: { id: intArg() },
  resolve: (parent, { id }, ctx) => {
    const test = ctx.prisma.pack.findOne({
      where: {
        id: Number(id),
      },
    })

    return ctx.prisma.pack.findOne({
      where: {
        id: Number(id),
      },
    })
  },
})

export const getPackByHash = queryField('getPackByHash', {
  type: 'Pack',
  nullable: true,
  args: { hash: stringArg() },
  resolve: (parent, { hash }, ctx) => {
    return ctx.prisma.pack.findOne({
      where: {
        hash: hash,
      },
    })
  },
})
