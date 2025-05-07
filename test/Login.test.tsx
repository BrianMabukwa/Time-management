import React from "react";
import Login from "@/app/Login/page";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}))

describe("Login Page", () => {
    const pushMock = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        });
    })

    test("renders login form", () => {
        render(<Login />);
    
        // Check if all required elements are present
        expect(screen.getByText("BookWorm")).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
        expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    });

    test("updates form fields when user types", () => {
        render(<Login />);

        const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

        const emailValue = "test@example.com";
        const passwordValue = "password123";

        fireEvent.change(emailInput, { target: { value: emailValue } });
        fireEvent.change(passwordInput, { target: { value: passwordValue } });

        expect(emailInput.value).toBe(emailValue);
        expect(passwordInput.value).toBe(passwordValue);
    })
})