import { intArg, booleanArg, mutationField } from '@nexus/schema'
import moment from 'moment'

export const createRound = mutationField('createRound', {
  type: 'Round',
  args: {
    packId: intArg({ required: true }),
    isFinal: booleanArg({ nullable: true }),
    timeout: intArg({ nullable: true }),
  },
  resolve: async (parent, { packId, isFinal, timeout }, ctx) => {
    return ctx.prisma.round.create({
      data: {
        isFinal,
        timeout,
        pack: { connect: { id: packId } },
      },
    })
  },
})

export const updateRound = mutationField('updateRound', {
  type: 'Round',
  args: {
    id: intArg({ required: true }),
    timeout: intArg({ nullable: true }),
  },
  resolve: (parent, { id, timeout }, ctx) => {
    return ctx.prisma.round.update({
      data: { timeout },
      where: { id }
    })
  },
})

export const deleteRound = mutationField('deleteRound', {
  type: 'Round',
  nullable: true,
  args: { id: intArg({ required: true }) },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.round.update({
      data: { deletedAt: moment().format() },
      where: { id },
    })
  },
})
