/**************************************** Import Packages ***********************************************************/
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    Image,
    TouchableOpacity, ScrollView
} from 'react-native';
/**************************************** Import components ***********************************************************/
import { IMAGES } from '../../common/images';
import InfoCard from './infoCard';
import ChitInfoForm from './infoForm';
import SchemeTransactions from './transactions';
import { paymentFunction } from '../../utils/payment';


const SchemeDetails = ({ navigation, route }) => {
    const [paymentRes, setpaymentRes] = useState("")
    const { item, transactions } = route.params;
    const font = useWindowDimensions().fontScale;
    const { height, width } = useWindowDimensions();
    //for responsiveness

    const OnBackpress = () => {
        navigation.navigate('Chits');
    }
    console.log("route params", transactions)
    const handleRes = (res) => {
        setpaymentRes(res)
    }

    console.log(paymentRes, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ height: height * (3.5 / 100), width: width * (3.5 / 100), alignItems: "center", justifyContent: "center" }} onPress={() => OnBackpress()}>
                        <Image
                            resizeMode="stretch"
                            style={[
                                styles.backIcon,
                                { height: height * (2 / 100), width: width * (2 / 100) },
                            ]}
                            source={IMAGES.back_icon}></Image>
                    </TouchableOpacity>
                    <Text style={[styles.headerText, { fontSize: font * 22 }]}>
                        Scheme Details
                    </Text>
                </View>
                <View style={{ marginTop: "5%" }}>
                    <InfoCard data={item}></InfoCard>
                </View>
                <View style={{ marginTop: "3%" }}>
                    <ChitInfoForm data={item}></ChitInfoForm>
                </View>
                <View style={{ marginTop: "3%" }}>
                    <SchemeTransactions data={transactions} ></SchemeTransactions>
                </View>
            </ScrollView>
            <View style={styles.footer} >
                <TouchableOpacity onPress={() => paymentFunction({
                    amount: 411,
                    orederid: "order_JxXIM1xigYfGhv",
                    email: "bharath@mail.com",
                    phone: "6479024327",
                    name: "bharath",
                    Resfun: handleRes
                })} style={styles.fooButton}>
                    <Text style={styles.buttonTitle}>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(247, 246, 242, 1)',
        paddingLeft: 11,
        paddingRight: 11,
    },
    headerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
    backIcon: {},
    headerText: {
        fontFamily: 'SourceSansPro-SemiBold',
        color: '#9D6939',
        fontWeight: '600',
        marginLeft: '5%',
    },
    footer: { height: "10%", backgroundColor: "#F7F6F2", width: "100%", alignItems: "center", justifyContent: "center" },
    fooButton: { height: "65%", width: "94%", backgroundColor: "rgba(213, 186, 143, 1)", borderRadius: 7, alignItems: "center", justifyContent: "center" },
    buttonTitle: { color: "white", fontFamily: 'SourceSansPro-SemiBold', fontSize: 18 }
});
export default SchemeDetails;