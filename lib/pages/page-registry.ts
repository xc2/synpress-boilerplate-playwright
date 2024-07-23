import { Page } from "@playwright/test";

export function createPageRegistry<T>(C: { new (page: Page): T }) {
  const s = new WeakMap<Page, T>();
  return function getPage(page: Page): T {
    const has = s.get(page);
    if (has) {
      return has;
    }

    const p = new C(page);
    s.set(page, p);
    return p;
  };
}
