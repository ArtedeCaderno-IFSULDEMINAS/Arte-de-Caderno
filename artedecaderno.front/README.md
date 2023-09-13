# Arte de Caderno

Frontend application for 'Arte de Caderno'

## How to run locally

1. Clone the repository - `git clone`
2. Install nodejs (latest version)
3. Install de packages - `npm i`
4. Run using `npm start`

## How it was built

### Styles

- Style: [Styled Components](https://styled-components.com).
  The main components can be found at `styles/sharedStyles.jsx`.
  If the component need some changes, the new version will be at the file which the changes were needed. If there's a need to a new different component but not used as much as main, it can be found at `Components/[component_name]`.
- All the CSS constants, like colors and fonts, are at `Components/UI/constants.js`.

### Responsibility

To check the window size, the dev can use a function named `useMediaQuery`. It can be found at `hooks/useMediaQuery`. Usage:

```js
const desktop = useMediaQuery("(min-width: 768px)"); //parenthesis must come
```

and the function will return `true` if the window width is above `768px` (tablet size) or `false`if its below.

### Routing

The Front Routing was made by using [React Router Dom](https://reactrouter.com/en/main). The routes can be found at `hooks/Routes.jsx`

### Contexts

To share data through components I created a context, named `userContext`.

### Services

To make sure front-end is not overloaded and repeating code to communicate with server, all server communication are located at `./src/services/[name]`.

#### Services available

- AuthService (`services/loginRoutes`)

  - Login: the first step of login. Arguments: `cpf, password`
  - Logar: send the CPF, password and two factor code to server side. Arguments: `cpf, password, code`

- CPFroutes (`services/CPFroutes`)

  - verifyCPF: server communication tp validate the CPF. Arguments: `cpf`

- Get Date (`services/getDate`)

  - getDay: returns the current day. No args
  - getMonth: returns the current month. No args

- Get Draws for Gallery (`services/loadGallery`)
  No other functions yet. No args

- Load Home (`services/loadHome`)
  Returns home data from mocks. No args

- Load New (`services/loadNews`)
  Returns news data. No args

- Professor Routes (`services/professorRoutes`)

  - getStudents: returns the students. Args: `user`
  - getSchools: returns the schools. Args: `user`
  - getProfById: returns professor data. Args: `user`

- School Routes (`services/schoolRoutes`)
  - getSchoolById: returns the school data. Args: `user, id`

#### How to use services - e.g.: CPFroutes

```js
import { CPFroutes } from "[path]/services/CPFroutes";

const checkCPF = async (e) => {
  const cpf = e.target.value.replace(/\D/g, "");
  const a = await CPFroutes.verifyCPF(cpf);

  /*do what you want here*/
};
```

### Masks

Masks are important to format input values to the pattern adopted. It can be found at `utils/masks`.

#### How to use - e.g.: CPF

```js
import { masks } from "[path]/utils/masks";
import { useState } from "react";

export default function App() {
  const [cpf, setCpf] = useState();

  const handleChange = (e) => {
    setCpf(masks.cpf(e.target.value));
  };

  return <input value={cpf} onChange={handleChange} />;
}
```
