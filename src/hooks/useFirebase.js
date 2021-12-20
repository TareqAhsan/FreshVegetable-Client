import firebaseinit from "../Components/Login/Login/Firebase/firebaseinit";
import swal from "sweetalert";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getIdToken,
} from "firebase/auth";
import { useEffect, useState } from "react";
firebaseinit();
const auth = getAuth();
const googleprovider = new GoogleAuthProvider();
const useFirebase = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState();
  const registerUser = (email, password, displayName, navigate) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser({ email, displayName });
        swal({
          title: "Registered Successfully!",
          icon: "success",
          timer: 1500,
        });
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {})
          .catch((error) => {});
        saveUsertoDb(email, displayName, "POST");
        setError("");
        navigate("/");
      })
      .catch((error) => {
        swal({
          title: error.message,
          icon: "error",
          timer: 3000,
        });
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const login = (email, password, navigate, location) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        swal({
          title: "Login Successfully!",
          icon: "success",
          timer: 1500,
        });
        const redirect = location?.state?.from || "/";
        setError("");
        navigate(redirect);
      })
      .catch((error) => {
        swal({
          title: error.message,
          icon: "error",
          timer: 3000,
        });
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  const googleSignin = (navigate, location) => {
    setLoading(true);
    signInWithPopup(auth, googleprovider)
      .then((result) => {
        swal({
          title: "Login Successfully!",
          icon: "success",
          timer: 1500,
        });
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        saveUsertoDb(user.email, user.displayName, "PUT");
        const redirect = location?.state?.from || "/";
        navigate(redirect);
      })
      .catch((error) => {
        swal({
          title: error.message,
          icon: "error",
          timer: 3000,
        });
        setError(error.message);
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  };

  const logout = (navigate) => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        swal({
          title: "Logout Successfully!",
          icon: "success",
          timer: 1500,
        });
        setUser("");
        setError("");
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => setToken(idToken));
      } else {
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    axios(
      `https://morning-oasis-89625.herokuapp.com/users/admin/${user?.email}`
    ).then((result) => setAdmin(result.data.admin));
  }, [user?.email]);

  const saveUsertoDb = (email, displayName, method) => {
    const user = { email, displayName };
    fetch(`https://morning-oasis-89625.herokuapp.com/users`, {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  return {
    registerUser,
    login,
    user,
    error,
    loading,
    admin,
    token,
    logout,
    googleSignin,
  };
};

export default useFirebase;
