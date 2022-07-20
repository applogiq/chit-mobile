//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
/**************************************** Import components ***********************************************************/

const InfoCard = ({ data }) => {
    const { height, width } = useWindowDimensions();
    console.log(data, "infocard")
    const font = useWindowDimensions().fontScale;
    const pendingMonths = data?.total_month - data?.paid_month
    return (
        <View style={[styles.container, { height: height * (19 / 100), width: "100%" }]}>
            <View style={styles.divs}>
                <Text style={styles.titleOne} >Scheme Name</Text>
                <Text style={styles.titleTwo} >{data?.scheme_name}</Text>
            </View>
            <View style={[styles.divs]}>
                <Text style={[styles.titleOne, { alignSelf: "flex-end" }]} >Total Amount</Text>
                <Text style={[styles.titleTwo, { alignSelf: "flex-end" }]} >₹{data?.total_amount}</Text>
            </View>
            <View style={styles.divs}>
                <Text style={styles.titleOne} >Pending Months</Text>
                <Text style={styles.titleTwo} >{pendingMonths}</Text>
            </View>
            <View style={[styles.divs]}>
                <Text style={[styles.titleOne, { alignSelf: "flex-end" }]} >Total Grams</Text>
                <Text style={[styles.titleTwo, { alignSelf: "flex-end" }]} >{data?.collected_weight}gms</Text>
            </View>
        </View>
    )

};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(213, 186, 143, 1)", borderRadius: 8, paddingTop: 10, paddingRight: 15, paddingLeft: 15, paddingBottom: 10,
        flexDirection: "row", flexWrap: "wrap"
    },
    divs: { flexBasis: "50%", justifyContent: "space-around", height: "50%" },
    align: { alignSelf: "flex-end" },
    titleOne: { fontFamily: "SourceSansPro-Regular", fontWeight: "400", lineHeight: 21, color: "white" },
    titleTwo: { fontFamily: "SourceSansPro-SemiBold", fontWeight: "600", lineHeight: 21, color: "white", fontSize: 18 }
});
export default InfoCard;