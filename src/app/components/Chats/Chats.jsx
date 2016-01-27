import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

import './Chats.scss';

export default class Chats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="Chats">
      <AppBar/>
    </div>
  }
}
