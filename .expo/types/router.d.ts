/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/create-client` | `/(auth)/create-client-location-screen` | `/(auth)/create-sale` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(screens)` | `/(tabs)` | `/(tabs)/map` | `/(tabs)/sales` | `/(tabs)/stock` | `/LoadingProvider` | `/Utils` | `/_sitemap` | `/colors` | `/create-client` | `/create-client-location-screen` | `/create-sale` | `/firebaseConfig` | `/globalVars` | `/map` | `/popups/GenericPopup` | `/popups/popupProvider` | `/sales` | `/sign-in` | `/sign-up` | `/stock`;
      DynamicRoutes: `/search/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/search/[query]`;
    }
  }
}
