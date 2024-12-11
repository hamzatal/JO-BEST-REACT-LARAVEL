import React, { useState } from "react";
import { Home, Clapperboard, Send, Linkedin, Github } from "lucide-react";
import { Link } from "@inertiajs/react";

const TeamMember = ({ name, role, linkedin, github }) => (
    <div className="bg-gray-800 bg-opacity-70 rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="w-32 h-32 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center text-4xl font-bold text-red-500">
            {name.split(' ')[0][0] + name.split(' ')[1][0]}
        </div>
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-gray-400 mb-4">{role}</p>
        <div className="flex justify-center space-x-4">
            {linkedin && (
                <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-red-500 transition-colors"
                >
                    <Linkedin className="w-6 h-6" />
                </a>
            )}
            {github && (
                <a 
                    href={github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-red-500 transition-colors"
                >
                    <Github className="w-6 h-6" />
                </a>
            )}
        </div>
    </div>
);

const AboutUsPage = () => {
    const movieBackground = "/images/background.jpg";
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    

    const [status, setStatus] = useState({
        success: null,
        message: ''
    });

   
    const teamMembers = [
        {
            name: "Hamza Al Tal",
            role: "Product Owner",
            linkedin: "https://www.linkedin.com/in/hamza-tal/",
            github: "https://github.com/hamzatal"
        },
        {
            name: "Salem Qundil",
            role: "Developer",
            linkedin: "https://www.linkedin.com/in/salem-qundil/",
            github: "https://github.com/salemqundil"
        },
        {
            name: "Reem Swaiti",
            role: "Scrum Master",
            linkedin: "https://www.linkedin.com/in/reem-swaiti-85a565277/",
            github: "https://github.com/reemsweity"
        },
        {
            name: "Haneen Abumazrou",
            role: "Developer",
            linkedin: "https://www.linkedin.com/in/haneen-abumazrou/",
            github: "https://github.com/HaneenAbumazrou"
        },
        {
            name: "Mohammad Alashhab",
            role: "Developer",
            linkedin: "https://www.linkedin.com/in/mohamad-alashhab-6a492b1ba/",
            github: "https://github.com/mohammad-alashhab"
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/contacts', formData);
            setStatus({ success: true, message: response.data.message });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus({
                success: false,
                message: error.response?.data?.message || 'An error occurred.'
            });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background with Opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
                style={{
                    backgroundImage: `url(${movieBackground})`,
                }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Navbar */}
                <nav className="flex justify-between items-center p-6">
                    <div className="flex items-center">
                        <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
                        <h1 className="text-3xl font-bold">
                            JO <span className="text-red-500">BEST</span>
                        </h1>
                    </div>
                    <Link
                        href={route("home")}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-transform transform hover:scale-105 flex items-center"
                    >
                        Home <Home className="ml-2 w-5 h-5" />
                    </Link>
                </nav>

                {/* About Us Content */}
                <div className="container mx-auto px-6 py-6 flex flex-col items-center justify-center">
                    <div className="text-center max-w-4xl mb-12">
                        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                            About JO <span className="text-red-500"> BEST</span>
                        </h1>
                        <p className="text-xl mb-8 leading-relaxed">
                            At JO BEST, we believe movies are more than just entertainment—they're an experience.
                            Our mission is to bring cinematic magic to everyone, everywhere, by offering a curated
                            collection of blockbuster hits, hidden gems, and exclusive originals.
                        </p>
                        <p className="text-xl mb-8 leading-relaxed">
                            Founded with a passion for storytelling, JO BEST is committed to delivering high-quality
                            streaming services and fostering a community of movie lovers. We aim to redefine how you experience entertainment,
                            whether you're a casual viewer or a cinema aficionado.
                        </p>
                        <p className="text-xl mb-8 leading-relaxed">
                            Join us as we bring the silver screen closer to you—because at JO BEST, the magic of movies never stops.
                        </p>
                    </div>

                    {/* Team Members Section */}
                    <div className="w-full max-w-6xl mb-16">
                        <h2 className="text-4xl font-bold mb-10 text-center">Our <span className="text-red-500">Team</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {teamMembers.map((member, index) => (
                                <TeamMember 
                                    key={index}
                                    name={member.name}
                                    role={member.role}
                                    linkedin={member.linkedin}
                                    github={member.github}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <h1 className="text-4xl font-bold mb-6 text-center text-white">
                    We Would Love to Hear From You!</h1>
                    
                    <div className="w-full max-w-xl bg-gray-800 bg-opacity-70 rounded-xl p-8 shadow-2xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center text-white">
        Contact <span className="text-red-500">Us</span> 
    </h1>
    {status.message && (
        <div
            className={`mb-4 p-4 rounded-lg ${
                status.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
        >
            {status.message}
        </div>

    )}
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
            </label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                placeholder="Enter your name"
                required
            />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                placeholder="Enter your email"
                required
            />
        </div>
        <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
            </label>
            <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                placeholder="Enter the subject"
                required
            />
        </div>
        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
            </label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                rows="5"
                placeholder="Write your message here..."
                required
            ></textarea>
        </div>
        <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
        >
            Submit
        </button>
    </form>
</div>

                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;