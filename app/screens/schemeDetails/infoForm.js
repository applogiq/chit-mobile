//This is a form
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
/**************************************** Import components ***********************************************************/

const ChitInfoForm = () => {
    const { height, width } = useWindowDimensions();

    const font = useWindowDimensions().fontScale;
    return (
        <View style={[styles.container, { height: height * (50 / 100) }]}>
            <View>
                <Text style={styles.titleOne}>Beneficiary Name</Text>
                <Text style={styles.titleTwo}>Karthik kannan</Text>
            </View>
            <View>
                <Text style={styles.titleOne}>Total Months</Text>
                <Text style={styles.titleTwo}>15 Months</Text>
            </View>
            <View>
                <Text style={styles.titleOne}>Membership No</Text>
                <Text style={styles.titleTwo}>08534682</Text>
            </View>
            <View>
                <Text style={styles.titleOne}>Group Code</Text>
                <Text style={styles.titleTwo}>GAV0210</Text>
            </View>
            <View>
                <Text style={styles.titleOne}>Branch</Text>
                <Text style={styles.titleTwo}>Tirupur</Text>
            </View>
            <View>
                <Text style={styles.titleOne}>Monthly Installment</Text>
                <Text style={styles.titleTwo}>₹1500</Text>
            </View>
            <View>
                <Text style={styles.titleOne}>Next Due</Text>
                <Text style={styles.titleTwo}>May 20,2022</Text>
            </View>

        </View>
    )

};
const styles = StyleSheet.create({
    container: {
        width: "100%", backgroundColor: "white", borderRadius: 7, paddingTop: 17, paddingLeft: 17, paddingBottom: 17, justifyContent: "space-between"
    },
    titleOne: { fontFamily: "SourceSansPro-Regular", fontWeight: "400", lineHeight: 21, color: "rgba(65, 39, 15, 0.8)" },
    titleTwo: { fontFamily: "SourceSansPro-SemiBold", fontWeight: "600", lineHeight: 21, color: "rgba(65, 39, 15, 0.8)", fontSize: 17 }
});
export default ChitInfoForm;