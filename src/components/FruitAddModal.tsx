import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import type {
  FruitFormData,
  FruitFormError,
  FruitNameData,
} from "../types/fruit";
import { formatDate } from "../utils/formatDate";

const FruitAddModal = ({
  formData,
  handleChange,
  setShowAddModal,
  handleAdd,
  loading,
  fruitNames,
  errors,
}: {
  formData: FruitFormData;
  handleChange: (field: keyof FruitFormData, value: string | number) => void;
  setShowAddModal: (show: boolean) => void;
  handleAdd: (formData: FruitFormData) => void;
  loading: boolean;
  fruitNames: FruitNameData[];
  errors: FruitFormError;
}) => {
  const fruitOptions = Array.from(
    new Set(fruitNames.map((fruitName) => fruitName.productName))
  );

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-primary/50">
      <div className="bg-primary-foreground rounded-2xl shadow-xl p-6 w-full max-w-md text-left">
        <h2 className="text-xl font-semibold mb-6 text-center">Add Fruit</h2>

        {/* แบบฟอร์มแก้ไข */}
        <div className="bg-white border rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={formatDate(formData.inventoryDate)}
              onChange={(e) => handleChange("inventoryDate", e.target.value)}
            />
            {errors?.inventoryDate && (
              <p className="text-sm text-red-500 mt-1">
                {errors.inventoryDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fruit</label>

            <select
              className="w-full border px-3 py-2 rounded"
              value={formData.productName}
              onChange={(e) => handleChange("productName", e.target.value)}
            >
              <option value="">Select a fruit</option>
              {fruitOptions.map((fruitName) => (
                <option key={fruitName} value={fruitName}>
                  {fruitName}
                </option>
              ))}
            </select>
            {errors?.productName && (
              <p className="text-sm text-red-500 mt-1">{errors.productName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={formData.color}
              onChange={(e) => handleChange("color", e.target.value)}
              required
            />
            {errors?.color && (
              <p className="text-sm text-red-500 mt-1">{errors.color}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={formData.amount}
              onChange={(e) =>
                handleChange("amount", parseFloat(e.target.value))
              }
              required
            />
            {errors?.amount && (
              <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit Price</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={formData.unit}
              onChange={(e) => handleChange("unit", parseFloat(e.target.value))}
              required
            />
            {errors?.unit && (
              <p className="text-sm text-red-500 mt-1">{errors.unit}</p>
            )}
          </div>
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-end gap-4 mt-6">
          <Button
            onClick={() => setShowAddModal(false)}
            variant="outline"
            className="hover:cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleAdd(formData)}
            disabled={loading}
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            {loading && <Loader2 className="animate-spin" />}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FruitAddModal;
