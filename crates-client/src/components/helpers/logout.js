import { googleAuth } from "./googleAuth";
import { emailAuth } from "./emailAuth";

// Checks for which log out we should do... maybe don't need this.
// other methods may work for both.

export const logout = {
  logout: function(navigate) {
    const userRecord = JSON.parse(localStorage.getItem("crate_user"));
    console.log(`user record = ${userRecord.type}`)
    if (userRecord.type === "google") {
      googleAuth.signOut(navigate)
    } else if (userRecord.type === "email") {
      emailAuth.signOut(navigate)
    }
  },
};