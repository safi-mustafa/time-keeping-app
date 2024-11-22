import React, { useEffect, useRef } from "react";
import { Alert, AppState, Platform } from "react-native";
import Constants from "expo-constants";
import * as Linking from "expo-linking";

import axios from "../api-client";
import { API_BASE_URL } from "../constants";

function UpdateNeeded() {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    validateVersionUpdate();
    return () => {};
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        validateVersionUpdate();
      }

      appState.current = nextAppState;
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const validateVersionUpdate = () => {
    axios.get(`${API_BASE_URL}/UpdateStatus`).then(
      ({ data }) => {
      console.log("🚀 ~ file: UpdateNeeded.jsx:48 ~ validateVersionUpdate ~ data:", data?.data)
        onVersionCheck(data?.data);
      },
      (errors) => {
        console.log(
          "🚀 ~ file: UpdateNeeded.jsx:43 ~ axios.get ~ errors:",
          errors
        );
      }
    );
  };

  const openAppStore = () => {
    const storeUrl =
      Platform.OS === "ios"
        ? "https://apps.apple.com/us/app/employee-timekeeping/id6446133604"
        : "market://details?id=com.timekeeping.lite";

    Linking.openURL(storeUrl).catch((error) =>
      console.error("An error occurred", error)
    );
  };

  const onVersionCheck = (config) => {
    let alertConfig = [
      {
        text: "Update",
        onPress: () => {
          openAppStore();
        },
      },
    ];
 
    if (!config?.isForcible) {
      alertConfig = [
        ...alertConfig,
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ];
    } else {
      alertConfig = [...alertConfig, { cancelable: false }];
    }

    if (compareVersions(Constants.expoConfig.version, config?.latestVersion)) {
      Alert.alert(
        "App Update Required",
        "Please update your app to access new features and improvements.",
        alertConfig
      );
    } else {
      console.log("No update needed");
    }
  };
  

  const compareVersions = (currentVersion, latestVersion) => {
    const v1 = currentVersion.split(".");
    const v2 = latestVersion.split(".");

    for (let i = 0; i < v1.length; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i] || 0);

      if (num2 > num1) {
        return true;
      } else if (num2 < num1) {
        return false;
      }
    }

    return false; // Versions are equal
  };

  return (
    <>
    </>
  );
}

export default UpdateNeeded;
