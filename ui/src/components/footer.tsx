import * as React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="mt-20">
      <div className="flex w-full flex-col items-center justify-between text-center md:flex-row md:text-left ">
        <img className="h-12 bg-primary" src="/darklogo.jpeg" alt="M2 logo" />

        <div className="mb-6 font-light text-white">
          <p>Follow us on social media</p>

          <p>Download M2 app</p>

          <p>2024 M2 - All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
