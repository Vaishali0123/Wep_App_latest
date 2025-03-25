import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";

interface InputOTPPatternProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  size?: string;
  className?: string;
}

const InputOTPPattern: React.FC<InputOTPPatternProps> = ({
  value,
  setValue,
}) => {
  return (
    <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      value={value}
      onChange={(value) => setValue(value)}
    >
      <InputOTPGroup className="flex gap-3 w-full">
        <InputOTPSlot
          index={0}
          className="w-[42px] h-[42px] text-center hidden text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={0}
          className="w-[42px] h-[42px] text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={1}
          className="w-[42px] h-[42px] text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={2}
          className="w-[42px] h-[42px] text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={3}
          className="w-[42px] h-[42px] text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={4}
          className="w-[42px] h-[42px] text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={5}
          className="w-[42px] h-[42px] text-center text-lg border border-gray-400 rounded-2xl"
        />
        <InputOTPSlot
          index={5}
          className="w-[42px] h-[42px] text-center hidden text-lg border border-gray-400 rounded-2xl"
        />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default InputOTPPattern;
