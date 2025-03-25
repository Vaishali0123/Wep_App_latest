import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserCreationState {
  number: string;
  fullname: string;
  email: string;
  username: string;
  dob: string;
  bio: string;
  gender: string;
  image: File | null;
  canStay: boolean;
}

// Define the initial state using that type
const initialState: { userData: UserCreationState } = {
  userData: {
    number: "7521847004",
    fullname: "Ayush Dixit",
    email: "fsayush100@gmail.com",
    username: "ayushdixit23",
    dob: "",
    bio: "Aise hi kuch bhi",
    gender: "Male",
    image: null,
    canStay: false,
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
