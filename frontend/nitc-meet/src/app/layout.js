
import SessionWrapper from "@/components/SessionWrapper";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}