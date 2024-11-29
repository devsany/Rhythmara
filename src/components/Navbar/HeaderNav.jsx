import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNav = () => {
  return (
    <header className=" sticky top-0 z-50 backdrop-blur-lg bg-white shadow-sm">
      <div className="flex  justify-between pt-2 pl-3 pb-2  ">
        <div className=" ">
          <NavLink to="/">
            <img
              className="w-[220px] rounded-lg"
              src="/logos/Rhythmara's_logo.png"
              alt=""
            />
          </NavLink>
        </div>
        <div className="flex">
          <div className=" ">{/* <input type="text" /> */}</div>
        </div>
        <div className="flex">
          <button>
            <div className="flex bg-blue-200 shadow-sm pl-2 pr-2 pt-1 pb-1 rounded-md">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
              <div className="font-semibold text-slate-900  pl-1"> LogIn</div>
            </div>
          </button>
          <button>
            {" "}
            <div className="flex bg-green-200 ml-2 mr-1 shadow-sm  pl-2 pr-2 pt-1 pb-1 rounded-md">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>

              <div className="font-semibold text-slate-900  pl-1"> SignUp</div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
