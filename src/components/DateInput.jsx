import { useState, useRef, useEffect } from "react";
import "react-day-picker/dist/style.css";

export default function DateInput({
  label,
  name,
  value,
  onChange,
  minDate,
  maxDate,
  allowPresent = false,
}) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const [year, setYear] = useState(
    value && value !== "present" ? value.getFullYear() : new Date().getFullYear()
  );
  const [isPresent, setIsPresent] = useState(value === "present");

  const months = [
    "January","February","March",
    "April","May","June",
    "July","August","September",
    "October","November","December"
  ];

  const formatDate = (date) => {
    if (!date) return "";
    if (date === "present") return "Present";
    const month = date.toLocaleString("en", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  const today = new Date();
  const max = maxDate || new Date(today.getFullYear(), today.getMonth(), 1);
  const min = minDate || new Date(1900, 0, 1);

  const isDisabled = (date) => date < min || date > max;

  return (
    <div className="relative" ref={pickerRef}>
      <input
        id={name}
        name={name}
        type="text"
        readOnly
        value={formatDate(value)}
        onClick={() => setShowPicker(!showPicker)}
        placeholder={label}
        className="peer w-full border rounded p-2 placeholder-transparent 
                   focus:outline-none focus:border-blue-500 bg-white caret-blue-500 
                   text-left cursor-pointer"
      />
      <label
        htmlFor={name}
        className="absolute right-2 -top-2.5 text-gray-500 text-sm bg-white px-1 transition-all
                   peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 pointer-events-none"
      >
        {label}
      </label>

      {showPicker && (
        <div className="absolute z-20 mt-2 bg-white border rounded-lg shadow-lg p-4 w-70" dir="ltr">
          <div className="flex items-center justify-between mb-4">
            <button
              className="p-1 text-blue-600 hover:bg-gray-100 rounded"
              onClick={() => setYear(year - 1)}
              disabled={new Date(year - 1, 11, 1) < min}
            >
              ‹
            </button>
            <span className="font-semibold">{year}</span>
            <button
              className="p-1 text-blue-600 hover:bg-gray-100 rounded"
              onClick={() => setYear(year + 1)}
              disabled={new Date(year + 1, 0, 1) > max}
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((month, idx) => {
              const date = new Date(year, idx, 1);
              const disabled = isDisabled(date) || isPresent;
              return (
                <button
                  key={month}
                  disabled={disabled}
                  className={`p-2 rounded ${
                    disabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-blue-100"
                  } ${
                    value &&
                    value !== "present" &&
                    value.getMonth() === idx &&
                    value.getFullYear() === year
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => {
                    if (!disabled) {
                      onChange(date);
                      setShowPicker(false);
                    }
                  }}
                >
                  {month}
                </button>
              );
            })}
          </div>
          
          {allowPresent && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center gap-2 mt-2">
                <div
                  onClick={() => {
                    setIsPresent(!isPresent);
                    onChange(!isPresent ? "present" : "");
                  }}
                  className={`relative h-4 w-8 flex items-center rounded-full cursor-pointer transition ${
                    isPresent ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 h-2 w-2 transform rounded-full bg-white shadow transition ${
                      isPresent ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className="text-sm text-gray-600">Currently work there</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
