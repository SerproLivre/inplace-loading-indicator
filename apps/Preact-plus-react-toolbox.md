# STEPS


```
npm i -g create-react-app && \
create-react-app my-app --scripts-version=preact-compat-scripts-ts and cd my-app && \
yarn add --dev react-toolbox-themr react-toolbox@2.0.0-beta.6
```

Add to package.json, into scripts:

```json
"toolbox": "react-toolbox-themr"
```

and into a root key in package.json:

```json
"reactToolbox": {
    "include": [
      "BUTTON",
      "DATE_PICKER"
    ],
    "customProperties": {
      "animation-duration": "0.3s",
      "color-accent": "var(--palette-pink-a200)",
      "color-accent-dark": "var(--palette-pink-700)",
      "color-primary-contrast": "var(--color-dark-contrast)",
      "color-accent-contrast": "var(--color-dark-contrast)"
    },
    "output": "assets/react-toolbox"
  }
```

Add a declaration file in src/declaration.d.ts:

```

declare module 'react-toolbox/lib/ThemeProvider' {
  export interface ThemeProviderProps {
    theme: any;
  }
  export class ThemeProvider extends React.Component<ThemeProviderProps, {}> { }

  export default ThemeProvider;
}

```

In src/App.tsx, add:

```
import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Button from 'react-toolbox/lib/button/Button';
```

change render:

```
 <ThemeProvider theme={theme}>
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to Preact</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
  </p>
  <Button label="Test Button" raised primary />

  </div>
</ThemeProvider>
```

> Run the app:

```
yarn start
```

## REFERENCES:

* https://github.com/facebookincubator/create-react-app
* https://www.npmjs.com/package/preact-compat-scripts-ts
*
* https://medium.com/@liangchun/using-react-toolbox-with-create-react-app-f4c2a529949

* https://preact-compat-example.surge.sh/card-example
* https://github.com/developit/preact-compat-example
*
* https://github.com/cyberid41/preact-admin-dashboard
