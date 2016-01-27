import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import './ChatContainer.scss';

export default class ChatContainer extends React.Component {
  render() {
    return <div className='chat-container'>
      <AppBar
        title={this.props.chat.name}
        iconElementLeft={
          <Avatar className="chat-avatar" src={`https://robohash.org/${this.props.chat.id}.png?bgset=any`}/>
        }
        iconElementRight={
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem primaryText="Profile" />
            <MenuItem primaryText="About" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
        }/>
    </div>
  }
}
