import { intArg, mutationField, stringArg } from '@nexus/schema'
import { hash } from 'bcryptjs'

import { getUserId } from '../../utils'
import moment from 'moment'

export const createPack = mutationField('createPack', {
  type: 'Pack',
  args: {
    title: stringArg({ required: true }),
    description: stringArg({ nullable: true }),
    timeout: intArg({ nullable: true }),
  },
  resolve: async (parent, { title, description, timeout }, ctx) => {
    const userId = getUserId(ctx)
    const hashedTitle = await hash(title, 10)

    return ctx.prisma.pack.create({
      data: {
        hash: hashedTitle,
        title,
        description,
        timeout,
        author: { connect: { id: userId } },
      },
    })
  },
})

export const updatePack = mutationField('updatePack', {
  type: 'Pack',
  args: {
    id: intArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ nullable: true }),
    timeout: intArg({ nullable: null }),
  },
  resolve: (parent, { id, title, description, timeout }, ctx) => {
    return ctx.prisma.pack.update({
      data: {
        title,
        description,
        timeout,
      },
      where: { id }
    })
  },
})

export const deletePack = mutationField('deletePack', {
  type: 'Pack',
  nullable: true,
  args: { id: intArg({ nullable: false }) },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.pack.update({
      data: { deletedAt: moment().format() },
      where: { id },
    })
  },
})

export const publishPack = mutationField('publishPack', {
  type: 'Pack',
  nullable: true,
  args: { id: intArg() },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.pack.update({
      where: { id },
      data: { isPublished: true },
    })
  },
})
