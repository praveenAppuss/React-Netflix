import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDy92H6-0nxHKAuUaE4TASUtoKAi7YsuOg",
  authDomain: "netflix-clone-618f6.firebaseapp.com",
  projectId: "netflix-clone-618f6",
  storageBucket: "netflix-clone-618f6.firebasestorage.app",
  messagingSenderId: "569445021275",
  appId: "1:569445021275:web:d57281a999bb807f64317e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup =async (name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user =res.user;
        await addDoc(collection(db,"user"), {
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }

}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }

}

const logout =()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};