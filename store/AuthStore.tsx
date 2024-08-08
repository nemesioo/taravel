import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthStore {
  isLoading: boolean;
  signUp: (
    email: string,
    password: string,
    username: string,
    useSignUpHook: any,
  ) => void;
  pendingVerification: boolean;
  verifyCode: (code: string, useSignUpHook: any) => void;
  fetchUserData: () => void;
  login: (idenfier: string, password: string, useSignInHook: any) => void;
  signOut: (useSignOutHook: any) => void;
  resetPassword: (email: string, useSignUpHook: any) => void;
  resetPasswordVerification: (
    code: string,
    password: string,
    useSignUpHook: any,
  ) => void;
}

export const useAuthStore = create<AuthStore>(
  //   persist(
  (set, get) => ({
    isLoading: false,
    pendingVerification: false,
    signUp: async (email, password, username, useSignUpHook) => {
      const { isLoaded, signUp } = useSignUpHook;

      set({ isLoading: true });

      try {
        if (isLoaded) {
          await signUp.create({
            emailAddress: email,
            password: password,
            username: username,
          });

          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });
        }
        set({ pendingVerification: true });
      } catch (err: any) {
        alert(err.errors[0].message);
      } finally {
        set({ isLoading: false });
      }
    },

    verifyCode: async (code, useSignUpHook) => {
      const { isLoaded, signUp, setActive } = useSignUpHook;

      set({ isLoading: true });

      try {
        if (isLoaded) {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code,
          });

          console.log(completeSignUp);

          await setActive({ session: completeSignUp.createdSessionId });
        }
      } catch (err: any) {
        alert(err.errors[0].message);
      } finally {
        set({ isLoading: false });
      }
    },
    fetchUserData: async () => {
      // set({ isLoaded: false });
      // const resu = await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve("Data fetched");
      //   }, 2000);
      // });
      // set({ isLoaded: true });
    },
    login: async (identifier, password, useSignInHook) => {
      const { isLoaded, signIn, setActive } = useSignInHook;

      set({ isLoading: true });

      try {
        if (isLoaded) {
          const completeSignIn = await signIn.create({
            identifier: identifier,
            password: password,
          });
          await setActive({
            session: completeSignIn.createdSessionId,
          });
        }
      } catch (err: any) {
        console.log(err);
        alert(err.errors[0].message);
      } finally {
        set({ isLoading: false });
      }
    },
    signOut: async (useSignOutHook) => {
      const { signOut } = useSignOutHook;

      set({ isLoading: true });
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("Data fetched");
        }, 500);
      });

      signOut();

      set({ isLoading: false });
    },
    resetPassword: async (email, useSignInHook) => {
      const { isLoaded, signIn } = useSignInHook;

      set({ isLoading: true });

      try {
        if (isLoaded) {
          await signIn.create({
            strategy: "reset_password_email_code",
            identifier: email,
          });
          set({ pendingVerification: true });
        }
      } catch (err: any) {
        console.log(err.errors);
        alert(err.errors[0].message);
      } finally {
        set({ isLoading: false });
      }
    },
    resetPasswordVerification: async (code, password, useSignInHook) => {
      const { isLoaded, signIn, setActive } = useSignInHook;

      set({ isLoading: true });

      try {
        if (isLoaded) {
          const completeSignIn = await signIn.attemptFirstFactor({
            strategy: "reset_password_email_code",
            code: code,
            password: password,
          });

          alert("Password reset successfully");

          await setActive({
            session: completeSignIn.createdSessionId,
          });
        }
      } catch (err: any) {
        console.log(err);
        alert(err.errors[0].message);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
  // { name: "auth-storage", storage: createJSONStorage(() => AsyncStorage) },
  //   ),
);
