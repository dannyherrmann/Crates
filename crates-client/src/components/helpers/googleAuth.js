import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
  } from "firebase/auth";
import { AddUser, FetchUserByFirebaseId } from "../ApiManager";

  
  export const googleAuth = {
    // Works to sign in AND register a user
    signInRegister: function(navigate) {
      return new Promise((res) => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        signInWithPopup(auth, provider)
          .then(async (userCredential) => {
            let dbUser = await FetchUserByFirebaseId(userCredential.user.uid)
            if (dbUser.title === "Not Found") {
              dbUser = {
                name: userCredential.user.displayName,
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                photo: null
              }
              await AddUser(dbUser)
            }
            const userAuth = {
              email: userCredential.user.email,
              uid: userCredential.user.uid,
              type: "google",
            }
            localStorage.setItem("crate_user", JSON.stringify(userAuth))
            navigate("/");
          })
          .catch((error) => {
            console.log("Google Sign In Error")
            console.log("error code", error.code)
            console.log("error message", error.message)
            console.log("error email", error.email)
            window.alert('Invalid Credentials')
          });
      });
    },
    // Sign out a user
    signOut: function(navigate) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          localStorage.removeItem("crate_user")
          console.log("Sign Out Success!")
          navigate("/")
        })
        .catch((error) => {
          console.log("Google SignOut Error")
          console.log("error code", error.code)
          console.log("error message", error.message)
          window.alert('Sign Out Error')
        })
    },
  }