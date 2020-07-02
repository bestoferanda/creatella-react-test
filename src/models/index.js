import { types } from 'mobx-state-tree';

import ProductListModel, { defaultProductListModelSnapshot } from './ProductListModel';

const RootModel = types
  .model({
    productsList: types.optional(ProductListModel, defaultProductListModelSnapshot)
  })

export default RootModel;