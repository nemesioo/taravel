import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { CloseIcon, Icon } from "./ui/icon";
import { useHotelStore } from "@/store/HotelStore";
import { Field, Formik } from "formik";
import InputDatePicker from "./InputDatePicker";
import * as yup from "yup";
import { parse, isAfter } from "date-fns";
import CustomInput from "./CustomInput";
import { Button, ButtonText } from "./ui/button";
import { GetHotelRoomProps } from "@/api/props";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";

const roomFilterSchema = yup.object().shape({
  numberOfAdult: yup.string().required("Number of Adult is required"),
  // .test("is-email-or-username", "Invalid email or username", (value) => {
  //   // Validate email
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   // Validate username (example: alphanumeric, 3-20 characters)
  //   const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;

  //   return emailRegex.test(value) || usernameRegex.test(value);
  // }),
  // password: yup.string().required("Password is required"),
  checkIn: yup.string().required("Check In Date is required"),
  checkOut: yup
    .string()
    .required("Check Out Date is required")
    .test(
      "chekout-duration",
      "Must be at least 1 day duration",
      (value, context) => {
        const checkIn: Date = parse(
          context.parent.checkIn,
          "yyyy-MM-dd",
          new Date(),
        );
        const checkOut: Date = parse(value, "yyyy-MM-dd", new Date());
        console.log(checkIn);
        console.log(checkOut);

        return isAfter(checkOut, checkIn);
      },
    ),
});

const RoomFilterModal = () => {
  const {
    hotelInfo,
    getHotelInfo,
    openRoomQueryModal,
    updateRoomModal,
    getHotelRooms,
    setRoomProps,
  } = useHotelStore();

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openRoomQueryModal}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
          updateRoomModal();
        }}
      >
        <Formik
          validationSchema={roomFilterSchema}
          initialValues={{ numberOfAdult: "", checkIn: "", checkOut: "" }}
          onSubmit={(values) => {
            //   login(values.identifier, values.password, useSignInHook);
            updateRoomModal();
            setRoomProps({
              hotelId: hotelInfo!.data.id,
              guestAdult: Number(values.numberOfAdult),
              checkIn: values.checkIn,
              checkOut: values.checkOut,
            });

            getHotelRooms();
          }}
        >
          {({ handleSubmit }) => (
            <>
              {/* <AlertDialogBackdrop /> */}
              {/* <AlertDialogContent className="w-3/4 rounded-3xl "> */}
              {/* <AlertDialogHeader> */}
              <View
                // className="flex-1 items-center justify-center bg-gray-100 bg-opacity-20"
                style={styles.modalBackground}
              >
                <View
                  // className="h-auto w-11/12 items-center justify-center rounded-lg border-2 border-white bg-white p-4"
                  style={styles.modal}
                >
                  <View
                    // className="w-full flex-row justify-between"
                    style={styles.container}
                  >
                    <Text className="text-2xl font-bold">Room Filter</Text>
                    <Pressable
                      onPress={() => {
                        //   setShowModal(false)
                        updateRoomModal();
                      }}
                    >
                      <Icon
                        as={CloseIcon}
                        size="xl"
                        className="stroke-background-400 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900 group-[:hover]/modal-close-button:stroke-background-700"
                      />
                    </Pressable>
                  </View>

                  {/* </AlertDialogHeader> */}
                  {/* <AlertDialogBody> */}
                  <View className="mb-2 mt-2 items-center justify-center">
                    <Field
                      name="numberOfAdult"
                      component={CustomInput}
                      placeholder="Enter number of adults"
                      label="Number of adults"
                      keyboardType="email-address"
                      labelFont="text-base"
                    />
                    <Field
                      name="checkIn"
                      component={InputDatePicker}
                      placeholder="Enter your check in date"
                      label="Check In"
                      keyboardType="email-address"
                    />
                    <Field
                      name="checkOut"
                      component={InputDatePicker}
                      placeholder="Enter your check out date"
                      label="Check Out"
                      keyboardType="email-address"
                    />
                  </View>
                  {/* </AlertDialogBody> */}
                  {/* <AlertDialogFooter> */}
                  <Button
                    onPress={() => {
                      handleSubmit();
                    }}
                    // className="h-auto w-1/2 rounded-lg"
                    style={styles.searchButton}
                  >
                    <ButtonText style={styles.searchText}>SEARCH</ButtonText>
                  </Button>
                  {/* </AlertDialogFooter> */}
                  {/* </AlertDialogContent> */}
                </View>
              </View>
            </>
          )}
        </Formik>
      </Modal>
      {/* <AlertDialog
        isOpen={openRoomQueryModal}
        onClose={() => {
          //   setShowModal(false)
          updateRoomModal();
        }}
        size="lg"
        useRNModal
      >
        <Formik
          validationSchema={roomFilterSchema}
          initialValues={{ numberOfAdult: "", checkIn: "", checkOut: "" }}
          onSubmit={(values) => {
            //   login(values.identifier, values.password, useSignInHook);
            setRoomProps({
              hotelId: hotelInfo!.data.id,
              guestAdult: Number(values.numberOfAdult),
              checkIn: values.checkIn,
              checkOut: values.checkOut,
            });
            updateRoomModal();
            getHotelRooms();
          }}
        >
          {({ handleSubmit }) => (
            <>
              <AlertDialogBackdrop />
              <AlertDialogContent className="w-3/4 rounded-3xl">
                <AlertDialogHeader>
                <Text>Room Filter</Text>
                <Pressable
                  onPress={() => {
                    //   setShowModal(false)
                    updateRoomModal();
                  }}
                >
                  <Icon
                    as={CloseIcon}
                    size="md"
                    className="stroke-background-400 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900 group-[:hover]/modal-close-button:stroke-background-700"
                  />
                </Pressable>
                </AlertDialogHeader>
                <AlertDialogBody>
                <View className="items-center justify-center">
                  <Field
                    name="numberOfAdult"
                    component={CustomInput}
                    placeholder="Enter number of adults"
                    label="Number of adults"
                    keyboardType="email-address"
                  />
                  <Field
                    name="checkIn"
                    component={InputDatePicker}
                    placeholder="Enter your check in date"
                    label="Check In"
                    keyboardType="email-address"
                  />
                  <Field
                    name="checkOut"
                    component={InputDatePicker}
                    placeholder="Enter your check out date"
                    label="Check Out"
                    keyboardType="email-address"
                  />
                </View>
                </AlertDialogBody>
                <AlertDialogFooter>
                <Button
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <ButtonText>Search</ButtonText>
                </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </>
          )}
        </Formik>
      </AlertDialog> */}
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(128, 128, 128, 0.5)",
  },
  modal: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
  },
  container: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  searchButton: {
    marginTop: 10,
    width: "80%",
    borderRadius: 25,
    height: "12%",
  },
  searchText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RoomFilterModal;
