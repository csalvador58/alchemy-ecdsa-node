<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#dependencies">Dependencies</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#client">Client</a></li>
        <li><a href="#server">Server</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#recap">Recap</a></li>
  </ol>
</details>
<br/>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is an example of using a client and server to facilitate transfers between different addresses and incorporating Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Dependencies

> Frontend-Client

- React

> Backend-Server

- Express

> Cryptography Libraries

- Ethereum-cryptography [(View GitHub Source)](https://github.com/ethereum/js-ethereum-cryptography#readme)

<br/>

### Project Structure

> Frontend-Client

```
src
│   ├── App.jsx
│   ├── App.scss
│   ├── components
│   │   ├── DisplayAccounts.jsx
│   │   ├── SignIn.jsx
│   │   ├── Transfer.jsx
│   │   └── Wallet.jsx
│   ├── main.jsx
│   └── server.js
```

> Backend-Server

```
.
├── index.js
├── package-lock.json
├── package.json
└── scripts
    └── generate.js
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- GETTING STARTED -->

## Getting Started

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run startDev` to start the server

The application should connect to the default server port (3042) automatically!

### Prerequisites

Web browser and code editor.

<br/>

<!-- Recap -->

## Recap

This week 1 project was created during Alchemy University - Ethereum Developer program.

Project highlights:

- Generating a private-public key pair.
- Creating a wallet address similar to an Ethereum wallet format.
- Applied use of Ethereum-related cryptographic primitives from the ethereum-cryptography library.
- Incorporate Public Key Cryptography in demonstration of transfers between wallet addresses.

<br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
