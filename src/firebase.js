import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//user authentication with firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9_zKaUVMSEt-ahCb-AE0c141aKpvJmxw",
    authDomain: "clone-9db4b.firebaseapp.com",
    projectId: "clone-9db4b",
    storageBucket: "clone-9db4b.appspot.com",
    messagingSenderId: "238040437083",
    appId: "1:238040437083:web:234d21ec522f4c716fca7e",
    measurementId: "G-PF8F40FLP3"
  };

  //inititalizing the firebase
  const firebaseApp=firebase.initializeApp(firebaseConfig);

  //initializing the DB
  const db=firebaseApp.firestore();
  const auth =firebase.auth();

  export { db, auth };



