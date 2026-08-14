// auth.js
import { 
    auth, 
    db,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "./firebase-config.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Register New User (Ab yeh Name bhi save karega)
export async function registerUser(email, password, name = "Muhammad Farhan") {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firestore mein real user record aur Name save ho raha hai
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                name: name, // User ka naam yahan save hoga
                coins: 35,
                points: 21462,
                customId: Math.floor(10000000 + Math.random() * 90000000),
                friends: 3,
                following: 3,
                followers: 236,
                visitors: 0,
                createdAt: new Date()
            });
        }

        console.log("Account created successfully with name:", name);
        return { success: true, user: user };
    } catch (error) {
        console.error("Registration Error:", error.code, error.message);
        return { success: false, error: error.message };
    }
}

// Login Existing User
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged in successfully:", userCredential.user.uid);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Login Error:", error.code, error.message);
        return { success: false, error: error.message };
    }
}

// Logout User
export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("Logged out successfully");
        return { success: true };
    } catch (error) {
        console.error("Logout Error:", error.message);
        return { success: false, error: error.message };
    }
}

// Google Direct Login (Google account ka asal name uthayega)
const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                email: user.email || "",
                name: user.displayName || "Muhammad Farhan",
                coins: 35,
                points: 21462,
                customId: Math.floor(10000000 + Math.random() * 90000000),
                friends: 3,
                following: 3,
                followers: 236,
                visitors: 0,
                createdAt: new Date()
            });
        }

        return { success: true, user: user };
    } catch (error) {
        console.error("Google Login Error:", error.message);
        return { success: false, error: error.message };
    }
}

// Phone OTP - Step 1: Recaptcha Setup
export function setupRecaptcha(containerId = 'recaptcha-container') {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
            'size': 'invisible'
        });
    }
}

// Phone OTP - Step 2: Send OTP
export async function sendPhoneOtp(phoneNumber) {
    try {
        const appVerifier = window.recaptchaVerifier;
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        window.confirmationResult = confirmationResult;
        return { success: true, message: "OTP sent successfully!" };
    } catch (error) {
        console.error("Phone OTP Error:", error.message);
        return { success: false, error: error.message };
    }
}

// Phone OTP - Step 3: Verify OTP & Save Data with Name
export async function verifyPhoneOtp(otpCode, name = "Muhammad Farhan") {
    try {
        const result = await window.confirmationResult.confirm(otpCode);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                phone: user.phoneNumber || "",
                name: name,
                coins: 35,
                points: 21462,
                customId: Math.floor(10000000 + Math.random() * 90000000),
                friends: 3,
                following: 3,
                followers: 236,
                visitors: 0,
                createdAt: new Date()
            });
        }

        return { success: true, user: user };
    } catch (error) {
        console.error("OTP Verification Error:", error.message);
        return { success: false, error: error.message };
    }
}
