import React from 'react';

import { HomeIcon, BookmarkIcon } from '@heroicons/react/solid';
import { CogIcon, MapIcon } from '@heroicons/react/outline';

const Sidenav = () => {
  return (
    <aside
      className="flex flex-col items-center flex-none text-center text-gray-400 bg-white border-r"
      aria-label="Sidebar"
    >
      <div className="flex items-center w-full h-16">
        <MapIcon className="w-6 h-6 mx-auto" />
      </div>
      <ul>
        <li>
          <a
            className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100"
            href="#"
          >
            <HomeIcon className="w-4 h-4 mr-3" />
            <span>Sidenav link 1</span>
          </a>
        </li>
        <li className="relative">
          <a
            className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100"
            href="#"
          >
            <BookmarkIcon className="w-4 h-4 mr-3" />
            <span>Sidenav link 2</span>
          </a>
        </li>
        <li className="relative">
          <a
            className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100"
            href="#"
          >
            <CogIcon className="w-4 h-4 mr-3" />
            <span>Sidenav link 3</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidenav;
