/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(tabs)` | `/(tabs)/inventory` | `/(tabs)/map` | `/(tabs)/sales` | `/(tabs)/stock` | `/_sitemap` | `/inventory` | `/map` | `/sales` | `/sign-in` | `/sign-up` | `/stock`;
      DynamicRoutes: `/search/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/search/[query]`;
    }
  }
}
