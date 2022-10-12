import spinner from "../assets/svg/spinner.svg";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex-cc z-[60]">
      <div>
        <img src={spinner} alt="Loading" className="h-24" />
      </div>
    </div>
  );
};

export default Spinner;
