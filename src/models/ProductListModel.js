import { types, flow } from 'mobx-state-tree'
import { values } from 'mobx'
import { get, isError, orderBy} from 'lodash'
import { baseURL } from '../config/URL'

const ProductModel = types
    .model({
        id: types.identifier,
        size: types.optional(types.number, 0),
        price: types.optional(types.number, 0),
        face: types.optional(types.string, ''),
        date: types.optional(types.string, '')
    })


const ProductListModel = types
    .model({
        productMap: types.optional(types.map(ProductModel), {}),
        isLoading: types.optional(types.boolean, false)
    })
    .views(self => ({
        get products() {
            return values(self.productMap)
        },
        get productsBySize() {
            return orderBy(values(self.productMap), ['size'], ['asc']);
        },
        get productsByPrice() {
            return orderBy(values(self.productMap), ['price'], ['asc']);
        },
        get productsById() {
            return orderBy(values(self.productMap), ['id'], ['asc']);
        }
    }))
    .actions(self => ({
        load: flow(function* () {
            self._setLoading(true)
            try {
                fetch(baseURL + '/products')
                    .then(result => result.json())
                    .then(rowData => {
                        if (!isError(rowData)) {
                            self._loadProducts(rowData)
                            return true
                        }
                        else {
                            return false
                        }
                    })
            } catch (e) {
                console.log(e)
                return false
            } finally {
                self._setLoading(false)
            }
        }),
        _setLoading: (loading) => {
            self.isLoading = loading
        },

        _loadProducts: (data) => {
            data.forEach(item => {
                if (item.face) {
                    self.productMap.put({
                        id: item.id,
                        size: item.size,
                        price: item.price,
                        face: item.face,
                        date: item.date
                    })
                }
            })
        }
    }))

export const defaultProductListModelSnapshot = {
    isLoading: false
}

export default ProductListModel