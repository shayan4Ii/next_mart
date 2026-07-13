"use client";

import { useState } from "react";
import { change_password_api } from "../lib/api";
import { useRouter } from "next/navigation";


export default function ChangePasswordPage() {

    const router = useRouter();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);


    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        const data = await change_password_api(
            oldPassword,
            newPassword
        );


        if(data.success){

            setError(false);

            setMessage(
                "Password changed successfully"
            );

            setTimeout(()=>{
                router.push("/home");
            },1500);

        }
        else{

            setError(true);

            setMessage(data.message);

        }

    }


    return (

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">


            {/* Message above card */}
            {message && (
                <div
                    className={`mb-4 p-3 rounded w-96 text-center ${
                        error
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                >
                    {message}
                </div>
            )}



            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-96 text-black"
            >

                <h1 className="text-2xl font-bold mb-5 text-black">
                    Change Password
                </h1>


                <input
                    type="password"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={(e)=>
                        setOldPassword(e.target.value)
                    }
                    className="w-full border p-2 mb-4 text-black placeholder-gray-500"
                    required
                />


                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e)=>
                        setNewPassword(e.target.value)
                    }
                    className="w-full border p-2 mb-4 text-black placeholder-gray-500"
                    required
                />


                <button
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Change Password
                </button>


            </form>

        </div>

    );
}