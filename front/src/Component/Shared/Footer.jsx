import React from "react";
import "../CSS/Footer.css"
const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
              <p className="text-lg mt-2 mb-4">
                Find us on any of these platforms, we respond within one
                business day.
              </p>
              <div className="flex mt-6">
                <button className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
                  <i className="fab fa-instagram"></i>
                </button>
                <button className="bg-white text-green-500 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2">
                  <i className="fab fa-whatsapp"></i>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="flex flex-wrap mb-6">
                <div className="w-full lg:w-6/12 px-4">
                  <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                    Store Pages
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-300 hover:text-gray-500 block pb-2 text-sm"
                        href="#"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-300 hover:text-gray-500 block pb-2 text-sm"
                        href="#"
                      >
                        Shop
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-300 hover:text-gray-500 block pb-2 text-sm"
                        href="#"
                      >
                        Contact
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-300 hover:text-gray-500 block pb-2 text-sm"
                        href="#"
                      >
                        About Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-gray-300 hover:text-gray-500 block pb-2 text-sm"
                        href="#"
                      >
                        Create New Account?
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-300 hover:text-gray-500 block pb-2 text-sm"
                        href="#"
                        target="_blank"
                      >
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-gray-300 hover:text-gray-500 block pb-2 text-sm"
                        href="#"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-500" />
          <div className="flex justify-center items-center">
            <div className="text-sm text-gray-500 py-1">
              Copyright © 2025   <span className="text-gray-500">
             
               Farmfusion Team
               </span>
                 
               
             
            </div>
          </div>
        </div>
      </footer>
    </>
  );

};

export default Footer;
