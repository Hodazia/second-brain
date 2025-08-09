import { useState } from 'react';
import Background from './Background';
import CreateContent from "./Create"
import SidebarControl from './Sidebar';
import Wrongpage404 from './Notauthorized'; // Corrected import name

interface FuncProps {
  data?: Card[];
  shared?: boolean;
}

interface Card {
  _id: string;
  title: string;
  content: string;
  linkType: string;
  link: string;
  description: string;
  tags: string[];
}

const DashBoard: React.FC<FuncProps> = ({ data, shared }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCardUpdated, setCardUpdated] = useState(false);
  const token = localStorage.getItem('token');

  const handleModalClose = () => {
    setModalOpen(false);
    setCardUpdated((prev) => !prev);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };


  if (!token && !shared) {
    return (
      <Wrongpage404 />
    );
  }

  return (
    // Changed background to a light shade and text to a dark shade
    <div className="bg-gray-50 min-h-screen font-janeLight text-gray-800 flex overflow-hidden transition-all duration-500">
      <CreateContent shared={shared} open={isModalOpen} onClose={handleModalClose} />
      <SidebarControl shared={shared}/>
      <Background
        cardRender={isCardUpdated}
        shared={shared}
        //@ts-ignore
        data={data}
        onClickopen={handleModalOpen}
      />
    </div>
  );
};

export default DashBoard;