import CustomInput from "@/components/CustomInput";
import { Button, ButtonText } from "@/components/ui/button";
import { useHotelStore } from "@/store/HotelStore";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Field, Formik } from "formik";
import { useEffect } from "react";
import { View, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as yup from "yup";

const paymentSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is required"),
});

const BookRoom = () => {
  const { offerId } = useLocalSearchParams();
  console.log(offerId);

  const {
    isLoading,
    hotelInfo,
    prebook,
    prebookInfo,
    bookRoom,
    redirectToMainPage,
  } = useHotelStore();

  useEffect(() => {
    // if (roomProps === undefined) {
    //   updateRoomModal();
    // } else {
    //   if (hotelInfo!.data.id !== roomProps.hotelId) {
    //     getHotelRooms();
    //   }
    // }
    prebook({ offerId: offerId });
  }, []);

  useEffect(() => {
    if (redirectToMainPage) {
      router.replace("/home");
    }
  }, [redirectToMainPage]);

  return (
    <>
      <Spinner visible={isLoading} />
      <Stack.Screen
        options={{
          headerTitle: hotelInfo!.data.name,
        }}
      ></Stack.Screen>
      <View className="flex-1 bg-white">
        <View className="mb-10 mt-10 flex-1 content-center justify-center bg-white pl-5">
          <Text className="text-bold text-2xl">Credit Card Account Holder</Text>
          <View className="mt-10 items-center">
            <Formik
              validationSchema={paymentSchema}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
              }}
              onSubmit={(values) => {
                console.log(values);
                console.log(prebookInfo);
                // if (pendingVerification) {
                //   verifyCode(values.code, useSignUpHook);
                // } else {
                //   signUp(
                //     values.email,
                //     values.password,
                //     values.username,
                //     useSignUpHook,
                //   );
                // }
                bookRoom({
                  holder: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                  },
                  payment: {
                    method: "ACC_CREDIT_CARD",
                    transactionId: prebookInfo!.transactionId,
                  },
                  prebookId: prebookInfo!.prebookId,
                  guest: [
                    {
                      occupancyNumber: 1,
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.email,
                    },
                  ],
                });
              }}
            >
              {({ handleSubmit }) => (
                <>
                  <Field
                    name="firstName"
                    component={CustomInput}
                    placeholder="Enter your First Name"
                    label="First Name"
                    keyboardType="email-address"
                  />

                  <Field
                    name="lastName"
                    component={CustomInput}
                    placeholder="Enter your Last Name"
                    label="Last Name"
                    keyboardType="email-address"
                  />
                  <Field
                    name="email"
                    component={CustomInput}
                    placeholder="Enter your email"
                    label="Email"
                    keyboardType="email-address"
                  />

                  <Button
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                    className="item-center mt-5 h-auto w-4/5 justify-center rounded-full bg-slate-700 py-4 active:bg-slate-800"
                  >
                    <ButtonText className="text-center text-2xl font-bold">
                      Book Room
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
};
export default BookRoom;
