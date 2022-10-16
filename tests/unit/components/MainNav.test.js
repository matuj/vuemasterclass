import { mount } from "@vue/test-utils";
import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("Displays company name", () => {
    const wrapper = mount(MainNav);
    expect(wrapper.text()).toMatch("DayDream Careers");
  });

  it("Displays menu items for navigation", () => {
    const wrapper = mount(MainNav);
    const navMenuItems = wrapper.findAll("[data-test='main-nav-list-item']");
    const navMenuTexts = navMenuItems.map((navMenuItem) => navMenuItem.text());
    expect(navMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life at DayDream",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });
});
