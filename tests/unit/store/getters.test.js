import getters from "@/store/getters";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from a list of jobs", () => {
      const state = {
        jobs: [
          { organization: "google" },
          { organization: "amazon" },
          { organization: "google" },
        ],
      };
      const result = getters.UNIQUE_ORGANIZATIONS(state);
      expect(result).toEqual(new Set(["google", "amazon"]));
    });
  });

  describe("FILTERED_JOBS_BY_ORGANIZATIONS", () => {
    it("identifies jobs that are associated with the given organization", () => {
      const state = {
        jobs: [
          { organization: "google" },
          { organization: "amazon" },
          { organization: "microsoft" },
        ],
        selectedOrganizations: ["google", "microsoft"],
      };
      const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state);
      expect(filteredJobs).toEqual([
        { organization: "google" },
        { organization: "microsoft" },
      ]);
    });

    describe("when the user has not selected any organization", () => {
      it("returns all jobs", () => {
        const state = {
          jobs: [
            { organization: "google" },
            { organization: "amazon" },
            { organization: "microsoft" },
          ],
          selectedOrganizations: [],
        };
        const filteredJobs = getters.FILTERED_JOBS_BY_ORGANIZATIONS(state);
        expect(filteredJobs).toEqual([
          { organization: "google" },
          { organization: "amazon" },
          { organization: "microsoft" },
        ]);
      });
    });
  });
});
