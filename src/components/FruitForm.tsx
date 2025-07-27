export const FruitForm: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
  errors: ValidationErrors;
}> = ({ formData, setFormData, onSubmit, onCancel, isEditing, errors }) => {
  const fruitOptions = [
    "Banana", "Cherry", "Apple", "Orange", "Watermelon",
    "Mango", "Grapes", "Strawberry", "Peach", "Pineapple",
  ];

  const fruitColors = {
    Apple: ["Red", "Green", "Yellow"],
    Banana: ["Yellow", "Green"],
    Orange: ["Orange"],
    Mango: ["Yellow", "Orange"],
    Grapes: ["Purple", "Green", "Red"],
    Strawberry: ["Red"],
    Watermelon: ["Green"],
    Pineapple: ["Yellow"],
    Peach: ["Pink", "Orange"],
    Cherry: ["Red", "Dark Red"],
  };

  const validateField = (field: string, value: any) => {
    if (fruitSchema[field]) {
      return fruitSchema[field].validate(value);
    }
    return { success: true, error: null };
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {isEditing ? "Edit Fruit" : "Add New Fruit"}
      </h3>
      
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fruit *
          </label>
          <select
            value={formData.productName}
            onChange={(e) => {
              handleFieldChange("productName", e.target.value);
              handleFieldChange("color", ""); // Reset color when fruit changes
            }}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.productName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Select Fruit</option>
            {fruitOptions.map((fruit) => (
              <option key={fruit} value={fruit}>{fruit}</option>
            ))}
          </select>
          {errors.productName && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle size={14} className="mr-1" />
              {errors.productName}
            </div>
          )}
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Color *
          </label>
          <select
            value={formData.color}
            onChange={(e) => handleFieldChange("color", e.target.value)}
            disabled={!formData.productName}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:dark:bg-gray-600 ${
              errors.color ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Select Color</option>
            {formData.productName && fruitColors[formData.productName]?.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          {errors.color && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle size={14} className="mr-1" />
              {errors.color}
            </div>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => handleFieldChange("amount", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.amount ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            min="0"
          />
          {errors.amount && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle size={14} className="mr-1" />
              {errors.amount}
            </div>
          )}
        </div>

        {/* Unit Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Unit Price (฿) *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.unit}
            onChange={(e) => handleFieldChange("unit", e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.unit ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            min="0"
          />
          {errors.unit && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle size={14} className="mr-1" />
              {errors.unit}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 lg:col-span-4 flex gap-2 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <CheckCircle2 size={16} className="mr-2" />
            {isEditing ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};