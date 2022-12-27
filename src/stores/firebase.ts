import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  CollectionReference,
  DocumentReference,
  DocumentData,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyQfwVjg580-rsunfQubBAplKq0ehS6yc",
  authDomain: "golf-series-925b7.firebaseapp.com",
  projectId: "golf-series-925b7",
  storageBucket: "golf-series-925b7.appspot.com",
  messagingSenderId: "109838900562",
  appId: "1:109838900562:web:dac1cff517ee94b4c46e8b",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const createCollectionRef = <T = DocumentData>(
  parameterReference: string[]
) => {
  if (parameterReference.length === 1) {
    return collection(db, parameterReference[0]) as CollectionReference<T>;
  } else if (parameterReference.length === 3) {
    return collection(
      db,
      parameterReference[0],
      parameterReference[1],
      parameterReference[2]
    ) as CollectionReference<T>;
  } else if (parameterReference.length === 5) {
    return collection(
      db,
      parameterReference[0],
      parameterReference[1],
      parameterReference[2],
      parameterReference[3],
      parameterReference[4]
    ) as CollectionReference<T>;
  } else if (parameterReference.length === 7) {
    return collection(
      db,
      parameterReference[0],
      parameterReference[1],
      parameterReference[2],
      parameterReference[3],
      parameterReference[4],
      parameterReference[5],
      parameterReference[6]
    ) as CollectionReference<T>;
  }
};

const createSecondaryCollectionRef = <T = DocumentData>(
  mainCollectionName: string,
  id: string,
  secondCollectionName: string
) => {
  return collection(
    db,
    mainCollectionName,
    id,
    secondCollectionName
  ) as CollectionReference<T>;
};

const createDocumentRef = <T = DocumentData>(
  collectionName: string,
  documentId: string
) => {
  return doc(db, collectionName, documentId) as DocumentReference<T>;
};

export const firebase = {
  db,
  auth,
  createCollectionRef,
  createDocumentRef,
  createSecondaryCollectionRef,
};
