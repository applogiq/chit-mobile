//This the theme provider coponent this component takes all other componets and provides with custom theming functions.
//Configure more themes here to use it in other screens.
/** ****************************** import packages  *********************************** */
import React, {createContext, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

/** ****************************** import components  *********************************** */

const RefreshContext = createContext();
const RefreshProvider = ({children}) => {
  const [refresh, setRefresh] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefresh(!refresh);
    wait(2000).then(() => setRefresh(false));
  }, []);
  return (
    <RefreshContext.Provider value={{refresh, onRefresh}}>
      {children}
    </RefreshContext.Provider>
  );
};
export {RefreshContext, RefreshProvider};
