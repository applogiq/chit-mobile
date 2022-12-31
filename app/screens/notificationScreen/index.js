import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image, useWindowDimensions, StatusBar, TouchableOpacity } from 'react-native'
import { Divider } from "react-native-paper";
import { IMAGES } from '../../common/images'
const NotificationScreen = ({navigation}) => {
    const [selected, setSelected] = useState('')
    const updateStates = () => {
        setSelected()
    }
    const Data = [
        {
            id: 1,
            time: "09:15am",
            date: "June 2022",
            text: "Your password has been successfully changed.",
            img: IMAGES.Dot,
            highlighted:true
        },
        {
            id: 2,
            time: "09:15am",
            date: "June 2022",
            text: "Your request for joining new scheme has been accepted.",
            img:IMAGES.Dot,
            highlighted:false
        },
        {
            id: 3,
            time: "09:15am",
            date: "June 2022",
            text: "Your password has been successfully changed.",
            highlighted:true
        },
        {
            id: 3,
            time: "09:15am",
            date: "June 2022",
            text: "New scheme alert - checkout our new scheme on plans",
            highlighted:false
        },

    ]
    const renderItem = ({ item }) => {
        return (
            <View style={styles.flatlistView}>
                <TouchableOpacity onPress={() => setSelected(item.id)}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.container}>
                            {item.highlighted == true ? <Image source={IMAGES.Dot} style={styles.icon} /> : null  }
                            <View>
                                <Text style={styles.bodyText}>{item.text}</Text>
                            </View>
                        </View>
                        <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Divider style={styles.Divider} />
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <View style={styles.totalView}>
            <StatusBar backgroundColor={"#E5E5E5"} />
            <View style={styles.upperView}>
                <Pressable onPress={()=>navigation.navigate('HomeScreen')}>
                    <Image source={IMAGES.chev_left}
                        style={styles.chevLeft} />
                </Pressable>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
            <FlatList
                data={Data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    timeText:{
      fontSize:14,
      fontWeight:'400',
      fontFamily:'SourceSansPro-SemiBold',
      lineHeight:24,
      color:"#41270FCC"
    },
    dotIcon:{
        backgroundColor:'red'
    },
    flatlistView: {
        paddingTop: 20
    },
    Divider: {
        height: 1,
        width: 400,
        color: '#41270F1A',
        borderColor: 'rgba(65, 39, 15, 0.1)',
        marginTop:15

    },
    dateText: {
        fontFamily: 'SourceSansPro-Regular',
        fontWeight: '400',
        lineHeight: 20,
        color: '#41270F80',
        paddingHorizontal: 10,
    },
    bodyText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#41270FCC',
        width: 251,
        lineHeight: 24,
        alignItems: 'center',
        fontFamily: "SourceSansPro-SemiBold-600",
        marginHorizontal: 5
    },
    icon: {
        width: 8,
        height: 8,
        marginTop: 10,
        borderRadius:50
    },
    container: {
        flexDirection: 'row',
    },
    headerText: {
        fontWeight: '600',
        fontFamily: "SourceSansPro-SemiBold-600",
        fontSize: 22,
        color: '#9D6939',
        paddingHorizontal: 25

    },
    totalView: {
        paddingHorizontal: 16,
        backgroundColor: '#E5E5E5',
        flex: 1,
        padding:10,
    
    },
    chevLeft: {
        height: 12,
        width: 6,

    },
    upperView: {
        flexDirection: 'row',
        alignItems:'center',
        
        
    }
})
export default NotificationScreen;