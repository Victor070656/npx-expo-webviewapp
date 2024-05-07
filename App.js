import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { useEffect, useRef } from "react";

export default function App() {
  const ref = useRef(null);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (ref.current) {
          ref.current.goBack();
          return true;
          // prevent default exiting app
        }
        return false;
        // Default behaviour (exit app if no history or webview)
      }
    );
    return () => backHandler.remove();
    // cleanup listener on component unmount
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
        <StatusBar style="light" />
        <WebView
          ref={ref}
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          source={{ uri: "http://192.168.0.167/royal-educity" }}
          onNavigationStateChange={(navState) => {
            console.log(navState.url);
            ref.current.canGoBack = navState.canGoBack;
          }}
          startInLoadingState={() => (
            <View style={{ flex: 1, backgroundColor: "#140342" }}>
              <ActivityIndicator size={"large"} color={"#fff"} />
            </View>
          )}
          javaScriptEnabled={true}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140342",
  },
});
