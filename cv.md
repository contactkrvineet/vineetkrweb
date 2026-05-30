# Vineet Kumar

**QE Manager | SDET Lead | AI Test Automation Architect**

Toronto, ON, Canada | +1 437-428-2199 | contactkrvineet@gmail.com  
[linkedin.com/in/vineet2311](https://linkedin.com/in/vineet2311) | [github.com/contactkrvineet](https://github.com/contactkrvineet) | [vineetkr.com](https://vineetkr.com)  
Permanent Resident, Canada | No sponsorship required

## Career Highlights

- 78% regression cycle reduction at Goldman Sachs (5 days to 11 hours) across 3,000+ tests on 12 banking microservices.
- Shipped 5 AI agents to enterprise QE workflows at Goldman Sachs (internal); architected the Selenium + Java + Cucumber framework underpinning them.
- Led a 12-engineer SDET organization across Canada, USA, and India; 16+ years in regulated banking and digital commerce.
- QE community contributor: built open-source AI tooling at [codereview.vineetkr.com](https://codereview.vineetkr.com); speaker at BrowserStack, ATAGTR2025, and Testing Mind.

## Professional Summary

QE Manager and SDET Lead with 16+ years building test automation for regulated banking and digital commerce. Currently architecting AI-driven QE workflows at Goldman Sachs through Publicis Sapient, including code review, requirements-to-test generation, and self-healing automation agents. Lead a 12-engineer global SDET team and have shipped frameworks covering 3,000+ tests across 12 banking microservices.

## Technical Skills

- **Languages:** Java, Python, TypeScript, JavaScript, SQL
- **Test Automation:** Selenium WebDriver, Playwright, Appium, REST Assured, Pact (contract testing), Cucumber (BDD), TestNG, Postman, WireMock, JMeter, Gatling
- **AI / LLM Engineering:** LangChain, RAG pipelines, prompt engineering for QE workflows, MCP servers (including Playwright MCP), Claude Code for agentic development, multi-provider LLM integration (Anthropic, OpenAI, Groq, Ollama)
- **CI/CD, Cloud, and DevOps:** Jenkins, GitLab CI/CD, GitHub Actions, Docker, AWS (CodePipeline, EC2, Device Farm), Maven, Gradle, SonarQube, Allure, Extent Reports, Jira, Zephyr
- **Practices:** Shift-left testing, TDD, BDD, Page Object Model, contract testing, flaky test management, test data management, performance engineering
- **Domain:** Banking, Wealth Management, Payments, Salesforce CRM, Digital Commerce, Retail

## Professional Experience

### QE Manager | Publicis Sapient (Global Delivery: Canada, USA, India)

**Nov 2015 - Present**  
Progression: SDET -> SDET Lead -> QE Manager  
Client: Goldman Sachs - Wealth Management and Banking Division

- Architected the BDD automation framework (Selenium WebDriver + Java + TestNG + Cucumber) covering 3,000+ test cases across 12 banking microservices, including Salesforce CRM and financial transaction processing. Cut regression execution from 5 days to 11 hours (78% reduction).
- Ran integration testing across 12 banking microservices and 4 downstream systems during weekly release cycles; partnered with development leads on hotfix validation, achieving 6 consecutive zero-rollback production deployments.
- Shifted testing into PR pipelines on 12 banking repos with PR-gated unit and contract tests plus pre-merge static checks. Reduced production defects by 25% and mean time to detect critical issues by 60%.
- Built REST Assured API automation with Pact contract testing across 12+ banking microservices; integrated into Jenkins and GitLab CI/CD with parallel execution, Allure reporting, and Slack alerts.
- Built a dynamic test data service (Java + REST) replacing shared QA databases and enabling isolated parallel test runs across 8 feature suites.
- Designed enterprise load and performance testing strategy (JMeter, Gatling) validating 5,000+ concurrent users; identified bottlenecks that improved API response time by 30% while holding SLA under peak transaction volumes.
- Built a weekly quality dashboard (Allure + executive scorecard) consumed by 4 engineering directors; release readiness scorecard gated 30+ production deployments.

#### AI Agents (Goldman Sachs QE Team)

Built and shipped 5 AI agents adopted by the Goldman Sachs QE team. Agents run in QA environments with outputs validated through banking compliance gates before promotion.

- **AI Code Review Agent (Python + Claude via MCP server):** Scans GitLab merge-request diffs against POM and internal framework standards, and posts inline comments on banking microservice repos. Adopted across 4 active QE repos.
- **AI Requirements-to-Acceptance-Criteria Agent:** Reads Confluence business requirements and pushes compliance-format acceptance criteria into Jira, reducing BA-to-QE handoff time.
- **AI Feature File and Step Reuse Agent:** Analyzes Jira acceptance criteria, generates Gherkin feature files, and detects existing step definitions to prevent duplication. Reduced feature authoring cycle from 3 days to 18 hours.
- **AI Component and Locator Reuse Agent:** Analyzes DOM structure for new UI automation needs and either reuses existing Page Object components/locators or generates new ones conforming to framework structure; auto-maps feature files to glue and step definitions.
- **AI Smart Test Impact Agent:** Uses Python + LLM to analyze commit diffs for impacted Salesforce modules (`@opp`, `@lead`, `@pardot`), triggers a targeted subset for fast feedback, then runs full `@regression` as second-pass safety.

#### Leadership

- Managed and mentored a 12-engineer SDET team across Canada, USA, and India; owned hiring, structured onboarding, 1:1s, and performance reviews.
- Partnered with engineering and product leadership on quarterly quality OKRs and release readiness.
- Authored QE coding standards (POM patterns, naming conventions, linting rules, SonarQube gates) adopted by 4 squads; reduced code review iteration by about 35% and shortened SDET onboarding from 3 weeks to 10 days.

#### Prior Clients (Retail and Digital Commerce)

Marriott International, Lowe's, Bed Bath and Beyond

- Built cross-platform Appium + Selenium frameworks (iOS, Android, responsive web) covering 1,200+ test cases for cart, payments, order management, and account workflows with dynamic test data generation.
- Built CI/CD pipelines on AWS (CodePipeline, EC2) with Report Portal dashboards; led flaky test remediation reducing suite instability from 18% to under 3%.

### Senior Test Engineer | NIIT Technologies

**Mar 2015 - Nov 2015**

- Built Selenium + TestNG automation and reusable utilities for the SITA aviation system; reduced test development time by 30%.

### Senior Test Engineer | Aptara Inc. (acquired iServices)

**May 2014 - Mar 2015**

- Led API test automation (REST Assured + Postman) for a content management platform with 60+ endpoints across 4 microservices.
- Jenkins integration reduced manual regression effort by 50%.
- Mentored 3 junior QA engineers.

### QA Analyst | iServices (Client: BancTec)

**Dec 2013 - Apr 2014**

- Performed functional and regression testing for the BancTec document capture and workflow processing platform.
- Authored test cases for enterprise document workflows.

### QA Analyst | Toluna

**Jul 2010 - Nov 2013**

- Performed functional, regression, and UAT testing for a survey and panel SaaS platform serving 4M+ users.
- Introduced Selenium IDE automation that reduced manual regression cycles from 3 days to 8 hours.

## Selected Projects and Open Source

- **AI Code Review Agent (open-source community project):** Standalone LLM-based code review tool built in personal time for the QE community. Paste any GitHub or GitLab URL to flag style and convention violations. Supports pluggable LLM backends (Claude, Gemini, Ollama, OpenAI), structured JSON output, and GitHub Actions integration.  
  Live: [codereview.vineetkr.com](https://codereview.vineetkr.com)
- **Playwright BDD Framework (TypeScript):** Production-grade framework with multi-reporter support (Cucumber HTML, Allure, Bootstrap), parallel execution, multi-browser support, and GitHub Actions CI.  
  Live report: [contactkrvineet.github.io/playwright-bdd-framework](https://contactkrvineet.github.io/playwright-bdd-framework)
- **Python BDD Automation Framework:** Behave + Selenium + Requests with dual UI/API testing, Page Object Model, parallel execution, environment configurability, and multiple report formats.  
  GitHub: [github.com/contactkrvineet/python-bdd-automation-framework](https://github.com/contactkrvineet/python-bdd-automation-framework)

## Speaking and Community

- BrowserStack - Speaker: Transforming Test Automation with AI | Toronto | March 2026 (Upcoming)
- Agile Testing Alliance (ATAGTR2025) - Speaker: Smart Test Execution with AI | Virtual | November 2025
- Testing Mind TAS25 - Speaker: AI in Test Automation | Toronto | June 2025

View all sessions: [vineetkr.com/about](https://vineetkr.com/about)

## Education

- B.Tech, Computer Science - Uttar Pradesh Technical University, India | 2008

## Certifications

SAFe POPM | AWS Generative AI Essentials | Microsoft Azure Fundamentals (AZ-900) | ISTQB Foundation Level | PCEP - Certified Entry-Level Python Programmer
