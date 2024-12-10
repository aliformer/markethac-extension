import React, { useState, type ComponentProps, type PropsWithChildren, type PropsWithoutRef } from "react";

const ArrayInput = ( {items, setItems, handler, placeholder, ...props} : ComponentProps<any> ) => {
  const [inputValue, setInputValue] = useState("");
  const handleAddItem = 
  (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault(); // Prevent form submission or default behavior
      addTags(inputValue);
      setInputValue(""); // Clear input after processing
    }
      
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const addTags = (value: string) => {
    // Split input by spaces, commas, or newlines
    const newItems = value
      .split(/[\n\s,]+/) // Regex to split by spaces, commas, or newlines
      .map((tag) => tag.trim()) // Trim whitespace
      .filter((tag) => tag && !items.includes(tag)); // Filter empty strings and duplicates
    setItems([...items, ...newItems]);
  };
const handleBlur = (e) => {
  if (inputValue.trim()) {
    addTags(inputValue);
    setInputValue("");
  }
}
  return (
    <div className="mx-auto max-h-[100px] overflow-y-scroll">
       <div className="w-full max-w-md border-2 ">
      <div className="flex flex-wrap items-center gap-2 p-2 bg-white">
        {items?.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-red-100 text-red-800  rounded-sm px-3 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              className="ml-2 text-red-600 hover:text-red-800 rounded-sm"
              onClick={() => handleRemoveItem(index)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onBlur={handleBlur}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddItem}
          className="flex-grow bg-white *:min-w-[120px] border-none focus:outline-none text-sm px-2 py-1"
        />
      </div>
    </div>
    </div>
  );
};

export default ArrayInput;
