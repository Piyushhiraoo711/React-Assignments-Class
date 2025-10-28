import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      {console.log(theme)}
      <div
        className={`flex justify-center items-center flex-col mx-auto h-screen ${
          theme === "dark" ? "bg-black text-white" : " bg-white text-black"
        }`}
      >
        <h2 className="font-bold my-3">Get in Touch</h2>
        <p>
          Have feedback, suggestions, or facing an issue? We’d love to hear from
          you!
        </p>
        <div className="flex flex-col my-3">
          <h2 className="font-bold"> Our goal is simple:</h2>
          <ul>
            <li>📧 Email: xyz@movieapp.com</li>
            <li>🌐 Website: www.movieapp.com</li>
            <li>📍 Address: Movie App Center , Indore (India)</li>
          </ul>
        </div>
        <h4>You can also reach out to us through our social channels:</h4>
        <ul>
          <li>Twitter: @movieapp</li>
          <li>Instagram: @movieapp_official</li>
          <li>FaceBook @movieapp_facebook.com</li>
        </ul>
        <h3>
          Your thoughts and feedback help us improve and bring more exciting
          features — from smart recommendations to theme customization and a
          seamless user experience.
        </h3>
      </div>
    </>
  );
};
export default Contact;
