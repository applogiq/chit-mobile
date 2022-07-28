import React, { useState } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, useWindowDimensions, Image, TouchableOpacity } from 'react-native';

//import CalendarPicker from the package we installed
import CalendarPicker from 'react-native-calendar-picker';
import { IMAGES } from "../../common/images";

const CalendarComponent = ({ start, end, setdates, handlemodal }) => {

    const [selectedStartDate, setSelectedStartDate] = useState(start);
    const [selectedEndDate, setSelectedEndDate] = useState(end);
    const { height, width } = useWindowDimensions();
    const onDateChange = (date, type) => {
        //function to handle the date change

        if (type === 'END_DATE' && date != null) {

            const newdate = new Date(date)
            const endyear = newdate.getFullYear()
            const endmonth = newdate.getMonth() + 1
            const endday = newdate.getDate()

            setSelectedEndDate(endday + "/" + endmonth + "/" + endyear);
        } else if ((type === 'START_DATE' && date != null)) {

            const newdate = new Date(date)
            const startyear = newdate.getFullYear()
            const startmonth = newdate.getMonth() + 1
            const startday = newdate.getDate()

            setSelectedStartDate(startday + "/" + startmonth + "/" + startyear);

        }
    };
    const onApply = () => {
        setdates(selectedStartDate, selectedEndDate)
        handlemodal()
    }
    return (
        <SafeAreaView>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingLeft: 15, paddingRight: 15, marginTop: "5%" }}>
                <View  >
                    <Text style={styles.topText}>From</Text>
                    <View style={{ height: height * (4.5 / 100), width: width * (40 / 100), backgroundColor: "white", borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 5, paddingRight: 5, marginTop: "5%" }} >
                        <Text style={[styles.topText, { fontFamily: "SourceSansPro-Regular" }]}>{selectedStartDate}</Text>
                        <Image resizeMode="contain" style={{ height: 15, width: 15 }} source={IMAGES.calendar}></Image>
                    </View>

                </View>
                <View>
                    <Text style={styles.topText}>To</Text>
                    <View style={{ height: height * (4.5 / 100), width: width * (40 / 100), backgroundColor: "white", borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 5, paddingRight: 5, marginTop: "5%" }} >
                        <Text style={[styles.topText, { fontFamily: "SourceSansPro-Regular" }]}>{selectedEndDate}</Text>
                        <Image resizeMode="contain" style={{ height: 15, width: 15 }} source={IMAGES.calendar}></Image>
                    </View>
                </View>
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                <View style={{ backgroundColor: "white", marginTop: 20, borderRadius: 5 }}>
                    <CalendarPicker

                        selectedRangeStyle={{ backgroundColor: "rgba(213, 186, 143, 1)" }}
                        width={width * (86 / 100)}
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={new Date(2018, 1, 1)}
                        maxDate={new Date(2050, 6, 3)}
                        weekdays={
                            [
                                'M',
                                'T',
                                'W',
                                'T',
                                'F',
                                'S',
                                'S'
                            ]}
                        months={[
                            'January',
                            'Febraury',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ]}

                        previousTitle="<"
                        nextTitle=">"

                        todayBackgroundColor="rgba(213, 186, 143, 1)"
                        selectedRangeStartTextStyle={{ color: "white" }}
                        scaleFactor={375}
                        selectedRangeEndTextStyle={{ color: "white" }}
                        textStyle={{
                            fontFamily: 'SemiBold-SemiBold',
                            color: 'rgba(65, 39, 15, 0.8)', fontWeight: "700"
                        }}
                        onDateChange={onDateChange}

                        previousComponent={
                            <Image resizeMode="contain" style={{ height: 15, width: 15 }} source={IMAGES.chev_left}></Image>

                        }
                        nextComponent={
                            <Image resizeMode="contain" style={{ height: 15, width: 15 }} source={IMAGES.chev_right}></Image>

                        }

                    />

                </View>
            </View>
            <TouchableOpacity onPress={() => onApply()} style={[styles.button, { width: width * (87 / 100) }]}>
                <Text style={{ color: "white" }}>Apply</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
export default CalendarComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#ffffff',
        padding: 16,
    },
    textStyle: {
        marginTop: 10,
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20,
    },
    topText: {
        color: "rgba(65, 39, 15, 0.8)",
        fontFamily: "SourceSansPro-SemiBold", fontWeight: "600", lineHeight: 21, fontSize: 16
    },
    button: { height: "10%", backgroundColor: "rgba(213, 186, 143, 1)", borderRadius: 7, marginTop: "8%", alignItems: "center", justifyContent: "center", alignSelf: "center" }
});