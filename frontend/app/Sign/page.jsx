"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [data, setData] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const picture = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myFile", selectedImage);

    try {
      const res = await axios.post("http://localhost:5000/Signup", {
        formData,
        email,
        password,
        cpassword,
        name,
      });
      setData(res.data);
      console.log(res.data);
      if (res.data.user === "added") {
        router.push("/login");
      } else {
        console.log("Not Added");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:max-w-xl sm:w-full">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            // action="#"
            encType="multipart/form-data"
            method="POST"
          >
            <div className="text-center">
              <label
                htmlFor="image"
                className=" mx-auto w-28 h-28 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out flex justify-center items-center"
              >
                <input
                  id="image"
                  name="myFile"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <AiOutlinePlus className="m-auto" />
                )}
              </label>
              {selectedImage && (
                <>
                  <div onClick={picture} className="text-sm py-2 text-red-500">
                    Change Photo
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-10 w-full">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="cpassword"
                    name="cpassword"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <Link
              href="/"
              className="font-semibold p-[4px] leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
