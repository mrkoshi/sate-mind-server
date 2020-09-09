import { asNexusMethod, enumType, scalarType } from '@nexus/schema'

import { GraphQLDate } from 'graphql-iso-date'
import { GraphQLUpload } from 'graphql-upload'

enum QuestionTypeEnum {
  default = 'default',
  cat = 'cat',
  auction = 'auction'
}

export const QuestionType = scalarType({
  name: 'QuestionType',
  asNexusMethod: 'questionType',
  parseValue(value: QuestionTypeEnum): QuestionTypeEnum {
    if (QuestionTypeEnum[value]) {
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
