export const privacyPolicySections = [
  {
    title: "Who we are",
    paragraphs: [
      "Chuks Etuka Consulting is the controller responsible for personal information collected through this website. You can contact us at info@chuksetukaconsulting.com.",
    ],
  },
  {
    title: "Information we collect",
    paragraphs: [
      "If you use the contact form, your name, email address, organisation, phone number and message are sent through this website’s same-origin API and stored in our CMS-managed database so we can respond to your enquiry.",
      "The Inclusion Pulse Check runs in your browser. Its answers, progress and result stage are placed in the page address so you can refresh without losing progress. When you submit the email gate and consent to Pulse Check emails, your email address and consent timestamp are sent through this website’s same-origin API to MailerLite and added to the Pulse Check group. Your email is also kept in browser session storage after signup for the report watermark. Your answers and score are not sent to MailerLite. The report is displayed here; the report email control opens a draft in your email app.",
      "If you subscribe through the homepage newsletter modal, your email address and consent timestamp are sent through this website’s same-origin API to MailerLite and added to the newsletter-modal group. You can unsubscribe using the link in a newsletter email or contact us.",
      "If you submit an article comment, your name and comment are stored in our CMS-managed database and displayed publicly. This website does not offer article likes. You can contact us to request removal of a comment.",
      "If you agree to optional analytics, Vercel Analytics may process technical and usage information about visits to help us understand website performance and use. MailerLite processes signup details for the newsletter-modal and Pulse Check groups when you submit the corresponding form and consent.",
    ],
  },
  {
    title: "How and why we use information",
    paragraphs: [
      "We use information you send us to respond to your enquiry and discuss services you request. We use Pulse Check answers to calculate and display your assessment in your browser. With your consent, MailerLite stores your email in the Pulse Check group for related email follow-up. We use your email and consent to send newsletter updates when you sign up. Optional analytics help us understand and improve the site.",
      "Our lawful bases are steps taken at your request before a contract, our legitimate interests in responding to enquiries and maintaining the site, and your consent for newsletter emails, Pulse Check follow-up emails and optional analytics. You can withdraw consent or unsubscribe at any time. You can change analytics consent using Cookie settings on the Cookies page.",
    ],
  },
  {
    title: "Sharing and service providers",
    paragraphs: [
      "We do not sell personal information. Website hosting is provided through Cloudflare, and the website database is hosted by Neon. If enabled with your consent, website analytics are provided through Vercel. MailerLite processes the email address and consent timestamp submitted through the signup forms. Information you send by email is handled by your email provider. When you use the Calendly booking widget or link, Calendly processes the details you submit under its own privacy notice.",
      "Service providers may process information in countries outside the UK. Where this happens, the relevant provider is responsible for applying the transfer safeguards required by data protection law. Please review their privacy information before submitting information to an embedded or linked service.",
    ],
  },
  {
    title: "How long we keep information",
    paragraphs: [
      "Enquiry correspondence is normally kept for up to 24 months after the last meaningful contact, unless it needs to be retained longer for a contract, legal obligation or the establishment or defence of a legal claim.",
      "Newsletter and Pulse Check email subscriptions are held by MailerLite until you unsubscribe or ask for deletion. A first-party cookie containing only a subscribed flag keeps the homepage newsletter popup hidden for 12 months after signup. Pulse Check answers and progress remain in the page address, and the email used to watermark your report remains in session storage until you close the browser tab or clear browser data. The cookie choice is saved for up to 12 months. Newsletter dismissal is saved for 24 hours. You can clear browser storage at any time in your browser settings.",
    ],
  },
  {
    title: "Your rights",
    paragraphs: [
      "Depending on the circumstances, you may have rights to access, correct or erase your personal information, restrict or object to its use, and receive information in a portable format. If processing is based on consent, you can withdraw it at any time. To make a request, email info@chuksetukaconsulting.com.",
      "You can also raise a concern with the UK Information Commissioner's Office at ico.org.uk. We would appreciate the opportunity to respond to your concern first.",
    ],
  },
  {
    title: "Children and changes to this notice",
    paragraphs: [
      "This website and its services are intended for organisations and adults, not children. We may update this notice when the site or its data practices change. The latest version will be published on this page with its updated date.",
    ],
  },
] as const;

export const privacyPolicyUpdated = "7 November 2026";

export const cookiePolicySections = [
  {
    title: "What cookies and browser storage do",
    paragraphs: [
      "Cookies and similar browser storage let a website remember choices between visits. This site uses cookies, local storage and session storage for the purposes below. The current consent choice is stored in your browser; it is not sent to the website server.",
    ],
  },
  {
    title: "Essential storage",
    paragraphs: [
      "The site stores your cookie choice in local storage so it can remember whether optional analytics are allowed. This preference is necessary to honour your choice and is kept for up to 12 months. After a successful homepage newsletter signup, a first-party cec-newsletter-subscribed cookie stores only a subscribed flag for 12 months so the newsletter popup stays hidden. It is not set by the Pulse Check. Pulse Check answers and progress are included in the page address so your session can be restored after a refresh. The email entered for the Pulse Check is held in session storage for the current browser session.",
    ],
  },
  {
    title: "Optional analytics",
    paragraphs: [
      "If you choose to allow analytics, Vercel Analytics loads to provide aggregated website usage and performance information. It is not loaded before you consent. Choose Only essential to keep it disabled. You can change this choice at any time using the controls below.",
    ],
  },
  {
    title: "Temporary preferences",
    paragraphs: [
      "If you close the newsletter popup without submitting it, a local storage entry prevents it from appearing again for 24 hours. Once you successfully subscribe, the separate subscribed flag cookie hides it for 12 months.",
    ],
  },
  {
    title: "Manage or clear storage",
    paragraphs: [
      "Use the controls on this page to update your analytics choice. You can also clear cookies and site data through your browser settings. Clearing site data removes saved preferences and local progress.",
    ],
  },
] as const;
