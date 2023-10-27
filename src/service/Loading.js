import React from "react";
import { SyncLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="loadingContainer">
      <h3>Loading</h3>
      <img className="loadingImg" src="/img/loading.png" />
      <SyncLoader />
    </div>
  );
};

export default Loading;
