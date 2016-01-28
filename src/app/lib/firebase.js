const firebase = new Firebase('https://firechatt.firebaseio.com/items/');
const usersRef = firebase.child('users');
const chatsRef = firebase.child('chats');

function promiseValue(snapshot) {
  return new Promise((resolve, reject) => {
    var value = snapshot.val();
    if (value) resolve(value);
    else reject(null);
  });
}

const api = {
  authorize: function() {
    return new Promise((resolve, reject) => {
      firebase.authWithOAuthPopup('google', function(error, authData) {
        if (error)
          reject(error);
        else
          resolve(authData);
      });
    });
  },

  getUser: function(userId) {
    return new Promise((resolve, reject) => {
      usersRef.child(userId).on('value', snapshot =>
        promiseValue(snapshot)
        .then(value => resolve(value))
        .catch(err => reject(err)));
    });
  },

  setUser: function(userId, user) {
    usersRef.child(userId).set(user);
  },

  getUsers: function() {
    return new Promise((resolve, reject) => {
      usersRef.on('value', snapshot =>
        promiseValue(snapshot)
        .then(value => resolve(value))
        .catch(err => reject(err)));
    });
  },

  createChat: function(userId1, userId2) {
    return new Promise((resolve, reject) => {
      this.getChat(`${userId1}-${userId2}`, userId1)
        .then(chat => resolve(chat))
        .catch(() => this.getChat(`${userId2}-${userId1}`, userId1)
          .then(chat => resolve(chat))
          .catch(() => {
            let chatId = `${userId1}-${userId2}`;
            let chat = {
              user1: userId1,
              user2: userId2
            };
            chatsRef.child(chatId).set(chat);
            usersRef.child(userId1).child('chats').child(chatId).set({
              user: userId2,
              chatId: chatId
            });
            usersRef.child(userId2).child('chats').child(chatId).set({
              user: userId1,
              chatId: chatId
            });
            this.getChat(chatId, userId1).then(chat => resolve(chat));
          }));
    });
  },

  getChats: function(userId) {
    return new Promise((resolve, reject) => {
      usersRef.child(userId).child('chats').on('value', snapshot =>
        promiseValue(snapshot)
        .then(value => resolve(value))
        .catch(err => reject(err)));
    }).then(chats => Promise.all(Object.keys(chats).map(id => this.getChat(id, userId))));
  },

  getChat: function(chatId, userId) {
    return new Promise((resolve, reject) => {
      chatsRef.child(chatId).on('value', snapshot =>
        promiseValue(snapshot)
        .then(value => resolve(value))
        .catch(err => reject(err)));
    }).then(chat => {
      return {
        id: chatId,
        chat: chat
      };
    }).then(chat => {
      let opponentId = userId;
      console.log(chat);
      if (chat.chat.user1 !== userId)
        opponentId = chat.chat.user1;
      else if (chat.chat.user2 !== userId)
        opponentId = chat.chat.user2;
      return this.getUser(opponentId).then(user => {
        return {
          id: chat.id,
          chat: chat.chat,
          opponent: user
        };
      });
    });
  },

  subscribeUsers: function() {

  },

  subscribeChatAdded: function(userId, cb) {
    usersRef.child(userId).child('chats').on('child_added',
      snapshot => promiseValue(snapshot)
      .then(chat => this.getChat(chat.chatId, userId)
        .then(chat => cb(chat))));
  },

  subscribeChatRemoved: function(userId, cb) {
    usersRef.child(userId).child('chats').on('child_removed',
      snapshot => promiseValue(snapshot).then(chat => cb(chat)));
  },

  subscribeChat: function(chatId, cb) {
    chatsRef.child(chatId).child('messages').on('child_added',
      snapshot => promiseValue(snapshot).then(message => cb(message)));
  },

  unsubscribeChat: function(chatId) {
    chatsRef.child(chatId).child('messages').off('child_added');
  }
};

export default api;
