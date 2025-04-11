import React from "react";
import { SyncLoader } from "react-spinners";

const Loader = ({ show = false, message = "Loading..." }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-400/60 flex flex-col items-center justify-center">
      <SyncLoader color="#7c3aed" size={10} />
      <p className="mt-4 font-medium text-lg animate-pulse" style={{ color: '#7c3aed' }}>{message}</p>
    </div>
  );
};

export default Loader;
