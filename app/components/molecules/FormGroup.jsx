const FormGroup = ({ label, children }) => {
    return (
      <div className="mt-4">
        <label className="block text-dark">{label}</label>
        {children}
      </div>
    );
  };
  
  export default FormGroup;