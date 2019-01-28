import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainComponent from './MainComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
