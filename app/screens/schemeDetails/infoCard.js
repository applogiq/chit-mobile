//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
/**************************************** Import components ***********************************************************/

const InfoCard = () => {
    const { height, width } = useWindowDimensions();

    const font = useWindowDimensions().fontScale;
    return (
        <View style={[styles.container, { height: height * (19 / 100), width: "100%" }]}>
            <View style={styles.divs}>
                <Text style={styles.titleOne} >Scheme Name</Text>
                <Text style={styles.titleTwo} >Premium Gold</Text>
            </View>
            <View style={[styles.divs]}>
                <Text style={[styles.titleOne, { alignSelf: "flex-end" }]} >Total Amount</Text>
                <Text style={[styles.titleTwo, { alignSelf: "flex-end" }]} >₹15,0000</Text>
            </View>
            <View style={styles.divs}>
                <Text style={styles.titleOne} >Pending Months</Text>
                <Text style={styles.titleTwo} >06</Text>
            </View>
            <View style={[styles.divs]}>
                <Text style={[styles.titleOne, { alignSelf: "flex-end" }]} >Total Grams</Text>
                <Text style={[styles.titleTwo, { alignSelf: "flex-end" }]} >1.025 gms</Text>
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