import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { AddUser } from "../ApiManager";

  
  export const emailAuth = {
    // Register New User
    register: function(userObj) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then(async (userCredential) => {
          const auth = getAuth();
          await updateProfile(auth.currentUser, {
            displayName: userObj.fullName,
          }).then(
            function() {
              //add to local storage
              const userAuth = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                type: "email"
              }
              localStorage.setItem("crate_user", JSON.stringify(userAuth));
              //add to DB
              const dbUser = {
                name: userCredential.user.displayName,
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                photo: null
              }
              AddUser(dbUser)
            },
            function(error) {
              console.log("Email Register Name Error")
              console.log("error code", error.code)
              console.log("error message", error.message)
              window.alert('Invalid Credentials')
            }
          );
        })
        .catch((error) => {
          console.log("Email Register Error")
          console.log("error code", error.code)
          console.log("error message", error.message)
          window.alert('Invalid Credentials')
        });
    },
    // Sign in existing user
    signIn: function(userObj, navigate) {
      return new Promise((res) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, userObj.email, userObj.password)
          .then(async (userCredential) => {
            const userAuth = {
              email: userCredential.user.email,
              uid: userCredential.user.uid,
              type: "email"
            }
            localStorage.setItem("crate_user", JSON.stringify(userAuth))
            navigate("/")
          })
          .catch((error) => {
            console.log("Email SignIn Error")
            console.log("error code", error.code)
            console.log("error message", error.message)
            window.alert('Invalid Credentials')
          });
      });
    },
    // Sign out
    signOut: function(navigate) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.removeItem("crate_user")
          console.log("Sign Out Success!")
          navigate("/")
        })
        .catch((error) => {
          console.log("signOut Error")
          console.log("error code", error.code)
          console.log("error message", error.message)
        })
    },
  }