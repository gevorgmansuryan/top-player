require('babel-register');
const React = require('react');
const render = require('react-dom').render;
const App = require('./react-app.jsx').default;
render(React.createElement(App), document.getElementById('app'));

