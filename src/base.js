import Rebase from 're-base';
import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyDawn8ERr7XEblmIrtwYThMiEW8UT7ehe4",
  authDomain: "where-ece21.firebaseapp.com",
  databaseURL: "https://where-ece21.firebaseio.com",
  projectId: "where-ece21",
  storageBucket: "",
  messagingSenderId: "836614539023",
  appId: "1:836614539023:web:c06bec9a7b175e18"
};

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export { base }