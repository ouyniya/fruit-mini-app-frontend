import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";

export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}> = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // สร้างกลุ่มของช่วงข้อมูลสำหรับ Select box
  const dataRangeGroups = Array.from({ length: totalPages }, (_, i) => {
    const startItem = i * itemsPerPage + 1;
    const endItem = Math.min((i + 1) * itemsPerPage, totalItems);
    // ค่าของ option คือ pageNumber ที่สอดคล้องกับช่วงนั้น
    // ใช้ pageNumber เดียวกันกับที่ปุ่มกดเปลี่ยน
    return { label: `${startItem}-${endItem}`, value: i + 1 };
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = parseInt(e.target.value, 10);
    onPageChange(selectedPage);
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-800/50">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">{endIndex}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </div>

        <div className="flex items-center space-x-2">
          {/* Previous button */}
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 hover:cursor-pointer"
          >
            <ChevronLeft size={16} />
          </Button>

          {/* Select box with data ranges */}
          <select
            value={currentPage} // <--- Value ของ select ต้องตรงกับ currentPage
            onChange={handleSelectChange}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:cursor-pointer"
          >
            {dataRangeGroups.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>

          {/* Next button */}
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:cursor-pointer"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
