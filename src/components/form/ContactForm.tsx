import React, { useState } from "react";

export const ContactForm = () => {
  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    setIsEmailValid(true);
    console.log({ name, email, message });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[485px]">
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-transparent border-b border-gray-600 focus:border-border-light outline-none py-2 px-1"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setIsEmailValid(validateEmail(email))}
        className={`bg-transparent outline-none py-2 px-1 border-b ${
          isEmailValid
            ? "border-gray-600 focus:border-border-light"
            : "border-red-500 focus:border-red-500"
        }`}
      />
      <textarea
        placeholder="Tell me what’s on your mind"
        maxLength={1000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-transparent border border-gray-600 focus:border-border-light outline-none py-2 px-3 resize-none h-32"
      />
      <button
        type="submit"
        className="border border-border-subtle px-4 py-2 self-end hover:bg-background-light cursor-pointer"
      >
        Send
      </button>
    </form>
  );
};
