import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Firebase from 'firebase';

import './Shell.scss';

export default class Shell extends React.Component {
  constructor(props) {
    super(props);
    this.firebase = new Firebase("https://firechatt.firebaseio.com/items/");
  }

  handleToggle() {
    this.firebase.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  }

  render() {
    return <div className="Shell">
      <button onClick={this.handleToggle.bind(this)}>test</button>
    </div>
  }
}
