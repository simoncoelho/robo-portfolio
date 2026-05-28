import React from "react";
import { FaLinkedin } from "react-icons/fa";

const projects = [
  {
    title: "Sciontology.ai",
    href: "https://www.sciontology.ai/",
    meta: "Smart lab automation",
    description:
      "A project focused on enabling smarter lab automation through collective knowledge bases for fast instrument integration in novel ways.",
  },
  {
    title: "MCP for Lab Automation",
    href: "https://github.com/simoncoelho/LabAutomationMCP",
    meta: "Agentic lab interfaces",
    description:
      "Exploring typed tool boundaries between AI systems, workflow software, and lab automation instruments.",
  },
  {
    title: "Bacter.AI",
    href: "https://github.com/simoncoelho/bacter.ai",
    meta: "AI science hackathon",
    description:
      "A prototype copilot for bacterial culture passaging, built around experimental workspaces, literature context, and lab capability constraints.",
  },
];

export default function SectionPanel({ section, onClose }) {
  if (!section) return null;

  const normalizedSection = section.toUpperCase();
  const stopEvent = (event) => {
    event.stopPropagation();
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <aside
      className="section-panel"
      aria-label={`${normalizedSection} section`}
      onClick={stopEvent}
      onPointerDown={stopEvent}
      onPointerUp={stopEvent}
    >
      <div className="section-panel__chrome">
        <p>{normalizedSection}</p>
        <button
          className="section-panel__close"
          type="button"
          onClick={handleClose}
          onPointerDown={stopEvent}
        >
          close
        </button>
      </div>

      {normalizedSection === "PROJECTS" && (
        <section className="section-panel__content">
          <h1>Projects</h1>
          <ol className="project-list">
            {projects.map((project) => (
              <li className="project-item" key={project.title}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  <span>{project.meta}</span>
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}

      {normalizedSection === "ABOUT" && (
        <section className="section-panel__content">
          <h1>About</h1>
          <p>
            I am Simon Coelho, a software engineer working at the intersection of software,
            biotech, robotics, and lab automation.
          </p>
          <p>
            I build software that connects instruments, coordinates workflows, and makes
            scientific work more repeatable. My recent focus is AI-assisted lab systems,
            autonomous lab interfaces, and practical tooling for scientific instrumentation.
          </p>
        </section>
      )}

      {normalizedSection === "RESUME" && (
        <section className="section-panel__content">
          <h1>Resume</h1>
          <div className="resume-list">
            <section>
              <h2>Focus</h2>
              <p>Lab automation software, instrument integrations, workflow orchestration, and AI for scientific systems.</p>
            </section>
            <section>
              <h2>Experience</h2>
              <p>Software engineer at Biosero and BioNex.</p>
            </section>
            <section>
              <h2>Education</h2>
              <p>B.S. Chemical Engineering, University of California, Davis.</p>
            </section>
          </div>
        </section>
      )}

      {normalizedSection === "CONTACT" && (
        <section className="section-panel__content">
          <h1>Contact</h1>
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/simon-coelho"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={64} />
            <span>linkedin</span>
          </a>
        </section>
      )}
    </aside>
  );
}
