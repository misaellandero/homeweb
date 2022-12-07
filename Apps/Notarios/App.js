// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBUYrR23eSc2tyZDJQROBo3ZRd3Qd7dblE",
    authDomain: "notarios-2eff8.firebaseapp.com",
    databaseURL: "https://notarios-2eff8.firebaseio.com",
    projectId: "notarios-2eff8",
    storageBucket: "notarios-2eff8.appspot.com",
    messagingSenderId: "949546437729",
    appId: "1:949546437729:web:f29d2c202a859677082e20"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then((reg)=> console.log('Service worked registered', reg))
    .catch((err)=> console.log('Service worked no registered', err))
}