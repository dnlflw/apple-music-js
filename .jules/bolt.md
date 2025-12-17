# Bolt's Journal

## 2025-05-22 - [Optimizing List Re-renders]
**Learning:** React `PureComponent` optimization requires not just changing the component, but ensuring all props passed to it are referentially stable. I found that `AlbumButton` was being passed a new `onClick` function on every render, which defeated `PureComponent`.
**Action:** When converting to `PureComponent` or `React.memo`, always audit props for unstable callbacks or objects. Use class properties or `useCallback` to stabilize them.

## 2025-05-22 - [Redux DevTools Configuration]
**Learning:** `createStore` only accepts one enhancer. Passing multiple enhancers (like `devToolsEnhancer` and `applyMiddleware`) as separate arguments throws an error. They must be composed.
**Action:** Use `composeWithDevTools` from `redux-devtools-extension` or Redux's `compose` to combine middleware and enhancers.
