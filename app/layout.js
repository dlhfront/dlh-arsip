import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/ToastProvider";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ARSIP-DLH",
  description: "Arsip Digital Dinas Lingkungan Hidup Kota Yogyakarta",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
