import { View, Text, TextInputProps } from "react-native";
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

interface CustomInputProps extends TextInputProps {
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

const CustomComponent: FC<CustomInputProps> = (props: CustomInputProps) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    helperText,
    label,
    secureTextEntry,
    ...inputProps
  } = props;

  const hasError = errors[name] != null && touched[name] != null;

  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <FormControl className="h-auto" isInvalid={hasError}>
      <FormControlLabel className="mb-1">
        <FormControlLabelText className="text-bold text-2xl">
          {label}
        </FormControlLabelText>
      </FormControlLabel>
      <Input className="h-16 w-4/5 rounded-full">
        <InputField
          value={value}
          autoCapitalize="none"
          onChangeText={(text) => {
            onChange(name)(text);
          }}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
          secureTextEntry={secureTextEntry && !showPassword}
          {...inputProps}
        ></InputField>
        {secureTextEntry && (
          <InputSlot className="pr-5" onPress={handleState}>
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              className="text-slate-500"
            />
          </InputSlot>
        )}
      </Input>
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
  );
};

export default CustomComponent;
