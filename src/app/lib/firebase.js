const firebase = new Firebase('https://firechatt.firebaseio.com/items/');
const usersRef = firebase.child('users');

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

  getUser: function(id) {
    return new Promise((resolve, reject) => {
      usersRef.child(id).on('value', snapshot =>
        promiseValue(snapshot)
        .then(value => resolve(value))
        .catch(err => reject(err)));
    });
  },

  setUser: function(id, user) {
    usersRef.child(id).set(user);
  }
};

export default api;
