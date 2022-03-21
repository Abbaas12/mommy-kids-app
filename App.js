import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useNetInfo } from "@react-native-community/netinfo";

import AuthContext from "./auth/context";
import authStorage from "./auth/storage";

import LoginScreen from "./screens/users/LoginScreen";
import Main from "./navigations/Main";
import Header from "./components/Header";
import Screen from "./components/Screen";
import OfflineNotice from "./components/OfflineNotice";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const netInfo = useNetInfo();

  const restoreToken = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    setIsReady(true);
    restoreToken();

    return () => {
      setIsReady(false);
    };
  }, []);

  if (!isReady) return <AppLoading />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Screen>
          {user ? (
            <>
              <Header />
              {netInfo.type !== "unknown" &&
              netInfo.isInternetReachable === false ? (
                <OfflineNotice />
              ) : (
                <Main />
              )}
            </>
          ) : (
            <LoginScreen />
          )}
        </Screen>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
