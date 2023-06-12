import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from '../images/crates-logo.png'
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { FetchUserByFirebaseId } from "../ApiManager";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const Login = () => {

  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const updateLogin = (evt) => {
    const copy = { ...login }
    copy[evt.target.id] = evt.target.value
    setLogin(copy)
  }

  const handleLocalStorage = async (uid, loginType) => {
    const user = await FetchUserByFirebaseId(uid)
    localStorage.setItem(
      "crate_user",
      JSON.stringify({
        id: user.id,
        email: user.email,
        uid: user.uid,
        type: loginType
      })
    )
    navigate("/")
  }

  const onSubmitLoginEmail = async (e) => {
    e.preventDefault()
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password)
    handleLocalStorage(userCredential.user.uid, 'email')
  }

  const onSubmitLoginGoogle = async (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    const userCredential = await signInWithPopup(auth, provider)
    handleLocalStorage(userCredential.user.uid, 'google')
  }

  return (
    <>
      <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <img
              className="mx-auto h-15 w-auto"
              src={mainLogo}
              alt="Your Company"
            />
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  onChange={(evt) => updateLogin(evt)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-Space-Mono"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(evt) => updateLogin(evt)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="font-Space-Mono relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                onClick={(e) => onSubmitLoginEmail(e)}
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6 grid grid-cols-1 gap-1">
              <div>
                <div className="relative flex justify-center text-sm">
                    <GoogleButton 
                    type="light"
                    onClick={onSubmitLoginGoogle}
                    className="ml-19"
                    />
                </div>
              </div>
            </div>

          <p className="text-center text-sm leading-6 text-white">
            New to Crates?{' '}
            <Link to={"/register"} className="font-semibold text-white">Create an Account</Link>
          </p>
        </div>
      </div>
    </>
  )
}
