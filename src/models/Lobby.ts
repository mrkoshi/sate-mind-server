import { objectType } from '@nexus/schema'

export const LobbyUser = objectType({
  name: 'LobbyUser',
  definition(t) {
    t.model.lobby()
    t.model.user()
    t.model.score()
  },
})

export const Lobby = objectType({
  name: 'Lobby',
  definition(t) {
    t.model.id()
    t.model.hash()
    t.model.password()
    t.model.state()
    t.model.choosingUser()
    t.model.answeringUser()
    t.model.isStarted()
    t.model.game()
    t.model.pack()
    t.model.createdAt()
    t.model.deletedAt()
  },
})
