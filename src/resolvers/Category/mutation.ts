import { hash } from 'bcryptjs'
import { intArg, stringArg, mutationField } from '@nexus/schema'
import moment from 'moment'

export const createCategory = mutationField('createCategory', {
  type: 'Category',
  args: {
    title: stringArg({ required: true }),
    roundId: intArg({ nullable: true }),
    description: stringArg({ nullable: true }),
  },
  resolve: async (parent, { title, roundId, description }, ctx) => {
    const hashedTitle = await hash(title, 10)

    return ctx.prisma.category.create({
      data: {
        hash: hashedTitle,
        title,
        description,
        round: { connect: { id: roundId } },
      },
    })
  },
})

export const updateCategory = mutationField('updateCategory', {
  type: 'Category',
  args: {
    id: intArg({ required: true }),
    title: stringArg({ required: true }),
    description: stringArg({ nullable: true }),
  },
  resolve: (parent, { id, title, description }, ctx) => {
    return ctx.prisma.category.update({
      data: {
        title,
        description
      },
      where: { id }
    })
  },
})

export const deleteCategory = mutationField('deleteCategory', {
  type: 'Category',
  nullable: true,
  args: { id: intArg({ required: true }) },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.category.update({
      data: { deletedAt: moment().format() },
      where: { id },
    })
  },
})
