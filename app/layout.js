"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";
import {Header2} from "@/app/Components/header2";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
    const pathname = usePathname(); // Use usePathname to get the current path
    const showHeader2 = pathname === '/login' || pathname === '/signin';
  return (

    <html lang="en" data-theme="light">
      <body className={inter.className}>

   <AuthProvider>
       {!showHeader2 && <Header2 />}
      {children}
   <ToastContainer/>
   </AuthProvider>

      </body>
    </html>
  );
}
