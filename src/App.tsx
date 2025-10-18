import { useState } from "react";
import Button from "./components/Button";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="min-h-screen relative bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-teal-500 text-white p-4 w-full absolute top-0 left-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <h2 className="text-xl font-semibold">Saving Segment</h2>
      </div>
      <Button onClick={() => setIsPopupOpen(true)} variant="primary">
        Save segment
      </Button>

      {/* The Popup Component */}
      {isPopupOpen && <>Popup</>}
    </div>
  );
}

export default App;
