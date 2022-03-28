/** @format */

import { Routes, Route } from "react-router-dom";
import Join from "../components/Join";
import Chat from "../components/Chat";

const AllRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AllRouter;
