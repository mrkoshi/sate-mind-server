import { intArg, mutationField, stringArg } from '@nexus/schema'

import { getUserId } from '../../utils'

export const createDraft = mutationField('createDraft', {
  type: 'Pack',
  args: {
    title: stringArg({ nullable: false }),
    content: stringArg(),
  },
  resolve: (parent, { title, content }, ctx) => {
    const userId = getUserId(ctx)

    return ctx.prisma.pack.create({
      data: {
        title,
        content,
        published: false,
        user: { connect: { id: userId } },
      },
    })
  },
})

export const deletePost = mutationField('deletePost', {
  type: 'Pack',
  nullable: true,
  args: { id: intArg({ nullable: false }) },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.pack.delete({
      where: {
        id,
      },
    })
  },
})

export const publish = mutationField('publish', {
  type: 'Pack',
  nullable: true,
  args: { id: intArg() },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.pack.update({
      where: { id },
      data: { status: 'published' },
    })
  },
})
