import { mount, RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/JobResults/JobListing.vue";

describe("JobListing", () => {
  const createJobProps = (jobProps = {}) => ({
    title: "Vue Developer",
    organization: "VueFactory",
    locations: ["Nairobi"],
    minimumQualifications: ["Code"],
    ...jobProps,
  });
  const createConfig = (jobProps) => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
    props: {
      job: {
        ...jobProps,
      },
    },
  });

  it("Renders job title", () => {
    const jobProps = createJobProps({ title: "Django Ninja" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Django Ninja");
  });

  it("Renders job organization", () => {
    const jobProps = createJobProps({ organization: "VueFactory" });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("VueFactory");
  });

  it("Renders job locations", () => {
    const jobProps = createJobProps({ locations: ["Nairobi", "Nakuru"] });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Nairobi");
    expect(wrapper.text()).toMatch("Nakuru");
  });

  it("Renders job minimum qualifications", () => {
    const jobProps = createJobProps({
      minimumQualifications: ["Vue experience", "Python experience"],
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    expect(wrapper.text()).toMatch("Vue experience");
    expect(wrapper.text()).toMatch("Python experience");
  });

  it("Links to individual job's page", () => {
    const jobProps = createJobProps({
      id: 15,
    });
    const wrapper = mount(JobListing, createConfig(jobProps));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const toProp = jobPageLink.props("to");
    expect(toProp).toBe("/jobs/results/15");
  });
});
