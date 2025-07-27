import useAuthStore from "../stores/authStore";
import { authService } from "../services/authService";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import MessageBox from "../components/common/MessageBox";
import FruitHeader from "../components/FruitHeader";
import FruitDataTable from "../components/FruitDataTable";
import type { UserData } from "../types/user";
import { fruitService } from "../services/fruitService";
import axios from "axios";
import { paginationSchema } from "../utils/validation";
import type { FruitData, FruitNameData } from "../types/fruit";
import { Loader2 } from "lucide-react";

const FruitPage = () => {
  const { clearAuth, user } = useAuthStore();
  const [fruits, setFruits] = useState<FruitData[]>([]);
  const [fruitNames, setFruitNames] = useState<FruitNameData[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [forceFetch, setForceFetch] = useState(false);

  useEffect(() => {
    // fatch user data
    setUserData(user);

    // fetch fruit name data
    const fetchFruitNames = async () => {
      setLoading(true);
      try {
        const response = await fruitService.getFruitNames();
        setFruitNames(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorsMsg =
            error.response?.data?.message || "Something went wrong";
          console.log(errorsMsg);
          setMessage(errorsMsg);
          setMessageType("error");
        } else {
          console.log("Unexpected error", error);
        }
        setLoading(false);
      }
    };

    fetchFruitNames();
  }, []);

  useEffect(() => {
    const fetchFruits = async () => {
      const page = String(currentPage);
      const limit = String(itemsPerPage);

      const result = paginationSchema.safeParse({
        page,
        limit,
      });

      if (!result.success) {
        setMessage("Invaid Input");
        setMessageType("error");
      }

      setLoading(true);
      try {
        const response = await fruitService.getFruits(page, limit);
        setFruits(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotal(response.data.meta.total);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorsMsg =
            error.response?.data?.message || "Something went wrong";
          console.log(errorsMsg);
          setMessage(errorsMsg);
          setMessageType("error");
        } else {
          console.log("Unexpected error", error);
        }
        setLoading(false);
      }
    };

    fetchFruits();
  }, [currentPage, itemsPerPage, forceFetch]);

  if (!userData) return <LoadingSpinner />;

  const handleLogout = async () => {
    try {
      await authService.logout();

      setTimeout(() => {
        clearAuth(); // ล้าง token และ user ใน memory
      }, 1000);

      setMessage("Logout Success!");
      setMessageType("success");
    } catch (error) {
      console.log(error);
      setMessage("Logout Error");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MessageBox
        message={message}
        type={messageType}
        onClose={() => setMessage(null)}
      />

      {/* Header */}
      <FruitHeader userData={userData} handleLogout={handleLogout} />

      {/* Data Table */}
      {loading ? (
        <div className="flex justify-center items-center gap-2 w-full min-h-[200px]">
          <Loader2 className="animate-spin" />
          <p>Loading...</p>
        </div>
      ) : (
        <FruitDataTable
          fruits={fruits}
          fruitNames={fruitNames}
          totalPages={totalPages}
          total={total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onSuccess={() => {
            setCurrentPage(1);
            setForceFetch((prev) => !prev);
            setTimeout(() => {
              setMessage(null);
            }, 2000);
          }}
          setItemsPerPage={setItemsPerPage}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      )}
    </div>
  );
};
export default FruitPage;
