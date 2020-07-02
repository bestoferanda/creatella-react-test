

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { StyleSheet, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import mapper from './mapper'
import moment from "moment";
import { Radio } from '@ui-kitten/components';
import 'mobx-react-lite/batchingForReactNative'
import { baseURL } from '../../config/URL'

@inject(mapper)
@observer
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rowData: null,
            value: -1,
            loading: false
        };
    }

    loadProductList = async () => {
        this.setState({ loading: true })
        const { loadproductsList } = this.props
        await loadproductsList();
        this.setState({ loading: false })
    };

    componentDidMount() {
        this._focus = this.props.navigation.addListener(
            'willFocus',
            this.loadProductList
        );
    };

    componentWillUnmount() {
        this._focus.remove();
    }

    renderItem = ({ item, index }) => {
        const showBanner = (index + 1) % 10 == 0
        return (
            <View style={styles.rowMain} >
                <View style={styles.viewStyle}>
                    <Text style={{ fontSize: item.size, padding: 5 }}>{item.face}</Text>
                    <Text style={styles.textPadding}>ID : {item.id}</Text>
                    <Text style={styles.textPadding}>Size : {item.size}</Text>
                    <Text style={styles.textPadding}>Price ($): {item.price.toFixed(2)}</Text>
                    <Text style={styles.textPadding}>Added on : {(moment().diff(moment(item.date), 'days') > 7) ? moment(item.date).format('LLL') : moment(item.date).startOf('day').fromNow()}</Text>
                </View>

                {showBanner &&
                    <Image
                        style={styles.addImage}
                        source={{
                            uri: baseURL + '/ads/?r=' + Math.floor(Math.random() * 1000)
                        }}
                    />
                }
            </View>
        )
    }


    keyExtractor = (item, index) => item.id

    render() {
        const { loading, value } = this.state
        const { productList, productsBySize, productsById, productsByPrice } = this.props
        return (
            <View style={styles.list}>
                {loading ?
                    <ActivityIndicator size="large" color="#0000ff" />
                    :
                    <View style={styles.mainViewStyle}>
                        <Text style={{ fontSize: 24, padding: 10 }}>Sort products by</Text>
                        <View style={styles.container}>

                            <Radio
                                style={styles.radio}
                                checked={this.state.value == 1}
                                onChange={nextChecked => { this.setState({ value: 1 }) }}>
                                Price
                                </Radio>

                            <Radio
                                style={styles.radio}
                                checked={this.state.value == 2}
                                onChange={nextChecked => { this.setState({ value: 2 }) }}>
                                Size
                                </Radio>

                            <Radio
                                style={styles.radio}
                                checked={this.state.value == 3}
                                onChange={nextChecked => { this.setState({ value: 3 }) }}>
                                Id
                                </Radio>

                            <Radio
                                style={styles.radio}
                                checked={this.state.value == 4}
                                onChange={nextChecked => { this.setState({ value: 4 }) }}>
                                Reload
                                </Radio>

                        </View>

                        <FlatList
                            keyboardDismissMode='interactive'
                            keyboardShouldPersistTaps='always'
                            style={styles.list}
                            data={value === 1 ? productsByPrice : value === 2 ? productsBySize : value === 3 ? productsById : productList}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor} />
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    body: {
        flexDirection: 'column'
    },
    mainViewStyle: {
        flex: 1,
    },
    scrollStyle: {
        flexGrow: 1
    },
    buttonView: {
        alignItems: 'flex-end',
        padding: 10
    },
    list: {
        flex: 1,
        padding: 10
    },
    rowMain: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        padding: 10
    },
    textPadding: {
        padding: 5
    },
    viewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    addImage: {
        width: 200,
        height: 150,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'gray'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    radio: {
        margin: 5
    },
});