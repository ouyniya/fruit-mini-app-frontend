import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import type { FruitData } from "../types/fruit";
import { formatDate } from "../utils/formatDate";

const FruitDeleteModal = ({
  selectedFruit,
  setShowModal,
  handleDelete,
  loading,
}: {
  selectedFruit: FruitData;
  setShowModal: (show: boolean) => void;
  handleDelete: () => void;
  loading: boolean;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50">
      <div className="bg-primary-foreground rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="mb-4 opacity-60">
          Do you really want to delete this item? This action cannot be undone.
        </p>

        {/* แสดงข้อมูลของผลไม้ที่เลือก */}
        <div className="bg-white border rounded-lg p-4 text-left mb-6">
          <p>
            <strong>Date:</strong> {formatDate(selectedFruit.inventoryDate)}
          </p>
          <p>
            <strong>Fruit:</strong> {selectedFruit.productName}
          </p>
          <p>
            <strong>Color:</strong> {selectedFruit.color}
          </p>
          <p>
            <strong>Amount:</strong> {selectedFruit.amount.toFixed(6)}
          </p>
          <p>
            <strong>Unit Price:</strong> {selectedFruit.unit.toFixed(0)}
          </p>
          <p>
            <strong>Total:</strong>{" "}
            {(selectedFruit.amount * selectedFruit.unit).toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 6,
                maximumFractionDigits: 6,
              }
            )}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setShowModal(false)}
            variant="outline"
            className="hover:cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            {loading && <Loader2 className="animate-spin" />}
            Confirm Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FruitDeleteModal;
