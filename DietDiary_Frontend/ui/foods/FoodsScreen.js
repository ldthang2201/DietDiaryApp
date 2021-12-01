import React, { Component } from "react";
import { FlatList, Image, ScrollView, Text, TouchableHighlight, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
const colors = require('../../assets/colors');
const screenUtls = require('../../utils/ScreenNames');

export default class FoodsScreen extends BaseComponent {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;
    }

    render() {
        return (
            <View>
                <FlatList
                    data={listFoods}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={Styles.food_container}>
                                <Image source={{ uri: item.url }} style={Styles.food_image} />
                                <View style={Styles.food_details_container}>
                                    <Text style={Styles.food_details_title}>{item.name}</Text>
                                    <Text style={{ color: 'black' }}>{item.unit}</Text>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={Styles.food_details_info}>Calo: {item.calo}</Text>
                                        <Text style={Styles.food_details_info}>Protein: {item.protein}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={Styles.food_details_info}>Lipid: {item.lipid}</Text>
                                        <Text style={Styles.food_details_info}>Glucozo: {item.glucozo}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }} />
            </View>
        )
    }
}

const listFoods = [
    {
        id: 1,
        name: "Salad",
        unit: "100g",
        protein: "12 u",
        calo: '20 kcal',
        glucozo: "20s",
        lipid: '30 u',
        url: 'https://img.tastykitchen.vn/resize/764x-/2021/05/31/thuong-thuc-mon-salad-ca-chua-voi-cong-thuc-che-bi-171d.jpg',
    }, {
        id: 2,
        name: "Salad",
        unit: "100g",
        protein: "12",
        glucozo: "20s",
        calo: '20',
        lipid: '30',
        url: 'https://img.tastykitchen.vn/resize/764x-/2021/05/31/thuong-thuc-mon-salad-ca-chua-voi-cong-thuc-che-bi-171d.jpg',
    },
    {
        id: 3,
        name: "Salad",
        unit: "100g",
        protein: "12",
        glucozo: "20s",
        calo: '20',
        lipid: '30',
        url: 'https://img.tastykitchen.vn/resize/764x-/2021/05/31/thuong-thuc-mon-salad-ca-chua-voi-cong-thuc-che-bi-171d.jpg',
    },
    {
        id: 4,
        name: "Salad",
        unit: "100g",
        protein: "12",
        glucozo: "20s",
        calo: '20',
        lipid: '30',
        url: 'https://img.tastykitchen.vn/resize/764x-/2021/05/31/thuong-thuc-mon-salad-ca-chua-voi-cong-thuc-che-bi-171d.jpg',
    }, {
        id: 5,
        name: "Salad",
        unit: "100g",
        protein: "12",
        glucozo: "20s",
        calo: '20',
        lipid: '30',
        url: 'https://img.tastykitchen.vn/resize/764x-/2021/05/31/thuong-thuc-mon-salad-ca-chua-voi-cong-thuc-che-bi-171d.jpg',
    },
    {
        id: 6,
        name: "Salad",
        unit: "100g",
        protein: "12",
        glucozo: "20s",
        calo: '20',
        lipid: '30',
        url: 'https://img.tastykitchen.vn/resize/764x-/2021/05/31/thuong-thuc-mon-salad-ca-chua-voi-cong-thuc-che-bi-171d.jpg',
    },
    {
        id: 7,
        name: "Salad",
        unit: "100g",
        protein: "12",
        calo: '20',
        glucozo: "20s",
        lipid: '30',
        url: 'https://img.tastykitchen.vn/resize/764x-/2021/05/31/thuong-thuc-mon-salad-ca-chua-voi-cong-thuc-che-bi-171d.jpg',
    },
    {
        id: 8,
        name: "Salad",
        unit: "100g",
        protein: "12",
        calo: '20',
        lipid: '30',
        url: 'https://img.tastykitchen.vn/resize/764x-/2021/05/31/thuong-thuc-mon-salad-ca-chua-voi-cong-thuc-che-bi-171d.jpg',
    }
]