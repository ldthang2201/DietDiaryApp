import React, { Component } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../../assets/colors";

const screenWidth = Dimensions.get("window").width;
const DateTimeUtls = require('../../utils/DatetimeUtls')
const FIRST_WEEK = 7;
const DISPLAY_TITLE_CHART_WEEK = ' Week Previous'
const DISPLAY_TITLE_CHART_WEEKS = ' Weeks Previous'

const lstWeight = [
    {
        id: 1,
        date: '2021-10-22',
        weight: 80,
    },
    {
        id: 2,
        date: '2021-10-21',
        weight: 81,
    },
    {
        id: 3,
        date: '2021-10-20',
        weight: 83,
    },
    {
        id: 4,
        date: '2021-10-19',
        weight: 83,
    },
    {
        id: 5,
        date: '2021-10-18',
        weight: 84,
    },
    {
        id: 6,
        date: '2021-10-17',
        weight: 83,
    },
    {
        id: 7,
        date: '2021-10-16',
        weight: 82,
    },
    {
        id: 8,
        date: '2021-10-15',
        weight: 83,
    },
    {
        id: 9,
        date: '2021-10-14',
        weight: 84,
    },
    {
        id: 10,
        date: '2021-10-13',
        weight: 85,
    },
    {
        id: 11,
        date: '2021-10-12',
        weight: 86,
    },
    {
        id: 12,
        date: '2021-10-11',
        weight: 87,
    },
]

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

export default class ChartScreen extends BaseComponent {

    constructor(props) {
        super(props);

        const lstWeightDisplay = this._getListWeights(lstWeight, FIRST_WEEK);

        this.state = {
            lstWeight: lstWeight,
            displayData: this._getData(lstWeight, FIRST_WEEK),
            displayedDays: FIRST_WEEK, // display number of previous from now
            lstWeightDisplay, // get List Weights in a week
            displayTitleChart: (FIRST_WEEK / FIRST_WEEK) + DISPLAY_TITLE_CHART_WEEK,
            isNext: false,
            isShow: lstWeightDisplay.length > 0,
        }
    }

    // get data of weight sorted
    _getListWeights = (lstWeight, numWeeks) => {
        let newListWeight = [];
        let sortedListWeigh = lstWeight;
        sortedListWeigh.sort((a, b) => a.date > b.date);
        sortedListWeigh.forEach(item => {
            const days = DateTimeUtls.calculateDaysFromNow(item.date);
            if ((days < numWeeks) && (days >= numWeeks - 7)) {
                newListWeight.push(item);
            }
        })

        return newListWeight;
    }

    // get data display into chart
    _getData = (lstWeight, numWeeks) => {
        let sortedListWeigh = lstWeight;
        // sort by date latest to newest
        sortedListWeigh.sort((a, b) => a.date > b.date)

        let selectedListWeightLabel = [];
        let selectedListWeightData = [];
        sortedListWeigh.forEach(item => {
            const days = DateTimeUtls.calculateDaysFromNow(item.date);
            if ((days < numWeeks) && (days >= numWeeks - 7)) {
                const date = new Date(item.date);
                selectedListWeightLabel.push(date.getDate() + '/' + (date.getMonth() + 1));
                selectedListWeightData.push(item.weight);
            }
        })

        if (selectedListWeightData.length === 0) {
            selectedListWeightData.push(100)
        }

        const data = {
            labels: selectedListWeightLabel,
            datasets: [
                {
                    data: selectedListWeightData,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2 // optional  
                }
            ],
        };

        return data;
    }

    _subWeek = () => {
        this.setState(previousState => {
            const newWeeks = previousState.displayedDays + FIRST_WEEK;
            const newListWeight = this._getListWeights(previousState.lstWeight, newWeeks)
            return {
                displayTitleChart: (newWeeks / FIRST_WEEK) + DISPLAY_TITLE_CHART_WEEKS,
                displayedDays: newWeeks,
                displayData: this._getData(previousState.lstWeight, newWeeks),
                lstWeightDisplay: newListWeight,
                isNext: true,
                isShow: newListWeight.length > 0
            }
        })
    }

    _addWeek = () => {
        this.setState(previousState => {
            const newWeeks = previousState.displayedDays - FIRST_WEEK;
            const newListWeight = this._getListWeights(previousState.lstWeight, newWeeks)
            return {
                displayTitleChart: newWeeks === FIRST_WEEK ? (newWeeks / FIRST_WEEK) + DISPLAY_TITLE_CHART_WEEK : (newWeeks / FIRST_WEEK) + DISPLAY_TITLE_CHART_WEEKS,
                displayedDays: newWeeks,
                displayData: this._getData(previousState.lstWeight, newWeeks),
                lstWeightDisplay: newListWeight,
                isNext: newWeeks === FIRST_WEEK ? false : true,
                isShow: newListWeight.length > 0
            }
        })
    }

    render() {
        return (
            <View style={Styles.container_center_top}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={this._subWeek}>
                        <Image
                            source={require('../../assets/icons/left-arrow.png')}
                            style={Styles.arrow} />
                    </TouchableOpacity>
                    <Text style={Styles.log_home_title}>{this.state.displayTitleChart}</Text>
                    <TouchableOpacity onPress={this.state.isNext ? this._addWeek : null}
                        activeOpacity={this.state.isNext ? 0.2 : 1}>
                        <Image
                            source={require('../../assets/icons/right-arrow.png')}
                            style={this.state.isNext ? Styles.arrow : { margin: 10, width: 20, height: 20, tintColor: colors.disable }} />
                    </TouchableOpacity>
                </View>
                {this.state.isShow &&
                    <View style={{ alignItems: 'center' }}>
                        <LineChart
                            data={this.state.displayData}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                        />
                        <Text style={Styles.log_home_title}>History of your weight</Text>
                        <FlatList
                            style={{ marginBottom: 70 }}
                            data={this.state.lstWeightDisplay}
                            renderItem={({ item, index }) => {
                                return (<HistoryWeightItem item={item} index={index} />);
                            }} />
                    </View>}
                {!this.state.isShow &&
                    <View style={Styles.container_center_top}>
                        <Text style={{ margin: 20, fontSize: 18 }}>No record </Text>
                    </View>
                }
            </View>

        )
    }
}

function HistoryWeightItem(props) {
    return (
        <View style={Styles.history_weight_item_container}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Image source={require('../../assets/icons/weight.png')} style={Styles.history_weight_item_icon} />
                <Text style={Styles.history_weight_item_value}>{props.item.weight} KG</Text>
            </View>
            <Text>{props.item.date}</Text>
        </View>
    )
}