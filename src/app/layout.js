import "./globals.css";

export const metadata = {
  title: "nitc.students",
  description: "Be friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
