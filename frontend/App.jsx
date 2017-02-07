import React from 'react';
import { render } from 'react-dom';
import TextEditor from './containers/TextEditor';

const App = () => (
  <div>
    <TextEditor />
  </div>
);

render(<App />, document.getElementById('app'));
