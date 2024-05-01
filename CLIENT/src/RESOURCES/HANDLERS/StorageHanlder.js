import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuAAJDlrSm9vlBwod_KhK0HftfJQFeAcI",
  authDomain: "snapsap-f6590.firebaseapp.com",
  projectId: "snapsap-f6590",
  storageBucket: "snapsap-f6590.appspot.com",
  messagingSenderId: "1009206880577",
  appId: "1:1009206880577:web:870de3a5a21284026f59c0",
  measurementId: "G-GGTFEP4R1H",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
