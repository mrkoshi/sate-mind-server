import { objectType } from '@nexus/schema'

export const Pack = objectType({
  name: 'Pack',
  definition(t) {
    t.model.id()
    t.model.hash()
    t.model.author()
    t.model.title()
    t.model.status()
    t.model.rounds({ pagination: false })
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})
