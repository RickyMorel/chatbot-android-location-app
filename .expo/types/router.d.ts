/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/sign-in` | `/(auth)/sign-up` | `/(tabs)` | `/(tabs)/create` | `/(tabs)/inventory` | `/(tabs)/map` | `/(tabs)/sales` | `/_sitemap` | `/create` | `/inventory` | `/map` | `/sales` | `/sign-in` | `/sign-up`;
      DynamicRoutes: `/search/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/search/[query]`;
    }
  }
}
