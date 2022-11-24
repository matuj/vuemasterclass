import { mount } from "@vue/test-utils";
import Subnav from "@/components/Navigation/Subnav.vue";

describe("Subnav", () => {
  const createConfig = (routeName, $store = {}) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
        $store,
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("When user is on job page", () => {
    it("Displays jobs count", () => {
      const $store = {
        getters: {
          FILTERED_JOBS: [{ id: 1 }, { id: 2 }],
        },
      };
      const wrapper = mount(Subnav, createConfig("JobResults", $store));
      const jobCount = wrapper.find("[data-test='job-count'");
      expect(jobCount.text()).toMatch("2 jobs matched");
    });
  });
  describe("When user is on jobs page", () => {
    it("Does not display job count", () => {
      const wrapper = mount(Subnav, createConfig("Home"));
      const jobCount = wrapper.find("[data-test='job-count'");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
