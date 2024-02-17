import React, { useState } from 'react';

function Centigrados() {
  const [activeButton, setActiveButton] = useState('celsius');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="ml-[930px] flex space-x-4 right-0">
      <button
        className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
          activeButton === 'celsius' ? 'bg-blue-1 text-white' : 'bg-white text-black'
        } hover:bg-gray-300`}
        onClick={() => handleButtonClick('celsius')}
      >
        °C
      </button>
      <button
        className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer ${
          activeButton === 'fahrenheit' ? 'bg-blue-1 text-white' : 'bg-white text-black'
        } hover:bg-gray-300`}
        onClick={() => handleButtonClick('fahrenheit')}
      >
        °F
      </button>
    </div>
  );
}

export default Centigrados;
