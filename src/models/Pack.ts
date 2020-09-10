import { objectType } from '@nexus/schema'

export const Pack = objectType({
  name: 'Pack',
  definition(t) {
    t.model.id()
    t.model.hash()
    t.model.author()
    t.model.title()
    t.model.description()
    t.model.timeout()
    t.model.isPublished()
    t.model.rounds({ pagination: false })
    t.model.userVotes({ pagination: false })
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})
