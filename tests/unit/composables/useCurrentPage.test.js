import { useRoute } from "vue-router";
jest.mock("vue-router");

import useCurrentPage from "@/composables/useCurrentPage";

describe("useCurrentPage", () => {
  describe("when query params include page", () => {
    it("returns the page", () => {
      useRoute({
        query: {
          page: "5",
        },
      });
      const result = useCurrentPage();
      expect(result.value).toBe(5);
    });
  });

  describe("when query params do not include page", () => {
    it("returns the page", () => {
      useRoute({
        query: {},
      });
      const result = useCurrentPage();
      expect(result.value).toBe(1);
    });
  });
});
