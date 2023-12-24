import {auth, provider} from "../firebase-config.js"
import { signInWithPopup } from "firebase/auth";

export const Auth = () => {

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
    };

    return (
    <div>
        <button onClick={signInWithGoogle}>Sign in With Google</button>
    </div>
    );
};