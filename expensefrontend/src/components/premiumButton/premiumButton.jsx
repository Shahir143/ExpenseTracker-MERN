import React from "react";

export const DownloadButton = ({ onClickHandler }) => {
  return (
    <button
      onClick={() => {
        onClickHandler();
      }}
    >
      Buy Premium
    </button>
  );
};
