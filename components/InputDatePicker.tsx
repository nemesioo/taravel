import { View, Text, TextInputProps, Pressable } from "react-native";
import React, { FC, ReactNode } from "react";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import DatePicker from "react-native-date-picker";
import { format } from "date-fns";

interface InputDatePickerProps extends TextInputProps {
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
  helperText: string;
  label: string;
  secureTextEntry: boolean;
}

const InputDatePicker: FC<InputDatePickerProps> = (
  props: InputDatePickerProps,
) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    helperText,
    label,
    secureTextEntry,
    ...inputProps
  } = props;

  const hasError = errors[name] != null && touched[name] != null;

  //   const [showPassword, setShowPassword] = React.useState(Date());
  const today = new Date();

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  return (
    <>
      <DatePicker
        modal
        open={showDatePicker}
        date={today}
        mode="date"
        onConfirm={(date) => {
          setShowDatePicker(false);
          const formattedDate = format(date, "yyyy-MM-dd");
          onChange(name)(formattedDate);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
      <FormControl className="h-auto" isInvalid={hasError}>
        <FormControlLabel className="mb-1">
          <FormControlLabelText className="text-bold text-base">
            {label}
          </FormControlLabelText>
        </FormControlLabel>
        <Pressable
          className="h-16 w-4/5 rounded-full"
          onPress={() => {
            // console.log("PRESS");
            setShowDatePicker(true);
          }}
        >
          <Input className="h-16 w-full rounded-full" isDisabled>
            <InputField
              value={value}
              autoCapitalize="none"
              onBlur={() => {
                setFieldTouched(name);
                onBlur(name);
              }}
              // secureTextEntry={secureTextEntry && !showPassword}
              {...inputProps}
            ></InputField>
            {/* {secureTextEntry && (
          <InputSlot className="pr-5" onPress={handleState}>
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              className="text-slate-500"
            />
          </InputSlot>
        )} */}
          </Input>
        </Pressable>
        {helperText && (
          <FormControlHelper>
            <FormControlHelperText className="">
              {helperText}
            </FormControlHelperText>
          </FormControlHelper>
        )}
        {hasError && (
          <FormControlError>
            <FormControlErrorIcon
              className="color-red-500"
              size="sm"
              as={AlertCircleIcon}
            />
            <FormControlErrorText>{errors[name]}</FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>
    </>
  );
};

export default InputDatePicker;
