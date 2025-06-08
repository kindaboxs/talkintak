import { z } from "zod";

export const signInSchema = z.object({
	email: z.string().email({ message: "Invalid email format" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z
	.object({
		name: z.string().min(3, { message: "Name min length is 3" }),
		email: z.string().email({ message: "Invalid email format" }),
		password: z.string().min(8, { message: "Password min length is 8" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm password is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
