import { View, Text, Pressable } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

import { Formik, Field } from "formik";
import CustomInput from "@/components/CustomInput";
import * as yup from "yup";
import { Link } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useAuthStore } from "@/store/AuthStore";
import { useState } from "react";

const loginValidationSchema = yup.object().shape({
  identifier: yup
    .string()
    .required("Email or Username is required")
    .test("is-email-or-username", "Invalid email or username", (value) => {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Validate username (example: alphanumeric, 3-20 characters)
      const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;

      return emailRegex.test(value) || usernameRegex.test(value);
    }),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const { isLoading, login } = useAuthStore();
  const useSignInHook = useSignIn();

  return (
    <>
      <Spinner visible={isLoading} textContent="" />
      <View className="flex-1 bg-white">
        <View className="mb-10 mt-10 flex-1 content-center justify-center bg-white pl-5">
          <Text className="text-bold text-5xl">Welcome to Taravel</Text>
          <Text className="text-2xl text-slate-500">Let's Sign you in.</Text>
          <View className="mt-10 items-center">
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ identifier: "", password: "" }}
              onSubmit={(values) => {
                login(values.identifier, values.password, useSignInHook);
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <Field
                    name="identifier"
                    component={CustomInput}
                    placeholder="Enter your username or email address"
                    label="Username or Email Address"
                    keyboardType="email-address"
                  />
                  <Field
                    name="password"
                    component={CustomInput}
                    placeholder="Enter your password"
                    label="Password"
                    secureTextEntry
                  />

                  <View className="mt-1 w-4/5 flex-row justify-end">
                    <Link href="/reset" asChild>
                      <Text className="mr-4 font-bold text-slate-900">
                        Reset Password
                      </Text>
                    </Link>
                  </View>
                  <View className="mt-5 flex-row">
                    <Text className="text-lg">Don't have an account ? </Text>
                    <Link href={"/sign_up"} asChild>
                      <Pressable className="text-">
                        <Text className="text-lg font-bold">Register</Text>
                      </Pressable>
                    </Link>
                  </View>

                  <Button
                    onPress={() => handleSubmit()}
                    className="item-center mt-2 h-auto w-4/5 justify-center rounded-full bg-slate-700 py-4 active:bg-slate-800"
                  >
                    <ButtonText className="text-center text-2xl font-bold">
                      Login
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
