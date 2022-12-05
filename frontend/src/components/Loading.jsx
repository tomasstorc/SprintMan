import ClipLoader from "react-spinners/ClipLoader";
const Loading = ({ text = "Loading" }) => {
  return (
    <div className="text-center">
      <ClipLoader />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
