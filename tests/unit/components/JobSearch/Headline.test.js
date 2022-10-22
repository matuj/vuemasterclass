import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import Headline from "@/components/JobSearch/Headline.vue";

describe("Headline", () => {
  beforeEach(() => {
    jest.useFakeTimers("legacy");
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("Displays introductory action verb", () => {
    const wrapper = mount(Headline);
    const actionVerb = wrapper.find("[data-test='action-verb']");
    expect(actionVerb.text()).toBe("Build");
  });

  it("Changes action verb at a consistent interval", () => {
    mount(Headline);
    expect(setInterval).toHaveBeenCalled();
  });

  it("Swaps action verb after first interval", async () => {
    const wrapper = mount(Headline);
    jest.runOnlyPendingTimers();
    await nextTick();
    const actionVerb = wrapper.find("[data-test='action-verb']");
    expect(actionVerb.text()).toBe("Create");
  });

  it("Removes interval when component is unmounted", () => {
    const wrapper = mount(Headline);
    wrapper.unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
