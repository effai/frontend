import * as React from "react";
import LogoIcon from "../icons/LogoIcon";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-12 justify-center px-6 py-8 mx-auto h-[80%] lg:py-0">
      <span className="flex items-center  text-2xl font-semibold dark:text-white">
        <LogoIcon/>
      </span>
      <div
        className="flex flex-col justify-center items-center p-10 w-full text-gray-300 shadow border-2 border-gray-400 rounded-lg mt-0 sm:max-w-md ">
        <h1>Not Found 404</h1>
        <p>Go to <a href="/login" className="underline">/login</a></p>
        <p>Or <a href="/posts" className="underline">/posts</a></p>
      </div>
    </div>
  );
};

export default NotFound;
