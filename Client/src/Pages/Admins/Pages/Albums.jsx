import React, { useState } from "react";

import upload from "../../../assets/arrow.png"

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [albumData, setAlbumData] = useState({
    name: '',
    image: '',
    category: '',
    description: '',
    bgColor: '#ffffff' // Default color
  });

  const changeHandler = (e) => {
    setAlbumData({ ...albumData, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const colorChangeHandler = (e) => {
    setAlbumData({ ...albumData, bgColor: e.target.value });
  };

  const addAlbumHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('image', image);
  
    try {
      const response = await fetch('http://localhost:3000/uploadalbum', {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        console.error("Error uploading image");
        throw new Error("Image upload failed");
      }
  
      const data = await response.json();
      if (data.success) {
        albumData.image = data.image_url;
        const response2 = await fetch('http://localhost:3000/admin/addalbum', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token"),
          },
          body: JSON.stringify(albumData),
        });
  
        if (!response2.ok) {
          const errorResponse = await response2.json();
          console.error("Error adding album:", errorResponse);
          throw new Error("Album addition failed");
        }
  
        const data2 = await response2.json();
        if (data2.success) {
          alert("Album added successfully");
        } else {
          alert("Album addition failed");
        }
      }
    } catch (error) {
      console.error("Error in addAlbumHandler:", error);
    }
  };
  

  return (
    <div className="w-auto max-w-[800px] md:w-[100%] mt-2 mx-auto">
      <div className="p-8 bg-slate-300 rounded-lg shadow-lg px-10 md:px-20">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Album</h2>
        <form onSubmit={addAlbumHandler} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Album Name
            </label>
            <input
              value={albumData.name}
              onChange={changeHandler}
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4141] focus:border-[#ff4141] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={albumData.description}
              onChange={changeHandler}
              id="description"
              name="description"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4141] focus:border-[#ff4141] sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="bgColor" className="block text-sm font-medium text-gray-700">
              Background Color
            </label>
            <input
              type="color"
              value={albumData.bgColor}
              onChange={colorChangeHandler}
              id="bgColor"
              name="bgColor"
              className="mt-1 block w-[20%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
            <input
              type="text"
              value={albumData.bgColor}
              onChange={changeHandler}
              name="bgColor"
              readOnly
              className="mt-1 ml-2 block w-[30%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={albumData.category}
              onChange={changeHandler}
              id="category"
              name="category"
              required
              className="mt-1 block w-[80%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff4141] focus:border-[#ff4141] sm:text-sm"
            >
              <option value="">Select a category</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
              <option value="hiphop">Hip-Hop</option>
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              <img className="w-20" src={image ? URL.createObjectURL(image) : upload} alt="" />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              id="image"
              name="image"
              required
              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ff4141] file:text-white hover:file:bg-[#626262]"
            />
          </div>
          <div>
            <button
              type="submit"
              className="py-2 px-4 bg-gradient-to-r from-[#ff4141] to-[#626262] text-white font-semibold rounded-md shadow-sm hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4141]"
            >
              Add Album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlbum;
