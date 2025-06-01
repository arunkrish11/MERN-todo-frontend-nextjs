import "./globals.css";

export const metadata = {
  title: "ToDo WebApp",
  description: "Mark you progress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
