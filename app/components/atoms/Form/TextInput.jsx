const TextInput = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className="mt-4">
      <label className="block text-dark">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}  // This must be connected
        className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-primary focus:border-transparent"
        required={required}
      />
    </div>
  );
};

export default TextInput;