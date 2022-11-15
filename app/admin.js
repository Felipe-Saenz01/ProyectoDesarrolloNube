import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) =>{
    console.log(user.email)
})