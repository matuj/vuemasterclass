import { mount } from "@vue/test-utils";
import Subnav from "@/components/Navigation/Subnav.vue";

import useConfirmRoute from "@/composables/useConfirmRoute";
jest.mock("@/composables/useConfirmRoute");

import { useFilteredJobs } from "@/store/composables";
jest.mock("@/store/composables");

describe("Subnav", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("When user is on job page", () => {
    it("Displays jobs count", () => {
      useConfirmRoute.mockReturnValue(true);
      useFilteredJobs.mockReturnValue([{ id: 1 }, { id: 2 }]);
      const wrapper = mount(Subnav, createConfig("JobResults"));
      const jobCount = wrapper.find("[data-test='job-count'");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });
  describe("When user is on jobs page", () => {
    it("Does not display job count", () => {
      useConfirmRoute.mockReturnValue(false);
      useFilteredJobs.mockReturnValue([]);
      const wrapper = mount(Subnav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count'");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
