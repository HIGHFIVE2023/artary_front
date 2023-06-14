import React from "react";

const EmotionItem = ({ emotion_id, emotion_img, onClick, isSelected }) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem-on-${emotion_id}` : `EmotionItem-off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
    </div>
  );
};
export default React.memo(EmotionItem);
