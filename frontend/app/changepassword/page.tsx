"use client";

import { useState } from "react";
import { change_password_api } from "../lib/api";
import { useRouter } from "next/navigation";


export default function ChangePasswordPage() {

    const router = useRouter();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [message, setMessage] = useState("");


    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();


        const data = await change_password_api(
            oldPassword,
            newPassword
        );


        if(data.success){

            setMessage(
                "Password changed successfully"
            );

            setTimeout(()=>{
                router.push("/home");
            },1500);

        }
        else{

            setMessage(data.message);

        }

    }


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >

                <h1 className="text-2xl font-bold mb-5">
                    Change Password
                </h1>


                {message && (
                    <p className="mb-4 text-blue-600">
                        {message}
                    </p>
                )}


                <input
                    type="password"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={(e)=>
                        setOldPassword(e.target.value)
                    }
                    className="w-full border p-2 mb-4"
                    required
                />


                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e)=>
                        setNewPassword(e.target.value)
                    }
                    className="w-full border p-2 mb-4"
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