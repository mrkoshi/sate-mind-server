import { objectType } from '@nexus/schema'

export const Question = objectType({
  name: 'Question',
  definition(t) {
    t.model.id()
    t.model.hash()
    t.model.category()
    t.model.text()
    t.model.answer()
    t.model.price()
    t.model.type()
    t.model.timeout()
    t.model.image()
    t.model.imageAnswer()
    t.model.audio()
    t.model.createdAt()
    t.model.deletedAt()
  },
})
