//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import { Text, View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
/**************************************** Import components ***********************************************************/

const SchemeTransactions = ({ hidetitle }) => {
    const Data = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
    ];

    const font = useWindowDimensions().fontScale;
    const { height, width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            {hidetitle ? <View></View> : <Text style={styles.title}>Transactions</Text>}


            <FlatList
                data={Data}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 0.5,
                            backgroundColor: 'grey',
                            width: '100%', marginLeft: "-5%"
                        }}></View>
                )}
                scrollEnabled={true}
                snapToAlignment="center"
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                height: height * (10 / 100),
                                width: '100%',
                                paddingTop: '2%',
                                paddingRight: '3%',
                                paddingLeft: '1%',
                            }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        fontSize: font * 14,
                                        color: 'rgba(65, 39, 15, 0.8)',
                                        fontWeight: '600',
                                        fontFamily: 'SourceSansPro-SemiBold',
                                    }}>
                                    13 may 2022
                                </Text>
                                <Text
                                    style={{
                                        fontSize: font * 14,
                                        color: 'rgba(65, 39, 15, 0.8)',
                                        fontWeight: '600',
                                        fontFamily: 'SourceSansPro-SemiBold',
                                        marginLeft: width * (50 / 100),
                                    }}>
                                    ₹1022
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                                <Text
                                    style={{
                                        fontSize: font * 13,
                                        color: 'rgba(65, 39, 15, 0.5)',
                                        fontWeight: '600',
                                        fontFamily: 'SourceSansPro-SemiBold',
                                    }}>
                                    Golden Harvest
                                </Text>
                                <Text
                                    style={{
                                        fontSize: font * 23,
                                        color: 'rgba(65, 39, 15, 0.8)',
                                        fontWeight: '600',
                                        fontFamily: 'SourceSansPro-SemiBold',
                                        marginLeft: width * (1 / 100),
                                        marginTop: height * (-1.5 / 100),
                                    }}>
                                    .
                                </Text>
                                <Text
                                    style={{
                                        fontSize: font * 13,
                                        color: 'rgba(65, 39, 15, 0.5)',
                                        fontWeight: '600',
                                        fontFamily: 'SourceSansPro-SemiBold',
                                        marginLeft: width * (1 / 100),
                                    }}>
                                    GAV0210
                                </Text>
                            </View>
                        </View>
                    );
                }}></FlatList>
        </View>
    )
        ;
};
const styles = StyleSheet.create({
    container: {

        width: "100%", backgroundColor: "white", borderRadius: 7, paddingTop: 17, paddingLeft: 17, paddingBottom: 17
    },
    title: { fontFamily: "SourceSansPro-SemiBold", fontWeight: "600", lineHeight: 21, color: "rgba(65, 39, 15, 0.8)", fontSize: 17 }
});
export default SchemeTransactions;