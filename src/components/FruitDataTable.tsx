import { Edit2, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Pagination } from "../components/common/Pagination";
import type {
  FruitData,
  FruitFormData,
  FruitFormError,
  FruitNameData,
} from "../types/fruit";
import { useState } from "react";
import { fruitService } from "../services/fruitService";
import axios from "axios";
import FruitDeleteModal from "./FruitDeleteModal";
import FruitEditModal from "./FruitEditModal";
import { formatDate } from "../utils/formatDate";
import { fruitSchema } from "../utils/validation";
import FruitAddModal from "./FruitAddModal";

const FruitDataTable = ({
  fruits,
  fruitNames,
  totalPages,
  total,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  onSuccess,
  setItemsPerPage,
  setMessage,
  setMessageType,
}: {
  fruits: FruitData[];
  fruitNames: FruitNameData[];
  totalPages: number;
  total: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  onSuccess: () => void;
  setItemsPerPage: (page: number) => void;
  setMessage: (msg: string | null) => void;
  setMessageType: (msg: "success" | "error" | "info") => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedFruit = fruits.find((fruit) => fruit.id === selectedId);
  const [formData, setFormData] = useState<FruitFormData | null>(null);

  const [errors, setErrors] = useState<FruitFormError>({});

  // delete Fruits
  const handleDelete = async () => {
    if (!selectedId) return;

    setLoading(true);

    try {
      await fruitService.deleteFruits(String(selectedId));

      setMessage("Successfully deleted the item.");
      setMessageType("success");
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsMsg =
          error.response?.data?.message || "Unable to delete the item.";
        console.error(errorsMsg);
        setMessage(errorsMsg);
        setMessageType("error");
      } else {
        console.error("Unexpected error", error);
        setMessage("An unexpected error occurred.");
        setMessageType("error");
      }
    } finally {
      setLoading(false);
      setShowModal(false);
      setSelectedId(null);
    }
  };

  const onClickDelete = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Edit Fruit
  const onClickEdit = (id: number) => {
    setErrors({});

    const fruit = fruits.find((f) => f.id === id);
    if (!fruit) return;

    setSelectedId(id);
    setFormData({ ...fruit });
    setShowEditModal(true);
  };

  const handleChange = (field: keyof FruitFormData, value: string | number) => {
    const updatedForm = {
      ...formData,
      [field]: value,
    };

    const result = fruitSchema.safeParse(updatedForm);

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === field
      );
      setErrors((prev) => ({ ...prev, [field]: fieldError?.message }));

      console.log(result);
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    setFormData((prev) => ({
      ...(prev as FruitData),
      [field]: value,
    }));
  };

  const handleEdit = async (formData: FruitFormData) => {
    if (!selectedId) return;

    const resultForm = fruitSchema.safeParse(formData);
    const resultId = String(selectedId);

    if (!resultForm.success) {
      setMessage("Please enter valid information");
      setMessageType("error");

      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }

    try {
      setErrors({});
      await fruitService.editFruit(resultId, formData);

      setMessage("Successfully edited the item.");
      setMessageType("success");
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsMsg =
          error.response?.data?.message || "Unable to edited the item.";
        console.error(errorsMsg);
        setMessage(errorsMsg);
        setMessageType("error");
      } else {
        console.error("Unexpected error", error);
        setMessage("An unexpected error occurred.");
        setMessageType("error");
      }
    } finally {
      setLoading(false);
      setShowEditModal(false);
      setSelectedId(null);
    }
  };

  // Add a new Fruit
  const onClickAdd = () => {
    setErrors({});
    setFormData({
      inventoryDate: formatDate(new Date()),
      productName: "",
      color: "",
      amount: 0,
      unit: 0,
    });
    setShowAddModal(true);
  };

  const handleAdd = async (formData: FruitFormData) => {
    const resultForm = fruitSchema.safeParse(formData);

    if (!resultForm.success) {
      setMessage("Please enter valid information");
      setMessageType("error");

      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }

    try {
      setErrors({});
      await fruitService.addFruit(formData);

      setMessage("Successfully added the item.");
      setMessageType("success");
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsMsg =
          error.response?.data?.message || "Unable to added the item.";
        console.error(errorsMsg);
        setMessage(errorsMsg);
        setMessageType("error");
      } else {
        console.error("Unexpected error", error);
        setMessage("An unexpected error occurred.");
        setMessageType("error");
      }
    } finally {
      setLoading(false);
      setShowEditModal(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="flex flex-co rounded-lg overflow-hidden bg-white">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between w-full p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Inventory ({total} items)
          </h2>

          <div className="flex gap-2 justify-center items-center">
            {/* Items per page */}
            <div className="flex justify-start items-center gap-2 px-4 py-2">
              <label htmlFor="itemsPerPage" className="text-sm">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {[5, 10, 20, 50].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* Add fruit button */}
            <Button
              variant="default"
              onClick={onClickAdd}
              className="flex gap-2 hover:cursor-pointer"
            >
              <Plus />
              <span>Add New Fruit</span>
            </Button>
          </div>
        </div>

        {/* table */}
        <div className="flex flex-col justify-between h-[800px]">
          {fruits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">No fruits found</h3>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-primary-foreground min-w-full">
                    <tr className="w-full">
                      <th className="w-1/7 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Date
                      </th>
                      <th className="w-1/7 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Fruit
                      </th>
                      <th className="w-1/7 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                        Color
                      </th>
                      <th className="w-1/7 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="w-1/7 px-6 py-3 text-xs font-medium uppercase tracking-wider text-right">
                        Unit
                      </th>
                      <th className="w-1/7 px-6 py-3 text-xs font-medium uppercase tracking-wider text-right">
                        Total Value
                      </th>
                      <th className="w-1/7 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider mx-auto">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fruits.map((fruit) => (
                      <tr
                        key={fruit.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white">
                          {formatDate(fruit.inventoryDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium dark:text-white">
                              {fruit.productName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium">
                            {fruit.color}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          {fruit.amount.toFixed(6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          {fruit.unit.toFixed(0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                          {new Intl.NumberFormat("en-US", {
                            minimumFractionDigits: 6,
                            maximumFractionDigits: 6,
                          }).format(fruit.amount * fruit.unit)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex justify-center w-full space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => onClickEdit(fruit.id)}
                              className="text-sky-500 bg-sky-100 hover:bg-sky-200 hover:text-sky-700 hover:cursor-pointer"
                              title="Edit fruit"
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => onClickDelete(fruit.id)}
                              className="text-red-500 bg-red-100 hover:text-red-700 hover:bg-red-200 hover:cursor-pointer"
                              title="Delete fruit"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={total}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </>
          )}
        </div>
      </div>

      {showModal && selectedFruit && (
        <FruitDeleteModal
          selectedFruit={selectedFruit}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
          loading={loading}
        />
      )}

      {showEditModal && selectedFruit && (
        <FruitEditModal
          formData={formData!}
          handleChange={handleChange}
          setShowEditModal={setShowEditModal}
          handleSave={(formData) => handleEdit(formData)}
          loading={loading}
          fruitNames={fruitNames}
          errors={errors}
        />
      )}

      {showAddModal && (
        <FruitAddModal
          formData={formData!}
          handleChange={handleChange}
          setShowAddModal={setShowAddModal}
          handleAdd={(formData) => handleAdd(formData)}
          loading={loading}
          fruitNames={fruitNames}
          errors={errors}
        />
      )}
    </div>
  );
};
export default FruitDataTable;
