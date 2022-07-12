/**************************************** Import Packages ***********************************************************/
import React, { useState } from 'react';
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


const SchemeDetails = props => {

    const font = useWindowDimensions().fontScale;
    const { height, width } = useWindowDimensions();
    //for responsiveness

    const OnBackpress = () => {
        props.navigation.navigate('Chits');
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => OnBackpress()}>
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
                    <InfoCard></InfoCard>
                </View>
                <View style={{ marginTop: "3%" }}>
                    <ChitInfoForm></ChitInfoForm>
                </View>
                <View style={{ marginTop: "3%" }}>
                    <SchemeTransactions></SchemeTransactions>
                </View>
            </ScrollView>
            <View style={styles.footer} >
                <TouchableOpacity style={styles.fooButton}>
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