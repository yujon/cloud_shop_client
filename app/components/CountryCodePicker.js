import React from 'react';
import {View, Text, StyleSheet, SectionList, ListView, TouchableHighlight} from "react-native";
import {List} from 'antd-mobile';
import countrySession from '../constants/countrySession';
import Icon from 'react-native-vector-icons/FontAwesome';

class CountryCodePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hideRightBar: false,
            matchSection:new Set(),
            matchItem:new Set()
        };
    };

    onPick = (item) => {
       const {onSelectCountry} = this.props;
       onSelectCountry(item.phoneCode,item.countryName);
    }
    renderItem = ({item}) =>{
        return(<TouchableHighlight onPress={() => this.onPick(item)} key={item.phoneCode}>
                <View style={[styles.sessionListItemContainer]} >
                    <Text style={[styles.sessionListItem1]}>{item.countryName}</Text>
                    <Text style={[styles.sessionListItem2]}>+{item.phoneCode}</Text>
                </View>
            </TouchableHighlight>)
       
    };
    renderSectionHeader = ({section, index}) => {
        return (<View key={index}>
            <Text style={[styles.sessionHeader]}>{section.key}</Text>
        </View>)
    };
    ItemSeparatorComponent = ({index}) => <View style={[styles.itemSeparator]}  key={index}></View>
    render(){
        // Alert.alert("" +  this.state.isShow)
        const title = this.props.title || 'No Title';
        const data = this.props.data || 'No Data';
        const sectionMapArr = [
            ['A', -1],['B', 20],['C', 47],['D', 51],['E', 59],['F', 64],['G', 78],['H', 93],['I', 104],['J', 106],['K', 119],['L', 132],['M', 146],
            ['N', 176],['O', 191],['P', 193],['Q', 198],['R', 200],['S', 205],['T', 233],['U', 247],['V', 249],['W', 251],['X', 262],['Y', 272],['Z', 288]
        ];
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const {changeShowCountryPicker} = this.props;
        return (
            <View style={[styles.container]}>
                <View style={{height:50,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{fontSize:18,color:'#000',paddingLeft:10}}>选择国家或区域</Text>
                    <Icon.Button
                      name="times"
                      backgroundColor="transparent"
                      underlayColor="transparent"
                      activeOpacity={0.8}
                      color="#000"
                      onPress={changeShowCountryPicker}
                    />
                </View>
                <View style={[styles.container2]}>
                    <SectionList
                            sections={countrySession}
                            initialNumToRender={15}
                            style={[styles.sessionList]}
                            renderSectionHeader={this.renderSectionHeader}
                            renderItem={this.renderItem}
                            ItemSeparatorComponent={this.ItemSeparatorComponent}
                        />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    },
    container2: {
        flex: 11,
        flexDirection: 'row'
    },

    sessionList: {
        flex: 1
    },
    sessionHeader: {
        backgroundColor: '#eee',
        height:30,
        paddingLeft:15,
        textAlignVertical:'center',
        fontSize:15
    },
    sessionListItemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft:15,
        paddingRight:15,
        height:50,
    },
    sessionListItem1: {
        flex: 1,
        textAlignVertical:'center'
    },
    sessionListItem2: {
        flex: 1,
        textAlign: 'right',
        color: 'red',
        textAlignVertical:'center'
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#eee'
    }
});


export default CountryCodePicker;