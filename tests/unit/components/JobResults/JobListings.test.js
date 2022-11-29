import { ref } from "vue";

import { shallowMount, flushPromises, RouterLinkStub } from "@vue/test-utils";

import { useFilteredJobs, useFetchJobsDispatch } from "@/store/composables";
jest.mock("@/store/composables");

import useCurrentPage from "@/composables/useCurrentPage";
jest.mock("@/composables/useCurrentPage");
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";
jest.mock("@/composables/usePreviousAndNextPages");

import JobListings from "@/components/JobResults/JobListings.vue";

describe("JobListings", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  describe("when the component mounts", () => {
    it("makes call to fetch jobs from API", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue({ value: 2 });
      usePreviousAndNextPages.mockReturnValue({ previousPage: 1, nextPage: 3 });
      shallowMount(JobListings, createConfig());
      expect(useFetchJobsDispatch).toHaveBeenCalled();
    });
  });

  it("Creates a job listing for a maximum of 10 jobs", async () => {
    useFilteredJobs.mockReturnValue({ value: [Array(15).fill({})] });
    useCurrentPage.mockReturnValue({ value: 1 });
    usePreviousAndNextPages.mockReturnValue({
      previousPage: undefined,
      nextPage: 2,
    });
    const wrapper = shallowMount(JobListings, createConfig());
    await flushPromises();
    const jobListingsCount = wrapper.findAll("[data-test='job-listing']");
    expect(jobListingsCount).toHaveLength(10);
  });

  it("displays page number", () => {
    useFilteredJobs.mockReturnValue({ value: [] });
    useCurrentPage.mockReturnValue(ref(5));
    usePreviousAndNextPages.mockReturnValue({ previousPage: 4, nextPage: 6 });
    const wrapper = shallowMount(JobListings, createConfig());
    expect(wrapper.text()).toMatch("Page 5");
  });

  describe("when user is on first page of job results", () => {
    it("doest not show link to previous page", () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(false);
    });

    it("shows link to next page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(1));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: undefined,
        nextPage: 2,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(true);
    });
  });

  describe("when user is on the last page of job results", () => {
    it("doest not show link to the next page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const nextPage = wrapper.find("[data-test='next-page-link']");
      expect(nextPage.exists()).toBe(false);
    });

    it("shows link to the previous page", async () => {
      useFilteredJobs.mockReturnValue({ value: [] });
      useCurrentPage.mockReturnValue(ref(2));
      usePreviousAndNextPages.mockReturnValue({
        previousPage: 1,
        nextPage: undefined,
      });
      const wrapper = shallowMount(JobListings, createConfig());
      await flushPromises();
      const previousPage = wrapper.find("[data-test='previous-page-link']");
      expect(previousPage.exists()).toBe(true);
    });
  });
});
