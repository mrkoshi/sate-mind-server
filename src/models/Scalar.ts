import { asNexusMethod, enumType, scalarType } from '@nexus/schema'

import { GraphQLDate } from 'graphql-iso-date'
import { GraphQLUpload } from 'graphql-upload'

enum PackStatusType {
  draft = 'draft',
  published = 'published',
  completed = 'completed'
}

export const PackStatus = scalarType({
  name: 'PackStatus',
  asNexusMethod: 'packStatus',
  parseValue(value: PackStatusType): PackStatusType {
    if (PackStatusType[value]) {
      return value
    }
  },
  serialize(value) {
    return value
  },
})

enum QuestionTypeType {
  default = 'default',
  cat = 'cat',
  auction = 'auction'
}

export const QuestionType = scalarType({
  name: 'QuestionType',
  asNexusMethod: 'questionType',
  parseValue(value: QuestionTypeType): QuestionTypeType {
    if (QuestionTypeType[value]) {
      return value
    }
  },
  serialize(value) {
    return value
  },
})

export const Upload = GraphQLUpload
export const DateTime = GraphQLDate
export const GQLDate = asNexusMethod(GraphQLDate, 'date')
