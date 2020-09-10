import { intArg, queryField } from '@nexus/schema'

export const getRounds = queryField('getRounds', {
  type: 'Round',
  list: true,
  args: {
    packId: intArg({ required: true }),
  },
  resolve: (parent, { packId }, ctx) => {
    return ctx.prisma.round.findMany({
      where: { packId },
    })
  },
})

export const getRoundById = queryField('getRoundById', {
  type: 'Round',
  nullable: true,
  args: {
    packId: intArg({ required: true }),
    id: intArg({ required: true })
  },
  resolve: async (parent, { packId, id }, ctx) => {
    const pack = ctx.prisma.pack.findOne({ where: { id: packId } })
    const rounds = await pack.rounds({ where: { id } })

    return pack && rounds.length ? rounds[0] : null
  },
})
