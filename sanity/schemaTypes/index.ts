import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import banner from './banner'
import article from './article'
import video from './video'
import category from './category'
import order from './order'
import bannerQC from './bannerQC'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, banner, article, video, category, order, bannerQC],
}
