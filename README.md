# React table components

React components for creating tables with specific controls

Demo: (https://votsa.github.io/react-table-components/)

## Installation

You can install `react-table-components` with [npm](https://www.npmjs.com/):

```
npm install react-table-components --save
```

This package has 2 containers which include full functionality of `react-table-components`.

First one is bootstrap container which requires Bootstrap stylesheets and Font Awesome fonts

```html
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet" />
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
```

and

```javascript
import { BootstrapContainer } from 'react-table-components';
import 'react-table-components/styles/styles.css';
```

Second one is material design container which requires Material Design Lite stylesheets and Material icon font
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<link href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css" rel="stylesheet" />
```

and

```javascript
import { MaterialContainer } from 'react-table-components';
import 'react-table-components/styles/styles.css';
```