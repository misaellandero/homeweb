// Configuración e inicialización de Firebase
// Reemplaza los valores del objeto con tus credenciales reales.
const firebaseConfig = {
  apiKey: "AIzaSyBKEOOsqKbofoiYzBKZMf5uAT8p3j6mSAQ",
  authDomain: "boda-333e0.firebaseapp.com",
  projectId: "boda-333e0",
  storageBucket: "boda-333e0.firebasestorage.app",
  messagingSenderId: "382052493578",
  appId: "1:382052493578:web:eb206a6e7a285f8c89f2f3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
