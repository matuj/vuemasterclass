import nextElementInList from "@/utils/nextElementInList";

describe("NextElementInList", () => {
  it("Locates and returns the next element in a list", () => {
    const list = ["A", "B", "C", "D", "E"];
    const value = "C";
    const result = nextElementInList(list, value);
    expect(result).toBe("D");
  });

  describe("When element is at the end of the list", () => {
    it("Returns the first element of the list", () => {
      const list = ["A", "B", "C", "D", "E"];
      const value = "E";
      const result = nextElementInList(list, value);
      expect(result).toBe("A");
    });
  });
});
