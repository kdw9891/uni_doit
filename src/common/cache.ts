import { globalContext } from "./globalContext";

export const getCacheList = (cacheKey: string) => {
  return Object.assign([], globalContext.cacheDic[cacheKey]);
}

export const deleteCache = (cacheKey: string) => {
  delete globalContext.cacheDic[cacheKey];
}

export const clearCache = () => {
  globalContext.cacheDic = {};
}

export const fromCache = (cacheKey: string) => {
  if(globalContext.cacheDic.hasOwnProperty(cacheKey))
    return globalContext.cacheDic[cacheKey];

  return null;
}

export const buildCacheKey = (cacheKey: string, params: any) => {
  return `ck-${cacheKey}.${JSON.stringify(params)}`;
}