import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import i18n from "../i18n";
import { Portfolio } from "./Portfolio";

describe("Portfolio", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("pt-BR");
  });

  it("renders three placeholder project cards", () => {
    render(<Portfolio />);
    expect(screen.getAllByText("Cine Dash")).toHaveLength(1);
    expect(screen.getAllByText("AI Ticket Triage")).toHaveLength(1);
    expect(screen.getAllByText("Order Events")).toHaveLength(1);
  });
});
