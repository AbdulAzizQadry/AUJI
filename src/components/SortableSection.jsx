import { Plus, Trash, ArrowUp, ArrowDown } from "lucide-react";

export default function SortableSection({
  title,
  items,
  setItems,
  emptyItem,
  renderForm,
  itemLabel = (item, index) => `${title} ${index + 1}`,
  gender = "f",
}) {
  const addItem = () => setItems([...items, emptyItem]);

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...items];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setItems(updated);
  };

  const moveDown = (index) => {
    if (index === items.length - 1) return;
    const updated = [...items];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setItems(updated);
  };

  return (
    <div className="space-y-4" dir="rtl">
      {items.map((item, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-sm relative">
          <h3 className="font-semibold mb-4">{itemLabel(item, index)}</h3>

          {renderForm(item, index)}

          {items.length > 1 && (
            <div className="absolute top-4 left-4 flex gap-2">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className={`${
                  index === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ArrowUp size={18} />
              </button>

              <button
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className={`${
                  index === items.length - 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ArrowDown size={18} />
              </button>

              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={18} />
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <Plus size={18} /> اضافة {title} {gender === "m" ? "جديد" : "جديدة"}
      </button>
    </div>
  );
}
