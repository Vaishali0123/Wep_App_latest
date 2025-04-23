"use client";
import { useFetchSettingsQuery } from "@/app/redux/slices/settingApi";
import React, { useEffect, useRef, useState } from "react";
import { FaInstagram, FaLinkedin, FaSnapchat } from "react-icons/fa";
import { RiYoutubeLine } from "react-icons/ri";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import { API } from "@/app/utils/helpers";
import { useAuthContext } from "@/app/auth/components/auth";
// import LogoutModal from "@/app/components/Logout";

const Page = () => {
  const { data: authdata } = useAuthContext();
  const userId = authdata?.id;
  const { data, isLoading } = useFetchSettingsQuery(userId);

  const [profilePic, setProfilePic] = useState<string>("");
  const [cropData, setCropData] = useState<string>(""); // Holds the cropped image data
  const [showCropper, setShowCropper] = useState<boolean>(false); // Show/hide the cropper modal
  const [imageToCrop, setImageToCrop] = useState<string | null>(null); // Image to be cropped
  // const cropperRef = React.useRef<HTMLImageElement>(null);
  const cropperRef = useRef<HTMLImageElement & { cropper?: Cropper }>(null);
  const [load, setLoad] = useState<boolean>(false);
  const [fullname, setFullname] = useState<string>("");
  const [insta, setInsta] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [snap, setSnap] = useState<string>("");
  const [x, setX] = useState<string>("");
  const [linkdin, setLinkdin] = useState<string>("");
  const [yt, setYt] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const deleteCookies = () => {
  //   Cookies.remove(`token`);
  //   Cookies.remove(`token`);
  //   setAuth(false);
  //   setTimeout(() => {
  //     //@ts-ignore
  //     setData("");
  //   }, 3000);
  //   router.push("/auth/login");
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string); // Load the image into the cropper
        setShowCropper(true); // Show the cropper modal
        setImageFile(file);
        // setProfilePic(reader.result as string); // Update the state with the new image URL
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleCrop = () => {
  //   if (cropperRef.current) {
  //     const cropper = (cropperRef.current as any).cropper;
  //     const croppedImage = cropper.getCroppedCanvas().toDataURL(); // Get the cropped image data
  //     setCropData(croppedImage);
  //     setProfilePic(croppedImage); // Set the cropped image as the profile picture
  //     setShowCropper(false); // Hide the cropper modal
  //   }
  // };
  const handleCrop = () => {
    // Check if cropperRef.current exists and the cropper is initialized
    if (cropperRef.current && cropperRef.current.cropper) {
      const cropper = cropperRef.current.cropper; // TypeScript knows this is a Cropper instance
      const croppedImage = cropper.getCroppedCanvas().toDataURL(); // Get the cropped image data
      setCropData(croppedImage); // Set cropped image data
      setProfilePic(croppedImage); // Set cropped image as the profile picture
      setShowCropper(false); // Hide the cropper modal
    }
  };
  const updatesetting = async () => {
    setLoad(true);
    try {
      const formData = new FormData();

      formData.append("fullname", fullname);
      formData.append("insta", insta);
      formData.append("email", email);
      formData.append("snap", snap);
      formData.append("x", x);
      formData.append("linkdin", linkdin);
      formData.append("yt", yt);
      formData.append("bio", bio);
      formData.append("username", username);
      formData.append("phone", phone);
      if (cropData) {
        const blob = await fetch(cropData).then((res) => res.blob()); // Convert base64 to Blob
        formData.append(
          "profilepic",
          blob,
          imageFile?.name ? imageFile?.name : "profilepic.jpg"
        ); // Assuming profilepic.jpg as the filename
      }
      const res = await axios.post(`${API}/settings/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res?.data);
    } catch (e) {
      console.log(e);
    }
    setLoad(false);
  };

  useEffect(() => {
    if (!isLoading) {
      setFullname(data?.data?.fullname);
      setEmail(data?.data?.email);
      setBio(data?.data?.bio);
      setPhone(data?.data?.phone);
      setYt(data?.data?.yt);
      setUsername(data?.data?.username);
      setLinkdin(data?.data?.linkdin);
      setInsta(data?.data?.insta);
      setSnap(data?.data?.snap);
      setX(data?.data?.x);
    }
  }, [isLoading, data]);

  return (
    <div className="bg-white h-full">
      <div className="h-[50px] px-2 text-[16px] items-center border-b flex">
        Basic details
      </div>
      {isLoading ? (
        <div className="w-[100%] text-center justify-center items-center self-center flex">
          Loading....
        </div>
      ) : (
        <div
          style={{ height: "calc(100% - 50px)" }}
          className="space-y-4 p-6 overflow-auto w-full"
        >
          <div className="flex items-center gap-2 ">
            <div
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="h-[75px] w-[75px] rounded-[30px] border bg-white justify-center items-center flex"
            >
              <img
                src={profilePic || data?.data?.profilepic}
                alt="Profile"
                className="w-full h-full object-cover rounded-[30px] "
              />
            </div>
            <label
              htmlFor="profilePicUpload"
              className="text-[#307fff] cursor-pointer"
            >
              Change
            </label>
            <input
              id="profilePicUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload} // Handle the file upload
            />
            {/* Cropper modal */}
            {showCropper && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] flex flex-col items-center">
                  <Cropper
                    src={imageToCrop || ""}
                    style={{ height: 400, width: "100%" }}
                    aspectRatio={1}
                    guides={false}
                    ref={cropperRef}
                    viewMode={1}
                    dragMode="move"
                    autoCropArea={1}
                    background={false}
                    responsive
                  />
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={handleCrop}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowCropper(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* <div className="text-[#307fff]">Change</div> */}
          </div>
          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm  transition-transform ease-in-out duration-400"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="relative  rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-300 scale-95 hover:scale-100 "
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={profilePic || data?.data?.profilepic}
                  alt="Profile Large"
                  className=" max-w-[600px] max-h-[50vh] h-auto object-contain rounded-2xl" //w-[90vw]
                />
              </div>
            </div>
          )}
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl  text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Full Name</div>
              <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Enter you fullname"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Username</div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Enter your Username"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center ">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Email Address</div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                // value={email != undefined ? email : ""}
                className="px-2 outline-none w-full"
                placeholder="Enter your Email"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a] text-[14px]">Phone no</div>
              <div className="flex">
                <div className="text-[#999999]">+91</div>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  className="px-2 outline-none w-full"
                  placeholder="XXXXXXXXXXX"
                  type="number"
                />
              </div>
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Bio</div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="px-2 w-full outline-none"
                placeholder="Add a creative bio to attract others"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div>
            <div className="font-semibold">Social Media Links</div>
            <div className="text-[14px] text-[#999999]">
              Add Social accounts
            </div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <FaInstagram className="h-6 w-6 text-[#ff3fec]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Instagram</div>
              <input
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your Instagram link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>{" "}
          <div className="flex px-2 gap-2 items-center">
            <FaSnapchat className="h-6 w-6 text-[#dcff3f]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Snapchat</div>
              <input
                value={snap}
                onChange={(e) => setSnap(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your Snapchat link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>{" "}
          <div className="flex px-2 gap-2 items-center">
            <RiYoutubeLine className="h-6 w-6 text-[#ff3f3f]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">Youtube</div>
              <input
                value={yt}
                onChange={(e) => setYt(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your Youtube channel link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>{" "}
          <div className="flex px-2 gap-2 items-center">
            <FaLinkedin className="h-6 w-6 text-[#3f6cff]" />
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a]">LinkedIn</div>
              <input
                value={linkdin}
                onChange={(e) => setLinkdin(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your LinkedIn link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          <div className="flex px-2 gap-2 items-center">
            <div className="h-6 w-6">x</div>
            <div className="bg-white border rounded-xl text-[14px] p-2 w-full">
              <div className="text-[#6a6a6a] ">X</div>
              <input
                value={x}
                onChange={(e) => setX(e.target.value)}
                className="px-2 outline-none w-full"
                placeholder="Paste your X link"
              />
            </div>
            <div className="text-[#307fff]">Edit</div>
          </div>
          {/* Save and Cancel buttons */}
          <div className="flex gap-4 justify-end mt-4">
            <div
              className="bg-gray-300 text-gray-800 rounded-xl px-4 py-2"
              // onClick={handleCancel} // Define your cancel handler
            >
              Cancel
            </div>
            <div
              onClick={() => {
                if (!load) {
                  updatesetting();
                }
              }}
              className="bg-[#307fff] text-white rounded-xl px-4 py-2"
              // onClick={handleSave} // Define your save handler
            >
              {load ? "..." : "Save"}
            </div>
          </div>
          {/* <LogoutModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // onLogout={handleLogout}
          onLogout={deleteCookies} */}
          {/* /> */}
        </div>
      )}
    </div>
  );
};

export default Page;
