import { useState } from "react";

export default function FormInputSuggest({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  options = [],
  ...props
}) {
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange(e);

    if (val.length > 0) {
      const f = options.filter((opt) =>
        opt.toLowerCase().includes(val.toLowerCase())
      );
      setFiltered(f);
    } else {
      setFiltered([]);
    }
  };

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setFiltered([]);
  };

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder || label}
        autoComplete="off"
        className="peer w-full border rounded p-2 placeholder-transparent focus:outline-none focus:border-blue-500 bg-white caret-blue-500 text-right"
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

      {filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto shadow">
          {filtered.map((opt, i) => (
            <li
              key={i}
              onClick={() => handleSelect(opt)}
              className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
