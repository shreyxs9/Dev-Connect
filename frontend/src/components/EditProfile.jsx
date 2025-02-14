import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/userSlice.js";
import { BASE_URL } from '../utils/constant.js';
import Usercard from './Usercard.jsx';

const EditProfile = ({ userData }) => {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [age, setAge] = useState(userData?.age);
  const [gender, setGender] = useState(userData?.gender);
  const [skills, setSkills] = useState(userData?.skills);
  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, {
        firstName,
        lastName,
        age: Number(age),
        gender,
        skills,
        photoUrl,
      }, { withCredentials: true });
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      setLoading(false);
      setTimeout(()=>
        setSuccess(false)
    ,3000)
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } 
  };

  return (
    <>
      {success && (
        <div className="toast toast-top toast-center z-29">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
      <div className="md:flex md:justify-center w-full h-[125vh] md:h-full">
        <Usercard user={{ firstName, lastName, age, gender, skills, photoUrl }} />
        <div className="flex justify-center items-center mt-5 md:mt-0 ml-0 md:ml-20 min-h-screen/2 md:w-[50vh]">
          <form
            onSubmit={handleEdit}
            className="w-[77.5%] md:w-full max-w-sm md:max-w-md p-4 md:p-8 bg-white rounded-lg shadow-md"
          >
            <div className="mb-3 md:mb-6">
              <label htmlFor="firstname1" className="block text-sm font-medium text-gray-800">
                Firstname
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                id="firstname1"
                type="text"
                className="w-full px-3 border text-gray-700 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="lastname1" className="block text-sm font-medium text-gray-800">
                Lastname
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                id="lastname1"
                type="text"
                className="w-full px-3 border text-gray-700 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="age1" className="block text-sm font-medium text-gray-800">
                Age
              </label>
              <input
                onChange={(e) => setAge(e.target.value)}
                value={age}
                id="age1"
                type="number"
                className="w-full px-3 py-2 border text-gray-700 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="gender1" className="block text-sm font-medium text-gray-800">
                Gender
              </label>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                id="gender1"
                className="w-[50%] md:w-full border text-gray-700 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="skills1" className="block text-sm font-medium text-gray-800">
                Skills
              </label>
              <input
                onChange={(e) => setSkills(e.target.value)}
                value={skills}
                id="skills1"
                type="text"
                className="w-full px-3 py-2 border bg-white text-gray-700 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="photoUrl1" className="block text-sm font-medium text-gray-800">
                Photo URL
              </label>
              <input
                onChange={(e) => setPhotoUrl(e.target.value)}
                value={photoUrl}
                id="photoUrl1"
                type="text"
                className="w-full px-3 text-gray-700 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Edit Profile"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;