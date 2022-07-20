//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import { Text, View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
/**************************************** Import components ***********************************************************/

const SchemeTransactions = ({ hidetitle, data }) => {
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
    console.log(data, "transactionsssssss evwedy89wdv")
    return (
        <View style={styles.container}>
            {hidetitle ? <View></View> : <Text style={styles.title}>Transactions</Text>}
            {data == undefined ? <Text style={[styles.cardTitle, { fontSize: font * 15, alignSelf: "center", marginTop: "14%", marginBottom: "7%" }]} >No records found</Text> : null}
            {typeof data === "object" ? data.length < 1 ? <Text style={[styles.cardTitle, { fontSize: font * 15, alignSelf: "center", marginTop: "14%", marginBottom: "7%" }]} >No records found</Text> : null : null}
            <FlatList
                data={data}
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

                    const date = item?.created_at.substring(0, 10)
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
                                    {date}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: font * 14,
                                        color: 'rgba(65, 39, 15, 0.8)',
                                        fontWeight: '600',
                                        fontFamily: 'SourceSansPro-SemiBold',
                                        marginLeft: width * (50 / 100),
                                    }}>
                                    ₹{item?.amount}
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
                                    {item?.scheme_name}
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
                                    {item?.group_code}
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
    title: { fontFamily: "SourceSansPro-SemiBold", fontWeight: "600", lineHeight: 21, color: "rgba(65, 39, 15, 0.8)", fontSize: 17, marginBottom: "2%" }
});
export default SchemeTransactions;