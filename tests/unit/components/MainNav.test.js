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

  describe("When user is logged out", () => {
    it("Prompts user to sign in", () => {
      const wrapper = mount(MainNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("When user is logged in", () => {
    it("Displays user profile picture", async () => {
      const wrapper = mount(MainNav);
      let profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);

      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
  });
});
