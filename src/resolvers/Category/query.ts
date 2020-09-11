import { intArg, queryField } from '@nexus/schema'

export const getCategories = queryField('getCategories', {
  type: 'Category',
  list: true,
  args: {
    roundId: intArg({ required: true }),
  },
  resolve: (parent, { roundId }, ctx) => {
    return ctx.prisma.category.findMany({
      where: { roundId },
    })
  },
})

export const getCategoryById = queryField('getCategoryById', {
  type: 'Category',
  nullable: true,
  args: {
    roundId: intArg({ required: true }),
    id: intArg({ required: true })
  },
  resolve: async (parent, { roundId, id }, ctx) => {
    const round = ctx.prisma.round.findOne({ where: { id: roundId } })
    const categories = await round.categories({ where: { id } })

    return round && categories.length ? categories[0] : null
  },
})
