import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Applications from "../Applications";
import { getApp } from "../api/api";

import "@testing-library/jest-dom";

vi.mock("../api/api");

describe("Applications component", () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(getApp).mockResolvedValue([
      {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        company: "Tech Corp",
        loan_amount: 50000,
        date_created: "2023-01-01",
        expiry_date: "2024-01-01",
        avatar: "avatar1.jpg",
        loan_history: []
      },
      {
        id: "2",
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        company: "Finance Inc",
        loan_amount: 75000,
        date_created: "2023-02-01",
        expiry_date: "2024-02-01",
        avatar: "avatar2.jpg",
        loan_history: []
      }
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders applications and load more button", async () => {
    const { container } = render(<Applications />);

    await waitFor(() => {
      expect(container.textContent).toContain("John");
      expect(container.textContent).toContain("Jane");
      expect(container.getElementsByClassName('button2').length).toBe(1);
    });

    expect(container.textContent).toContain("Load more");
  });

  it("loads more applications when load more button is clicked", async () => {
    const { container } = render(<Applications />);

    await waitFor(() => {
      expect(container.textContent).toContain("John");
      expect(container.textContent).toContain("Jane");
    });

    vi.mocked(getApp).mockResolvedValue([
      {
        id: "3",
        first_name: "Bob",
        last_name: "Johnson",
        email: "bob.johnson@example.com",
        company: "StartupXYZ",
        loan_amount: 25000,
        date_created: "2023-03-01",
        expiry_date: "2024-03-01",
        avatar: "avatar3.jpg",
        loan_history: []
      },
      {
        id: "4",
        first_name: "Alice",
        last_name: "Wilson",
        email: "alice.wilson@example.com",
        company: "Enterprise Ltd",
        loan_amount: 100000,
        date_created: "2023-04-01",
        expiry_date: "2024-04-01",
        avatar: "avatar4.jpg",
        loan_history: []
      }
    ]);

    const loadMoreButton = container.getElementsByClassName('button2')[0];
    await userEvent.click(loadMoreButton);
    await waitFor(() => {
      expect(container.textContent).toContain("Bob");
      expect(container.textContent).toContain("Alice");
    });

    expect(container.textContent).toContain("Previous");
  });

  it("handles error when fetching applications", async () => {
    vi.mocked(getApp).mockRejectedValue(
        new Error("Failed to fetch applications")
    );

    const { container } = render(<Applications />);
    await waitFor(() => {
      expect(container.textContent).toContain("Error:");
    });
  });
});
