import type { BaseAuthUser } from "./runtime/server/model/auth";

export interface UrlRule {
  roles: string[];
  url: string | RegExp;
  method?: string;
}

declare module "@nuxt/schema" {
  interface RuntimeConfig {
    editableContent: {
      storageKey?: string;
      styled?: boolean;
      suiProse?: boolean;
      auth: {
        initUsers: BaseAuthUser[];
        routeRules: UrlRule[];
      };
    };
  }
}

export {};
