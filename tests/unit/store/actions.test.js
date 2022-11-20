import actions from "@/store/actions";
import getJobs from "@/api/getJobs";
jest.mock("@/api/getJobs");

describe("actions", () => {
  beforeEach(() => {
    getJobs.mockResolvedValue({
      id: 1,
      title: "Software Developer",
    });
  });
  describe("FETCH_JOBS", () => {
    it("makes a request to fetch jobs", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(getJobs).toHaveBeenCalled();
    });

    it("sends message to save received jobs in store", async () => {
      const context = { commit: jest.fn() };
      await actions.FETCH_JOBS(context);
      expect(context.commit).toHaveBeenCalledWith("RECEIVE_JOBS", {
        id: 1,
        title: "Software Developer",
      });
    });
  });
});
