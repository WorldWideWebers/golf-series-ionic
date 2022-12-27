import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { getDoc, setDoc, doc, CollectionReference } from "firebase/firestore";

import { firebase } from "./firebase";
import User from "../models/user.model";
import { useRouter } from "vue-router";

const userCollectionRef = firebase.createCollectionRef<User>(["users"]);

export const useStoreAuth = defineStore("storeAuth", {
  state: () => {
    return {
      currentUser: undefined as User | undefined,
      token: undefined as string | undefined,
      loggedIn: false,
    };
  },
  actions: {
    init() {
      const router = useRouter();

      onAuthStateChanged(firebase.auth, async (user: FirebaseUser | null) => {
        if (user) {
          this.currentUser = {
            id: user.uid,
            email: user.email || "",
            userName: user.displayName ?? user.email ?? "",
            firstName: "",
            lastName: "",
            handicap: 0,
            state: "",
            city: "",
            role: "user"
          };
          await this.getUser(user.uid);
          this.loggedIn = true;
          await router.push("/");
        } else {
          this.currentUser = undefined;
          this.loggedIn = false;
        }
      });
    },
    registerUser(credentials: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      userName: string;
      state: string;
      city: string;
      handicap: number;
      role: string;
    }) {
      createUserWithEmailAndPassword(
        firebase.auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          this.saveUser(userCredential.user.uid, credentials);
        })
        .catch((error) => {
          console.log("error.message: ", error.message);
        });
    },
    loginUser(credentials: { email: string; password: string }) {
      signInWithEmailAndPassword(
        firebase.auth,
        credentials.email,
        credentials.password
      )
        // .then((userCredential) => {})
        .catch((error) => {
          console.log("error.message: ", error.message);
        });
    },
    signInWithGoogle: () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(firebase.auth, provider)
        // .then((userCredential) => {})
        .catch((error) => {
          throw error;
        });
    },
    resetPassword(email: string) {
      sendPasswordResetEmail(firebase.auth, email)
        .then(() => {
          console.log("Password reset email sent!");
        })
        .catch((error) => {
          console.log("error.message: ", error.message);
        });
    },
    logoutUser() {
      signOut(firebase.auth)
        // .then(() => {})
        .catch((error) => {
          console.log(error.message);
        });
    },
    async getUser(userId: string) {
      const docRef = firebase.createDocumentRef<User>("users", userId);
      const docData = await getDoc(docRef);
      if (docData.exists()) {
        // update current user
        this.currentUser = {
          ...docData.data(),
          id: docData.id,
        };
      }
    },

    async saveUser(userId: string, user: Partial<User>) {
      await setDoc(doc(userCollectionRef as CollectionReference, user.id), user);
      const userName = user.userName ?? this.currentUser?.userName ?? "";
      const firstName = user.firstName ?? this.currentUser?.firstName ?? "";
      const lastName = user.lastName ?? this.currentUser?.lastName ?? "";
      const email = user.email ?? this.currentUser?.email ?? "";
      const handicap = user.handicap ?? this.currentUser?.handicap ?? 0;
      const city = user.city ?? this.currentUser?.city ?? "";
      const state = user.state ?? this.currentUser?.state ?? "";
      const role = user.role ?? this.currentUser?.role ?? "user";
      this.currentUser = {
        id: userId,
        userName,
        firstName,
        lastName,
        email,
        handicap,
        state,
        city,
        role
      };
    },
  },
});
