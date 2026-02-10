import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  usePathname: () => "/en-gb",
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));
