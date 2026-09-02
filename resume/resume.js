(function () {
  const data = window.resumeData;
  const root = document.querySelector("[data-resume-root]");

  if (!data || !root) {
    return;
  }

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const link = (href, label) =>
    `<a href="${escapeHTML(href)}" target="_blank" rel="noopener">${escapeHTML(label)}</a>`;

  const mail = (email) => `<a href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a>`;

  const section = (title, content) => `
    <section class="resume-section" aria-labelledby="${slug(title)}">
      <h2 id="${slug(title)}">${escapeHTML(title)}</h2>
      ${content}
    </section>
  `;

  const slug = (value) =>
    String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const experience = data.experience
    .map(
      (item) => `
        <article class="resume-item">
          <div class="resume-item-header">
            <div>
              <h3>${escapeHTML(item.company)}</h3>
              <p class="resume-role">${escapeHTML(item.role)}</p>
            </div>
            <p class="resume-meta">${escapeHTML(item.startDate)} - ${escapeHTML(item.endDate)}</p>
          </div>
          ${item.location ? `<p class="resume-location">${escapeHTML(item.location)}</p>` : ""}
          <p>${escapeHTML(item.description)}</p>
          ${
            item.projects
              ? `
                <ul class="project-list" aria-label="Independent apps">
                  ${item.projects.map((project) => `<li>${escapeHTML(project)}</li>`).join("")}
                </ul>
              `
              : ""
          }
        </article>
      `
    )
    .join("");

  const skills = data.skills
    .map(
      (group) => `
        <div class="skill-group">
          <h3>${escapeHTML(group.category)}</h3>
          <ul class="skill-list">
            ${group.items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
          </ul>
        </div>
      `
    )
    .join("");

  const education = data.education
    .map(
      (item) => `
        <article class="resume-item">
          <div class="resume-item-header">
            <div>
              <h3>${escapeHTML(item.institution)}</h3>
              <p>${escapeHTML(item.degree)}</p>
            </div>
            <p class="resume-meta">${escapeHTML(item.period)}</p>
          </div>
        </article>
      `
    )
    .join("");

  const languages = `
    <ul class="simple-list">
      ${data.languages
        .map((item) => `<li><strong>${escapeHTML(item.language)}</strong> - ${escapeHTML(item.level)}</li>`)
        .join("")}
    </ul>
  `;

  const certifications = `
    <ul class="certification-list">
      ${data.certifications
        .map(
          (item) => `
            <li class="${item.startsWith("NOM-") ? "secondary-certification" : ""}">
              ${escapeHTML(item)}
            </li>
          `
        )
        .join("")}
    </ul>
  `;

  root.innerHTML = `
    <header class="resume-header">
      <p class="resume-kicker">Resume</p>
      <h1>${escapeHTML(data.name)}</h1>
      <p class="resume-title">${escapeHTML(data.title)}</p>
      <p class="resume-description">${escapeHTML(data.description)}</p>
      <address class="resume-contact">
        <span>${escapeHTML(data.location)}</span>
        <span>${mail(data.contact.email)}</span>
        <span>${link(data.contact.linkedin, "LinkedIn")}</span>
        <span>${link(data.contact.website, "Website")}</span>
      </address>
      <div class="resume-actions" aria-label="Resume actions">
        <button type="button" onclick="window.print()">Print Resume</button>
        <a href="mailto:${escapeHTML(data.contact.email)}">Contact Me</a>
      </div>
    </header>

    ${section("Professional Summary", `<p>${escapeHTML(data.summary)}</p>`)}
    ${section("Experience", experience)}
    ${section("Technical Skills", `<div class="skills-grid">${skills}</div>`)}
    ${section("Education", education)}
    ${section("Languages", languages)}
    ${section("Certifications", certifications)}
  `;
})();
