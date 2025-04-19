const DateInput = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className="mt-4">
      <label className="block text-dark">{label}</label>
      <input
        type="date"
        name={name}  // Make sure this is included
        value={value}
        onChange={onChange}
        className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-primary focus:border-transparent"
        required={required}
      />
    </div>
  );
};

export default DateInput;