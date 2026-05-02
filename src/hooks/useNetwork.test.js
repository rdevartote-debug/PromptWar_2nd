import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useNetwork } from "./useNetwork";

describe("useNetwork Hook", () => {
  beforeEach(() => {
    vi.stubGlobal("navigator", {
      onLine: true,
      configurable: true,
    });
  });

  it("returns true when initially online", () => {
    const { result } = renderHook(() => useNetwork());
    expect(result.current).toBe(true);
  });

  it("updates to false when going offline", () => {
    const { result } = renderHook(() => useNetwork());
    
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    
    expect(result.current).toBe(false);
  });

  it("updates to true when coming back online", () => {
    const { result } = renderHook(() => useNetwork());
    
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(result.current).toBe(false);

    act(() => {
      window.dispatchEvent(new Event("online"));
    });
    expect(result.current).toBe(true);
  });
});
