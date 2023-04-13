const IndexBtn = ({ text, onClick, backgroundColor }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90px",
        height: "35px",
        border: "transparent",
        marginLeft: "10px",
        cursor: "pointer",
        backgroundColor: backgroundColor,
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
export default IndexBtn;
