"use client";
import RootLayout from "@/app/layout";
import { GlobalContextProvider } from "@/Context/GlobalContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/compiled/global.css";

export default function MyApp({ Component, pageProps }) {
    return (
        <GlobalContextProvider>
            <RootLayout>
            <Component {...pageProps} />
            <ToastContainer/>
            </RootLayout>
        </GlobalContextProvider>
    )
  }