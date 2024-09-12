import { View, Text, Pressable } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

import { Formik, Field } from "formik";
import CustomInput from "@/components/CustomInput";
import * as yup from "yup";
import { Link, SplashScreen, Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { useAuthStore } from "@/store/AuthStore";
import OtpInput from "@/components/OtpInput";
import Spinner from "react-native-loading-spinner-overlay";
import { useEffect } from "react";

const emailPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is required"),
});

const codePasswordValidationSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d+$/, "OTP must be a number")
    .required("OTP is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please re-type your password")
    .oneOf([yup.ref("password")], "Your password do not match."),
});

export default function Reset() {
  const {
    pendingVerification,
    isLoading,
    resetPassword,
    resetPasswordVerification,
    reset,
  } = useAuthStore();
  const useSignInHook = useSignIn();

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerTitle: "" }} />
      <Spinner visible={isLoading} />
      <View className="flex-1 bg-white">
        <View className="mb-10 mt-10 flex-1 content-center justify-center bg-white pl-5">
          <Text className="text-bold text-4xl">Reset your password</Text>
          <View className="mt-10 items-center">
            <Formik
              validationSchema={
                !pendingVerification
                  ? emailPasswordValidationSchema
                  : codePasswordValidationSchema
              }
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                code: "",
              }}
              onSubmit={(values) => {
                console.log(`Values ${values}`);
                console.log(values);

                if (pendingVerification) {
                  resetPasswordVerification(
                    values.code,
                    values.password,
                    useSignInHook,
                  );
                } else {
                  resetPassword(values.email, useSignInHook);
                }
              }}
            >
              {({ handleSubmit }) => (
                <>
                  {!pendingVerification && (
                    <>
                      <Field
                        name="email"
                        component={CustomInput}
                        placeholder="Enter your email"
                        label="Email"
                        keyboardType="email-address"
                      />
                    </>
                  )}
                  {pendingVerification && (
                    <>
                      <Field name="code" component={OtpInput} />
                      <Field
                        name="password"
                        component={CustomInput}
                        placeholder="Enter your password"
                        label="Password"
                        secureTextEntry
                      />
                      <Field
                        name="confirmPassword"
                        component={CustomInput}
                        placeholder="Confirm your password"
                        label="Confirm Password"
                        secureTextEntry
                      />
                    </>
                  )}

                  <Button
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                    className="item-center mt-5 h-auto w-4/5 justify-center rounded-full bg-slate-700 py-4 active:bg-slate-800"
                  >
                    <ButtonText className="text-center text-2xl font-bold">
                      {!pendingVerification ? "Send Code" : "Reset Password"}
                    </ButtonText>
                  </Button>
                </>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </>
  );
}
