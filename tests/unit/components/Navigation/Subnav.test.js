import { ref } from "vue";

import { mount } from "@vue/test-utils";
import Subnav from "@/components/Navigation/Subnav.vue";

import { useStore } from "vuex";
jest.mock("vuex");

import useConfirmRoute from "@/composables/useConfirmRoute";
jest.mock("@/composables/useConfirmRoute");

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
      useConfirmRoute.mockReturnValue(ref(true));
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }, { id: 2 }],
        },
      });

      const wrapper = mount(Subnav, createConfig("JobResults"));
      const jobCount = wrapper.find("[data-test='job-count'");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });
  describe("When user is on jobs page", () => {
    it("Does not display job count", () => {
      useConfirmRoute.mockReturnValue(ref(false));
      useStore.mockReturnValue({
        getters: {
          FILTERED_JOBS: [],
        },
      });

      const wrapper = mount(Subnav, createConfig());
      const jobCount = wrapper.find("[data-test='job-count'");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
