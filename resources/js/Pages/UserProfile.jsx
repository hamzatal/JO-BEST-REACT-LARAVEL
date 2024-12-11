import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Pen, 
  Save, 
  Camera, 
  UserCircle2,
  FileText 
} from 'lucide-react';
import NavBar from "../components/NavBar";

const UserProfile = ({ user }) => {
    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar || '/default-avatar.png',
        bio: user?.bio || 'No bio available'
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile(prev => ({
                    ...prev,
                    avatar: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        // Implement save logic here
        console.log('Saving profile:', profile);
        setIsEditing(false);
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <NavBar isDarkMode={true} />
            
            <div className="container mx-auto px-4 py-8 pt-48">
                <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center space-x-4">
                            <UserCircle2 className="w-10 h-10 text-red-600" />
                            <h1 className="text-3xl font-bold text-white">Profile</h1>
                        </div>
                        {!isEditing ? (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="flex items-center bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
                            >
                                <Pen className="mr-2 h-5 w-5" /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSaveProfile}
                                    className="flex items-center bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
                                >
                                    <Save className="mr-2 h-5 w-5" /> Save Changes
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <img 
                                    src={profile.avatar} 
                                    alt="Profile Avatar" 
                                    className="w-48 h-48 rounded-full object-cover border-4 border-red-700 shadow-lg"
                                />
                                {isEditing && (
                                    <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                        <Camera className="text-white h-10 w-10" />
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden"
                                            onChange={handleAvatarUpload}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="flex-grow space-y-6">
                            {isEditing ? (
                                <>
                                    <div className="flex items-center space-x-3">
                                        <User className="w-6 h-6 text-red-600" />
                                        <div className="flex-grow">
                                            <label className="block text-sm font-medium mb-2 text-white">Name</label>
                                            <input 
                                                type="text"
                                                name="name"
                                                value={profile.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-6 h-6 text-red-600" />
                                        <div className="flex-grow">
                                            <label className="block text-sm font-medium mb-2 text-white">Email</label>
                                            <input 
                                                type="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-red-600 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <FileText className="w-6 h-6 text-red-600 mt-2" />
                                        <div className="flex-grow">
                                            <label className="block text-sm font-medium mb-2 text-white">Bio</label>
                                            <textarea 
                                                name="bio"
                                                value={profile.bio}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 h-24 text-white focus:ring-2 focus:ring-red-600 transition-all"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <div className="flex items-center space-x-3">
                                            <User className="w-6 h-6 text-red-600" />
                                            <div>
                                                <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 mt-2">
                                            <Mail className="w-6 h-6 text-red-600" />
                                            <p className="text-gray-400">{profile.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <FileText className="w-6 h-6 text-red-600" />
                                            <h3 className="text-lg font-medium text-white">Bio</h3>
                                        </div>
                                        <p className="text-gray-300">{profile.bio}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;