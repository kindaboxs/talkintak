import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { geistMono, geistSans } from "@/lib/fonts";

import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Talkintak",
	description: "Talkintak - AI Conversation",
	icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			suppressHydrationWarning
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster position="top-center" richColors />
				</ThemeProvider>
			</body>
		</html>
	);
}
