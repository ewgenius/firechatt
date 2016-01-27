import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);

export default class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
  }

  selectChat(index) {
    this.setState({selectedIndex: index});
    this.props.selectChat(index);
  }

  render() {
    return <div className='chats'>
      <AppBar title='chat list'/>
      <div className='chats-list'>
        <SelectableList valueLink={{
          value: this.state.selectedIndex
        }}>
          {this.props.chats.map(chat =>
            <ListItem
              value={chat.id}
              key={chat.id}
              primaryText={`${chat.id}: ${chat.name}`}
              secondaryText={chat.message}
              onClick={() => {this.selectChat(chat.id)}}
              leftAvatar={
                <Avatar src={`https://robohash.org/${chat.id}.png?bgset=any`}/>
              }/>)
          }
        </SelectableList>
      </div>
    </div>
  }
}
