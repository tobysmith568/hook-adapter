# hook-adapter

<a href="https://www.npmjs.com/package/hook-adapter">
  <img alt="" src="https://img.shields.io/npm/v/hook-adapter?logo=npm">
</a>

<a href="https://license-cop.js.org">
  <img alt="Protected by: License-Cop" src="https://license-cop.js.org/shield.svg">
</a>

A lightweight adapter pattern for using React hooks in class components.

Useful while transitioning from class components to functional components.

Allows you to wrap blocks of JSX within a class component with the result of a hook.

All hooks are supported, and all hook behaviors like re-renders, state updates, and side effects are preserved.

## Installation

```bash
npm install hook-adapter
```

## Usage

### Hook without parameters

When the hook requires no parameters, you can simply pass the hook function itself to the `hook` prop of the `HookAdapter` component.

The result of the hook is then passed to the children of the `HookAdapter` component via a function children prop.

```jsx
import React, { Component } from "react";
import { HookAdapter } from "hook-adapter";
import { useMyHook } from "./use-my-hook";

export class MyComponent extends Component {
  render() {
    return (
      <div>
        <HookAdapter hook={useMyHook}>
          {hookResult => <AComponentThatNeedsTheHookResult data={hookResult} />}
        </HookAdapter>
      </div>
    );
  }
}
```

### Hooks with parameters

When the hook requires parameters, there are two approaches you can take:

- Wrap the hook in a function that takes no parameters

  ```jsx
  import React, { Component } from "react";
  import { HookAdapter } from "hook-adapter";
  import { useMyHook } from "./use-my-hook";

  export class MyComponent extends Component {
    render() {
      return (
        <div>
          <HookAdapter hook={() => useMyHook("param1", "param2")}>
            {hookResult => <AComponentThatNeedsTheHookResult data={hookResult} />}
          </HookAdapter>
        </div>
      );
    }
  }
  ```

- Pass in the parameters to the `HookAdapter` component via the `parameters` prop

  ```jsx
  import React, { Component } from "react";
  import { HookAdapter } from "hook-adapter";
  import { useMyHook } from "./use-my-hook";

  export class MyComponent extends Component {
    render() {
      return (
        <div>
          <HookAdapter hook={useMyHook} parameters={["param1", "param2"]}>
            {hookResult => <AComponentThatNeedsTheHookResult data={hookResult} />}
          </HookAdapter>
        </div>
      );
    }
  }
  ```

Both approaches are equivalent and are fully type-safe.

You may find that the latter approach works better with certain linting rules.

## License

hook-adapter is licensed under the [ISC license](./LICENSE.md).
