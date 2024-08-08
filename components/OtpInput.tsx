import { useState, useRef } from "react";
import { Input, InputField } from "@/components/ui/input";
import { View, Text, TextInputProps } from "react-native";
import React, { FC, ReactNode } from "react";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "./ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";

interface OtpInputProps extends TextInputProps {
  field: {
    name: string;
    onBlur: (name: string) => void;
    onChange: (name: string) => (text: string) => void;
    value: string;
  };
  form: {
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    setFieldTouched: (name: string) => void;
  };
}

const OtpInput: FC<OtpInputProps> = (props: OtpInputProps) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<any>>(Array(6).fill(null));

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange(name)(newOtp.join(""));

    // Automatically move to the next field
    if (text && index < 5) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === "") {
      if (index > 0) {
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  const handleInputWithValue = (index: number, text: string) => {
    const numericRegex = /^[0-9]*$/;
    if (otp[index] !== "" && numericRegex.test(text) && index < 5) {
      const newOtp = [...otp];
      newOtp[index + 1] = text;
      setOtp(newOtp);
      onChange(name)(newOtp.join(""));
      const nextInput = inputRefs.current[index + 1];
      nextInput.focus();
    }
  };

  const hasError = errors[name] != null && touched[name] != null;

  return (
    <>
      <FormControl isInvalid={hasError}>
        <View className="items-center justify-center">
          <Text className="mb-4 text-xl font-bold">Enter OTP</Text>
        </View>
        <View className="flex-row">
          {otp.map((value, index) => (
            <Input key={index} className="mr-5 h-14 w-10">
              <InputField
                className="text-bold"
                ref={(ref) => (inputRefs.current[index] = ref)}
                //   ref={inputRefs.current[index]}
                value={value}
                onChangeText={(text) => {
                  const numericRegex = /^[0-9]*$/;
                  if (numericRegex.test(text)) {
                    handleChange(text, index);
                  }
                }}
                onBlur={() => {
                  setFieldTouched(name);
                  onBlur(name);
                }}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(index);
                  } else {
                    handleInputWithValue(index, nativeEvent.key);
                  }
                }}
                maxLength={1}
                keyboardType="numeric"
                textAlign="center"
              />
            </Input>
          ))}
        </View>
        <FormControlError>
          <FormControlErrorIcon
            className="color-red-500"
            size="sm"
            as={AlertCircleIcon}
          />
          <FormControlErrorText>{errors[name]}</FormControlErrorText>
        </FormControlError>
      </FormControl>
    </>
  );
};
export default OtpInput;
