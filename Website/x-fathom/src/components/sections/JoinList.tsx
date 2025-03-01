"use client";

import { useState, useRef } from "react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export default function JoinList() {
  // State for each input field
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  // References to the form elements
  const nameFormRef = useRef<HTMLFormElement>(null);
  const emailFormRef = useRef<HTMLFormElement>(null);
  const messageFormRef = useRef<HTMLFormElement>(null);
  
  // Input references
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  // Replace with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby1g-FlG1YnnTpPQM7NTo0ZPAPew0v1EJ917eY1jWIfn13UOxYwfqxwD01uhOLUnQeDjQ/exec";

  // Placeholders for different input fields
  const namePlaceholders = [
    "Enter your name...",
    "What's your name?",
    "Your name goes here...",
  ];
  
  const emailPlaceholders = [
    "Enter your email address...",
    "Where can we reach you?",
    "Your email goes here...",
  ];
  
  const messagePlaceholders = [
    "Leave a message...",
    "Tell us what you're looking for...",
    "Any questions for us?",
  ];

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle changes for each field
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };

  // Handle key down events for field navigation (no animation)
  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }
  };

  const handleMessageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      // If all fields are valid, trigger submit
      if (nameValue.trim() && emailValue.trim() && isValidEmail(emailValue)) {
        handleSubmit();
      }
    }
  };

  // Prevent default form submission (to avoid animation during navigation)
  const preventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Handle main form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!nameValue.trim()) {
      setMessage({
        text: "Please enter your name",
        type: "error"
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
      return;
    }
    
    if (!emailValue.trim()) {
      setMessage({
        text: "Please enter your email address",
        type: "error"
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }
    
    if (!isValidEmail(emailValue)) {
      setMessage({
        text: "Please enter a valid email address",
        type: "error"
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    setIsLoading(true);

    // Now trigger the animations for all fields simultaneously
    triggerAnimations();
    
    // Submit data after a delay to allow animations to start
    setTimeout(submitToGoogleSheet, 500);
  };
  
  // Trigger animations for all fields
  const triggerAnimations = () => {
    if (nameFormRef.current && nameInputRef.current) {
      // Force trigger the animation by using the vanishText method from the PlaceholdersAndVanishInput component
      if (typeof nameInputRef.current.vanishText === 'function') {
        nameInputRef.current.vanishText();
      }
    }
    
    if (emailFormRef.current && emailInputRef.current) {
      if (typeof emailInputRef.current.vanishText === 'function') {
        emailInputRef.current.vanishText();
      }
    }
    
    if (messageFormRef.current && messageInputRef.current) {
      if (typeof messageInputRef.current.vanishText === 'function') {
        messageInputRef.current.vanishText();
      }
    }
  };

  // Submit data to Google Sheet
  const submitToGoogleSheet = async () => {
    try {
      // Build URL with all form data
      const url = `${GOOGLE_SCRIPT_URL}?name=${encodeURIComponent(nameValue)}&email=${encodeURIComponent(emailValue)}&message=${encodeURIComponent(messageValue)}&timestamp=${encodeURIComponent(new Date().toISOString())}`;
      
      // Send data to Google Sheet
      await fetch(url, {
        method: "GET",
        mode: "no-cors",
        cache: "no-cache",
      });
      
      // Show success message
      setMessage({
        text: "Thank you for your submission!",
        type: "success"
      });
      
      // Store in localStorage as backup
      const storedSubmissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
      storedSubmissions.push({ 
        name: nameValue, 
        email: emailValue, 
        message: messageValue, 
        timestamp: new Date().toISOString() 
      });
      localStorage.setItem("formSubmissions", JSON.stringify(storedSubmissions));
      
      // Wait for animations to complete before resetting
      setTimeout(() => {
        // Reset form
        setNameValue("");
        setEmailValue("");
        setMessageValue("");
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage({
        text: "Something went wrong. Please try again later.",
        type: "error"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="h-auto py-16 sm:py-20 flex flex-col justify-center items-center px-4 relative">
      <h2 className="mb-10 sm:mb-16 text-xl text-center sm:text-5xl dark:text-white text-black">
        <span className="">Let's Connect Drop your details</span>
        
        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
          <span className="">We'd love to hear from you!</span>
        </div>  
      </h2>
      
      <div className="w-full max-w-xl mx-auto space-y-6 mb-8">
        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 pl-4">
            Name
          </label>
          <form ref={nameFormRef} onSubmit={preventSubmit}>
            <PlaceholdersAndVanishInput
              placeholders={namePlaceholders}
              onChange={handleNameChange}
              onSubmit={preventSubmit}
              inputRef={nameInputRef}
              customKeyDown={handleNameKeyDown}
              preventAnimation={true}
            />
          </form>
        </div>
        
        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 pl-4">
            Email Address
          </label>
          <form ref={emailFormRef} onSubmit={preventSubmit}>
            <PlaceholdersAndVanishInput
              placeholders={emailPlaceholders}
              onChange={handleEmailChange}
              onSubmit={preventSubmit}
              inputRef={emailInputRef}
              customKeyDown={handleEmailKeyDown}
              preventAnimation={true}
            />
          </form>
        </div>
        
        {/* Message Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 pl-4">
            Message
          </label>
          <form ref={messageFormRef} onSubmit={preventSubmit}>
            <PlaceholdersAndVanishInput
              placeholders={messagePlaceholders}
              onChange={handleMessageChange}
              onSubmit={preventSubmit}
              inputRef={messageInputRef}
              customKeyDown={handleMessageKeyDown}
              preventAnimation={true}
            />
          </form>
        </div>
        
        {/* Submit button */}
        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !nameValue.trim() || !emailValue.trim() || !isValidEmail(emailValue)}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
      
      {/* Message display - success, error, warning */}
      {message.text && (
        <div className={`mt-4 px-4 py-2 rounded-md text-sm transition-opacity duration-300
          ${message.type === "success" ? "bg-green-100 text-green-800" : ""}
          ${message.type === "error" ? "bg-red-100 text-red-800" : ""}
          ${message.type === "warning" ? "bg-yellow-100 text-yellow-800" : ""}
        `}>
          {message.text}
        </div>
      )}
    </div>
  );
}