export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        rows={rows}
        autoComplete="off"
        className="peer w-full border rounded p-2 placeholder-transparent focus:outline-none focus:border-blue-500 bg-white caret-blue-500 text-left resize-none"
        {...props}
      />
      <label
        htmlFor={name}
        className="absolute right-2 -top-2.5 text-gray-500 text-sm bg-white px-1 transition-all
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}
