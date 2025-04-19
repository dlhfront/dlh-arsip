const SubmitButton = ({ className = "" }) => {
    return (
      <button
        type="submit"
        className={`bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors ${className}`}
      >
        Submit
      </button>
    );
  };
  
  export default SubmitButton;