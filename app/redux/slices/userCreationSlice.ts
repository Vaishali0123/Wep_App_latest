import { Address } from "@/app/main/library/cart/Cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserCreationState {
  // number: string;
  // fullname: string;
  // email: string;
  // username: string;
  // dob: string;
  // bio: string;
  // gender: string;
  // image: File | null;
  // canStay: boolean;
  address: Address;
}

// Define the initial state using that type
const initialState: { userData: UserCreationState } = {
  userData: {
    // number: "7521847004",
    // fullname: "Dev",
    // email: "dev0@gmail.com",
    // username: "ayushdixit23",
    // dob: "",
    // bio: "..",
    // gender: "Male",
    // image: null,
    // canStay: false,
    address: {
      _id: "",
      houseNo: "",
      streetAddress: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      phone: "",
      addressType: "",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserCreationState>) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
