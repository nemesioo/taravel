import { View, Text, Pressable } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

import { Formik, Field } from "formik";
import CustomInput from "@/components/CustomInput";
import * as yup from "yup";
import { Link } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { useAuthStore } from "@/store/AuthStore";
import OtpInput from "@/components/OtpInput";
import Spinner from "react-native-loading-spinner-overlay";
import { useEffect } from "react";

const emailPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please re-type your password")
    .oneOf([yup.ref("password")], "Your password do not match."),
});

const codeValidationSchema = yup.object().shape({
  code: yup
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d+$/, "OTP must be a number")
    .required("OTP is required"),
});

export default function SignUp() {
  const { pendingVerification, isLoading, signUp, verifyCode, reset } =
    useAuthStore();
  const useSignUpHook = useSignUp();

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <Spinner visible={isLoading} />
      <View className="flex-1 bg-white">
        <View className="mb-10 mt-10 flex-1 content-center justify-center bg-white pl-5">
          <Text className="text-bold text-4xl">Creat your Taravel account</Text>
          <Text className="text-2xl text-slate-500">Let's Sign you up.</Text>
          <View className="mt-10 items-center">
            <Formik
              validationSchema={
                !pendingVerification
                  ? emailPasswordValidationSchema
                  : codeValidationSchema
              }
              initialValues={{
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
                code: "",
              }}
              onSubmit={(values) => {
                console.log(`Values ${values}`);
                console.log(values);

                if (pendingVerification) {
                  verifyCode(values.code, useSignUpHook);
                } else {
                  signUp(
                    values.email,
                    values.password,
                    values.username,
                    useSignUpHook,
                  );
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
                      <Field
                        name="username"
                        component={CustomInput}
                        placeholder="Enter your username"
                        label="Username"
                        keyboardType="email-address"
                      />
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
                  {pendingVerification && (
                    <>
                      <Field name="code" component={OtpInput} />
                    </>
                  )}

                  {!pendingVerification && (
                    <View className="flex-row">
                      <Text className="text-lg">
                        Already have an account ?{" "}
                      </Text>
                      <Link href={"/login"} asChild>
                        <Pressable className="text-">
                          <Text className="text-lg font-bold">Login</Text>
                        </Pressable>
                      </Link>
                    </View>
                  )}

                  <Button
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                    className="item-center mt-2 h-auto w-4/5 justify-center rounded-full bg-slate-700 py-4 active:bg-slate-800"
                  >
                    <ButtonText className="text-center text-2xl font-bold">
                      {!pendingVerification ? "Sign Up" : "Verify Email"}
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
