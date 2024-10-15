import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Day 1 Tools',
  description: 'Quick Access everyday tools',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
