import React, { Component } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import BaseComponent from "../../components/BaseComponent";
import Styles from "../Styles";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import colors from "../../assets/colors";
import { getAllCalendars } from "../../databases/Calendar";

const screenWidth = Dimensions.get("window").width;
const DateTimeUtls = require('../../utils/DatetimeUtls')
const FIRST_WEEK = 7;
const DISPLAY_TITLE_CHART_WEEK = ' Week Previous'
const DISPLAY_TITLE_CHART_WEEKS = ' Weeks Previous'

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

        this.state = {
            lstWeight: [],
            displayData: this._getData([], FIRST_WEEK),
            displayedDays: FIRST_WEEK, // display number of previous from now
            lstWeightDisplay: [], // get List Weights in a week
            displayTitleChart: (FIRST_WEEK / FIRST_WEEK) + DISPLAY_TITLE_CHART_WEEK,
            isNext: false,
            isShow: false,
        }
    }

    componentDidMount() {
        this._onLoadData();
        this._onResume;
    }

    componentWillUnmount() {
        this._onResume();
    }

    _onResume = this.props.navigation.addListener('focus', () => {
        this._onLoadData();
    });

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

        let minValue = 200;
        let maxValue = 0;
        sortedListWeigh.forEach(item => {
            const days = DateTimeUtls.calculateDaysFromNow(item.date);
            if ((days < numWeeks) && (days >= numWeeks - 7)) {
                const date = new Date(item.date);
                selectedListWeightLabel.push(date.getDate() + '/' + (date.getMonth() + 1));
                selectedListWeightData.push(item.weight);
                if (item.weight > maxValue) {
                    maxValue = item.weight;
                }
                if (item.weight < minValue) {
                    minValue = item.weight;
                }
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
                },
                {
                    data: [minValue > 10 ? minValue - 10 : minValue],
                    color: () => 'white',
                },
                {
                    data: [maxValue + 10],
                    color: () => 'white',
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

    _onLoadData = () => {
        getAllCalendars().then(result => {
            const lstWeightDisplay = this._getListWeights(result, FIRST_WEEK);
            this.setState({
                lstWeightDisplay,
                lstWeight: result,
                displayData: this._getData(result, FIRST_WEEK),
                isShow: lstWeightDisplay.length > 0,
            })
        }).catch(error => console.log(error));
    }

    componentDidMount() {
        this._onLoadData()
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