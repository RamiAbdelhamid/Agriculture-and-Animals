import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Send,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      message:
        "Hello! How can I help you with your animal or agriculture questions today?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

  // Show back to top button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/contact/add",
        formData,
        {
          withCredentials: true,
        }
      );

      // Show success SweetAlert
      Swal.fire({
        title: "Thank You!",
        text: "Your message has been sent successfully. We'll get back to you soon!",
        icon: "success",
        confirmButtonText: "Great!",
        confirmButtonColor: "#16a34a",
      });

      setSuccess(response.data.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      // Show error SweetAlert
      Swal.fire({
        title: "Please login first",
        text: "You need to log in before sending a message.",
        icon: "warning",
        confirmButtonText: "Login",
        confirmButtonColor: "#16a34a",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page or show login modal
          window.location.href = "/login"; // Or your login logic here
        }
      });

      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add user message to chat
    setChatMessages([
      ...chatMessages,
      { sender: "user", message: userMessage },
    ]);

    // Simulate bot response based on keywords
    setTimeout(() => {
      let botResponse =
        "I'll have someone from our team get back to you on this question.";

      const lowerCaseMsg = userMessage.toLowerCase();
      if (
        lowerCaseMsg.includes("livestock") ||
        lowerCaseMsg.includes("animal")
      ) {
        botResponse =
          "Our livestock specialists can help with animal health, breeding, and management questions. Would you like me to connect you with a specialist?";
      } else if (
        lowerCaseMsg.includes("crop") ||
        lowerCaseMsg.includes("plant") ||
        lowerCaseMsg.includes("harvest")
      ) {
        botResponse =
          "Our crop experts can provide guidance on planting, fertilization, pest management, and harvesting. Do you need specific crop information?";
      } else if (
        lowerCaseMsg.includes("hours") ||
        lowerCaseMsg.includes("open")
      ) {
        botResponse =
          "Our office is open Monday-Friday from 8am to 5pm, and Saturday from 9am to 2pm. We're closed on Sundays.";
      } else if (
        lowerCaseMsg.includes("price") ||
        lowerCaseMsg.includes("cost") ||
        lowerCaseMsg.includes("fee")
      ) {
        botResponse =
          "Pricing varies by service. For a detailed quote, please fill out our contact form or call us directly at (555) 123-4567.";
      } else if (
        lowerCaseMsg.includes("location") ||
        lowerCaseMsg.includes("address") ||
        lowerCaseMsg.includes("where")
      ) {
        botResponse =
          "We're located at 123 Farm Road, Rural County, State 12345. You can view our location on the map below the contact form.";
      }

      setChatMessages((prev) => [
        ...prev,
        { sender: "bot", message: botResponse },
      ]);
    }, 1000);

    setUserMessage("");
  };

  const showWhatsAppAlert = () => {
    Swal.fire({
      title: "WhatsApp Us!",
      text: "Would you like to chat with us on WhatsApp?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, open WhatsApp",
      cancelButtonText: "Not now",
      confirmButtonColor: "#16a34a",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open("https://wa.me/1234567890", "_blank");
      }
    });
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Get In Touch
          </h1>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Have questions about livestock care, crop management, or
            agricultural solutions? Our team of experts is here to help you grow
            and succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-6 flex items-center">
              <Mail className="mr-2" size={24} /> Contact Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="Livestock Care">Livestock Care</option>
                  <option value="Crop Management">Crop Management</option>
                  <option value="Equipment">Agricultural Equipment</option>
                  <option value="Pricing">Pricing & Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  placeholder="Tell us how we can help with your farming or animal care needs..."
                ></textarea>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={showWhatsAppAlert}
                  className="flex-1 bg-green-50 border-2 border-green-600 text-green-700 py-3 px-6 rounded-lg hover:bg-green-100 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.6 6.32A8.4 8.4 0 0 0 12.08 4 8.5 8.5 0 0 0 4 12.5a8.42 8.42 0 0 0 1.27 4.5L4 21l4.14-1.09a8.5 8.5 0 0 0 3.94.99h.31A8.5 8.5 0 0 0 20.5 12.5a8.4 8.4 0 0 0-2.9-6.18zM12.08 19.7h-.28a7.06 7.06 0 0 1-3.6-1l-.25-.15-2.66.7.71-2.6-.16-.26a7.05 7.05 0 0 1-1.14-3.86 7.08 7.08 0 0 1 7.08-7.08c1.9 0 3.67.73 5 2.07a7 7 0 0 1 2.08 5.02 7.08 7.08 0 0 1-7.08 7.08zm3.9-5.28c-.21-.11-1.25-.62-1.45-.69-.2-.07-.34-.1-.48.1-.14.2-.54.69-.67.83-.12.14-.25.15-.46.05a5.8 5.8 0 0 1-2.9-2.54c-.22-.38.22-.35.62-1.16.07-.14.03-.25-.02-.36s-.48-1.16-.66-1.59c-.17-.41-.35-.36-.48-.36-.12 0-.26-.02-.4-.02a.77.77 0 0 0-.56.26 2.35 2.35 0 0 0-.73 1.74c0 1.03.75 2.02.86 2.16.1.14 1.47 2.25 3.57 3.16.5.21.89.34 1.19.44.5.16.96.14 1.32.08.4-.06 1.25-.5 1.42-1 .18-.48.18-.9.13-.99-.05-.08-.19-.14-.4-.24z" />
                  </svg>
                  WhatsApp Us
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-green-600 mt-1 mr-3" size={22} />
                <div>
                  <h3 className="font-medium text-gray-800">Our Location</h3>
                  <p className="text-gray-600">
                    Jordan, Zarqa
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-green-600 mt-1 mr-3" size={22} />
                <div>
                  <h3 className="font-medium text-gray-800">Phone</h3>
                  <p className="text-gray-600">(+962) 785956180</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-green-600 mt-1 mr-3" size={22} />
                <div>
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">info@farmfusion.com</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Business Hours
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 mb-2">Our Services</h3>
                <ul className="text-gray-600 list-disc pl-5 space-y-1">
                  <li>Livestock Health & Management</li>
                  <li>Crop Planning & Rotation</li>
                  <li>Sustainable Farming Practices</li>
                  <li>Equipment Sales & Rentals</li>
                  <li>Agricultural Consultations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-6 flex items-center">
            <MapPin className="mr-2" size={24} /> Find Us
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3895895885753!2d36.08776962490851!3d32.05870992034881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sar!2sjo!4v1742754671002!5m2!1sar!2sjo"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Chat Bot */}
      {/* <div
        className={`fixed bottom-20 right-6 z-20 ${
          chatOpen ? "w-80" : "w-auto"
        }`}
      >
        {chatOpen ? (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-green-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Farm Assistant</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white hover:text-green-200"
              >
                ×
              </button>
            </div>
            <div className="h-80 overflow-y-auto p-4 bg-green-50">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 ${
                    msg.sender === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-green-200"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="border-t p-2 flex">
              <input
                type="text"
                placeholder="Ask about our services..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded-r-lg"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
          >
            <MessageSquare size={24} />
          </button>
        )}
      </div> */}

      {/* Back to Top Button */}
      {/* {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors z-10"
        >
          <ArrowUp size={24} />
        </button>
      )} */}
    </div>
  );
};

export default ContactUs;
