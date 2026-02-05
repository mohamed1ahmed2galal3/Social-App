import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { changePasswordApi, uploadProfilePhotoApi } from '../Services/userService';

export default function UpdateProfilePage() {

    const { setIsLoggedIn , userData , setUserData  } = useContext(AuthContext);
    const fileInputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [uploadLoading, setUploadLoading] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')


    function handleImageChange(e) {
        const file = e.target.files[0]
        if (!file) return

        setSelectedImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }
    
    async function uploadProfilePhoto() {
    if (!selectedImage) return

    setUploadLoading(true)

    const formData = new FormData()
    formData.append('photo', selectedImage)

    const response = await uploadProfilePhotoApi(formData)

    if (response?.message === 'success') {
        setUserData(prev => ({
            ...prev,
            photo: previewImage || prev.photo
        }))

        setSelectedImage(null)
        setPreviewImage(null)
    }

    setUploadLoading(false)
    }

async function handleChangePassword() {
  setPasswordError('')
  setPasswordSuccess('')

  if (!oldPassword || !newPassword) {
    setPasswordError('Both fields are required')
    return
  }

  setPasswordLoading(true)

  const response = await changePasswordApi(oldPassword, newPassword)

  setPasswordLoading(false)

  if (response?.message === 'success') {
    setPasswordSuccess('Password updated successfully')
    setOldPassword('')
    setNewPassword('')
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
  } else {
    setPasswordError('Old password is incorrect')
  }
}

  return <>
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4">
    <div className="flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-8">

        {/* ================= Profile Header Section ================= */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md flex flex-col items-center">
          <div className="group">
            <div className="aspect-square w-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden">
              <img
                src={previewImage || userData?.photo}
                alt={userData?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="mt-4 text-center">
            <h1 className="text-gray-900 dark:text-white text-2xl font-bold">{userData?.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{userData?.email}</p>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="mt-6 w-full h-11 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
          >
            Change Photo
          </button>

          {selectedImage && (
            <button
              onClick={uploadProfilePhoto}
              disabled={uploadLoading}
              className="mt-3 w-full h-11 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {uploadLoading ? 'Uploading...' : 'Upload Photo'}
            </button>
          )}
        </section>

        {/* ================= Update Password Header ================= */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">lock</span>
          <h2 className="text-gray-900 dark:text-white text-xl font-bold">Update Password</h2>
        </div>

        {/* ================= Change Password Card ================= */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Use a strong password to protect your account.
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Old Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-300">Old Password</label>
              <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-gray-300">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* ================= Actions ================= */}
        <div className="flex flex-col gap-4">
          {passwordSuccess && <p className="text-green-500 text-sm">{passwordSuccess}</p>}
          <button
            onClick={handleChangePassword}
            disabled={passwordLoading}
            className="w-full h-14 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {passwordLoading ? 'Updating...' : 'Change Password'}
          </button>
        </div>

      </div>
    </div>
  </div>
</>

}
