import React from 'react';
import MyTheme from './theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import {Router, Route, Link, browserHistory} from 'react-router';
import Shell from './components/Shell/Shell.jsx';
import Login from './components/Login.jsx';

export default class App extends React.Component {
  constructor() {
    super();
  }

  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(MyTheme)};
  }

  render() {
    return <div>
      <Shell />
    </div>
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
