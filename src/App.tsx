import { useState } from "react";
import Button from "./components/Button";
import SegmentPopup from "./components/SegmentPopup";
import ChevronLeftIcon from "./components/common/ChevronLeftIcon";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen relative bg-gray-500 p-8 flex justify-center items-center">
      <div className="bg-[#39aebc] text-white p-4 w-full absolute top-0 left-0 flex items-center">
        <ChevronLeftIcon />
        <h2 className="text-xl font-semibold">View Audience</h2>
      </div>
      <Button onClick={() => setIsPopupOpen(true)} variant="secondary">
        Save segment
      </Button>

      {/* The Popup Component */}
      {isPopupOpen && <SegmentPopup onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
}

export default App;
