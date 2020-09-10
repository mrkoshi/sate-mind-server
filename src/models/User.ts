import { objectType } from '@nexus/schema'

export const UserVote = objectType({
  name: 'UserVote',
  definition(t) {
    t.model.pack()
    t.model.user()
    t.model.like()
    t.model.dislike()
  },
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.name()
    t.model.password()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
    t.model.packs({ pagination: false })
    t.model.lobbyUsers({ pagination: false })
    t.model.packVotes({ pagination: false })
  },
})
