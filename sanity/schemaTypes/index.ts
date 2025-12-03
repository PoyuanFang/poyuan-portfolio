import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import experience from './experience'
import skillSet from './skillSet'

export const schemaTypes: SchemaTypeDefinition[] = [project, experience, skillSet]
