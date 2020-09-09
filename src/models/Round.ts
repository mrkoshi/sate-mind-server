import { objectType } from '@nexus/schema'

export const Round = objectType({
  name: 'Round',
  definition(t) {
    t.model.id()
    t.model.pack()
    t.model.timeout()
    t.model.isFinal()
    t.model.categories({ paginate: false })
  },
})