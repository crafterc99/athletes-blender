import clsx from "clsx";

const INGREDIENT_COLORS = {
  "Almond Milk": "#F5E6D3",
  "Soy Milk": "#FFF8E1",
  "Coconut Milk": "#FAFAFA",
  "Coconut Water": "#E0F7FA",
  "Orange Juice": "#FFE0B2",
  "Cranberry Juice": "#FFCDD2",
  "Apple Juice": "#FFF9C4",
  "Lemon Juice": "#FFF9C4",
  "Pomegranate Juice": "#F8BBD0",
  Strawberry: "#FFCDD2",
  Blueberry: "#C5CAE9",
  Kiwi: "#C8E6C9",
  Mango: "#FFE0B2",
  Banana: "#FFF9C4",
  Pineapple: "#FFF59D",
  Raspberries: "#F48FB1",
  Peaches: "#FFE0B2",
  Spinach: "#A5D6A7",
  Kale: "#81C784",
  Cuties: "#FFCC80",
  Honey: "#FFE082",
  Cucumber: "#C8E6C9",
  "Peanut Butter": "#D7CCC8",
};

export default function IngredientCard({
  name,
  selected = false,
  count = 0,
  isPaid = false,
  onAdd,
  onRemove,
}) {
  const bgColor = INGREDIENT_COLORS[name] || "#F0F0F0";

  return (
    <div
      className={clsx(
        "rounded-2xl border overflow-hidden transition-all duration-150 bg-white",
        selected
          ? "border-green shadow-sm"
          : "border-gray-200 hover:border-gray-300"
      )}
    >
      {/* Image placeholder */}
      <div
        className="h-32 w-full flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-2xl font-bold text-black/10 select-none">
          {name.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="p-3 text-center">
        <h4 className="text-sm font-semibold mb-2">{name}</h4>
        {isPaid && (
          <p className="text-[11px] text-gray-400 mb-2">+$1.00</p>
        )}

        {count > 0 ? (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onRemove}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              &minus;
            </button>
            <span className="w-6 text-center font-semibold tabular-nums">
              {count}
            </span>
            <button
              onClick={onAdd}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={onAdd}
            className="w-full bg-green text-white text-sm font-semibold py-2 rounded-full hover:bg-green-dark transition-colors cursor-pointer"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
