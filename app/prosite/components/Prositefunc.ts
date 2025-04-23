import { API } from "@/app/utils/helpers";
import axios from "axios";
import { PrositeData } from "../[username]/page";
export const getProsite = async (
  id: string | null,
  setPrositeData: (data: PrositeData | null) => void,
  setLoading: (loading: boolean) => void
) => {
  if (!id) return;
  setLoading(true);
  try {
    const res = await axios.get(`${API}/getprositedata/${id}`);
    if (res?.data?.success) {
      setPrositeData(res?.data?.userDetails);
    }
  } catch (e) {
    console.error("Error fetching prosite data:", e);
  }
  setLoading(false);
};
