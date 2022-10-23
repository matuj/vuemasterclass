import { mount } from "@vue/test-utils";
import Subnav from "@/components/Navigation/Subnav.vue";

describe("Subnav", () => {
  const createConfig = (routeName) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });

  describe("When user is on job page", () => {
    it("Displays jobs count", () => {
      const wrapper = mount(Subnav, createConfig("JobResults"));
      const jobCount = wrapper.find("[data-test='job-count'");
      expect(jobCount.exists()).toBe(true);
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
