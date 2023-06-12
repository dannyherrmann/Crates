import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainLogo from '../images/crates-logo.png'
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { AddUser, FetchUserByFirebaseId } from "../ApiManager";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from "firebase/auth";

export const Register = () => {

    const [user, setUser] = useState({
        email: "",
        fullName: "",
        password: ""
    })

    const navigate = useNavigate();

    const updateLogin = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
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
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
        let dbUser = await FetchUserByFirebaseId(userCredential.user.uid)
        if (dbUser.title === "Not Found") {
            dbUser = {
                name: user.fullName,
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                photo: null
            }
            await AddUser(dbUser)
        }
        handleLocalStorage(userCredential.user.uid, 'email')
    }

    const onSubmitLoginGoogle = async (e) => {
        e.preventDefault()
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        const userCredential = await signInWithPopup(auth, provider)
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
                    <form className="space-y-6" onSubmit={onSubmitLoginEmail}>
                        <div className="relative -space-y-px rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <input
                                    onChange={(evt) => updateLogin(evt)}
                                    id="fullName"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-Space-Mono"
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
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
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or</span>
                        </div>
                    </div>
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

                    <p className="text-center text-sm leading-6 text-gray-500">
                        Already have an account?{' '}
                        <Link to={"/login"} className="font-semibold text-indigo-600 hover:text-indigo-500">Log In</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
