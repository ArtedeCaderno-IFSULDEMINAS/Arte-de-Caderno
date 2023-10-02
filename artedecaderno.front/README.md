# Arte de Caderno - Front- end

## How to run locally

1. Clone this repository with command `git clone`
2. Enter the folder and run on terminal `npm i`
3. Run `npm start`. The server will connect at port `3000`

## Technologies

- React ^18.2.0
- Styled-Components ^6.0.8
- FontAwesome

## Folders

Each page view can be found at `src/views/[name]`.
Routes are located inside `src/router/routes.jsx`.

## Responsiveness

There are a function called `useMediaQuery` based on `src/hooks`. Hoe to use it:

```js
import useMediaQuery from "src/hooks/useMediaQuery";

const App = () => {
  const desktop = useMediaQuery("(min-width: 768px)"); //the parenthesis inside the quotes must be there

  /* desktop will be true if the screen is larger then 768px */
};
```

## Services

The `src/services/` folder contains all server communication. It's a way to keep front fast.

## Utils

All utils functions are in `src/utils`, like masks, reasons to declassify a draw, and others.

### How to use masks

```js
import { format } from "src/utils/format";

const App = () => {
  const cpf = format.cpf("00000000000"); // 000.000.000-00
};
```
