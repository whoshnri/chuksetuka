export type InsightArticle = {
  slug: string
  title: string
  category: string
  categorySlug: string
  date: string
  minutes: number
  excerpt: string
  image: string
  imageAlt: string
  paragraphs: string[]
}

export const insightCategories = [
  { label: "DEI&B strategy", slug: "dei-b-strategy" },
  { label: "Inclusive leadership", slug: "inclusive-leadership" },
  { label: "Accessibility", slug: "accessibility" },
  { label: "Psychological safety", slug: "psychological-safety" },
  { label: "Recruitment", slug: "recruitment" },
  { label: "Training", slug: "training" },
]

export const insightArticles: InsightArticle[] = [
  {
    slug: "why-your-inclusion-strategy-stalls-after-the-launch",
    title: "Why your inclusion strategy stalls after the launch",
    category: "DEI&B strategy",
    categorySlug: "dei-b-strategy",
    date: "2 October 2026",
    minutes: 8,
    excerpt: "Launch events are easy. The real test comes three months later, when the people who were meant to own the work go back to their day jobs.",
    image: "https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/12RCA9VZGZC2CWN2XWCNK0EJ01.jpg",
    imageAlt: "An inclusive leadership workshop in progress",
    paragraphs: [
      "A strategy launch can feel like a finish line. The room is full, the commitments sound clear and the organisation has a new document to share. The real work begins when everyone returns to their day jobs.",
      "For a strategy to last, people need to know what they are responsible for, how progress will be reviewed and where they can get support. Assigning ownership to one passionate colleague is not the same as building accountability across the organisation.",
      "Start with a small number of actions that can be measured and owned. Put them into existing planning and review cycles, make progress visible and create space to discuss what is not working. Inclusion becomes part of the way decisions are made, not an annual event.",
    ],
  },
  {
    slug: "reasonable-adjustments-are-the-floor-not-the-ceiling",
    title: "Reasonable adjustments are the floor, not the ceiling",
    category: "Accessibility",
    categorySlug: "accessibility",
    date: "18 September 2026",
    minutes: 6,
    excerpt: "Meeting the legal minimum is a starting point. Designing out barriers is the work.",
    image: "https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/43ZTGWRZTTVN4FQDNSRJVX5ND0.jpg",
    imageAlt: "Accessible workshop materials arranged on a table",
    paragraphs: [
      "Reasonable adjustments matter. They can remove a barrier for a person who has already had to explain why the usual process does not work for them. But a responsive adjustment is only one part of accessibility.",
      "Look at the process before anyone needs to ask. Are meeting materials available in advance? Can people contribute in different ways? Is the recruitment journey accessible from the advert to the interview? Designing for different access needs from the beginning benefits more people and reduces the burden on individuals to disclose and request changes.",
      "Start by listening to disabled people, review the points where people encounter your service or workplace, and prioritise improvements with clear ownership. Accessibility is not a one-off project; it is an ongoing way of noticing and removing barriers.",
    ],
  },
  {
    slug: "psychological-safety-starts-with-how-leaders-respond-to-bad-news",
    title: "Psychological safety starts with how leaders respond to bad news",
    category: "Psychological safety",
    categorySlug: "psychological-safety",
    date: "25 September 2026",
    minutes: 7,
    excerpt: "How a leader reacts to the first difficult message decides whether there will be a second.",
    image: "https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/02PFRE3DQ7YKJJNYRRS4FEZQ2D.jpg",
    imageAlt: "A team discussing a workplace challenge",
    paragraphs: [
      "Every organisation says it wants people to speak up. Fewer look closely at what happens in the ten seconds after someone does. The pause, the tone and the first question tell everyone in the room whether honesty is welcome or risky.",
      "I have sat in rooms where a junior colleague raised a concern about exclusion and watched the energy change. Nobody said anything unkind. But nobody said thank you either, and the lesson landed anyway.",
      "People don’t stop speaking up because of one bad reaction. They stop because the reaction was predictable.",
      "Psychological safety is not about avoiding discomfort. It is about making it normal to bring difficult information to the people who can act on it.",
      "Thank the messenger first. Before you assess the problem, acknowledge what it took to raise it. Ask what they need from you now, agree when you will follow up and close the loop, even when the answer is no.",
    ],
  },
  {
    slug: "what-lived-experience-brings-to-the-training-room",
    title: "What lived experience brings to the training room",
    category: "Training",
    categorySlug: "training",
    date: "4 September 2026",
    minutes: 6,
    excerpt: "Why the most useful training starts with honest stories, not slides.",
    image: "https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/16FF25JYGFS0EWW8SC86H5EC35.jpg",
    imageAlt: "Chuks facilitating a practical inclusion workshop",
    paragraphs: [
      "Lived experience can make an abstract policy feel human. It helps a group connect a decision, a process or a comment to the person who has to navigate it.",
      "That does not mean one person speaks for everyone, or that personal stories replace evidence and expertise. It means the room has a chance to learn from perspectives that are often missing from the conversation.",
      "Good facilitation creates enough trust for people to reflect honestly, and enough structure for that reflection to become action. The story is a starting point. What the organisation changes next is the measure of its value.",
    ],
  },
  {
    slug: "measuring-belonging-without-turning-people-into-data-points",
    title: "Measuring belonging without turning people into data points",
    category: "DEI&B strategy",
    categorySlug: "dei-b-strategy",
    date: "21 August 2026",
    minutes: 6,
    excerpt: "Workforce data matters, but only if it leads to a conversation and a change.",
    image: "https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/477R0ZG8VTXQ21Y5PS20DK5S9W.jpg",
    imageAlt: "A team reviewing workplace inclusion information",
    paragraphs: [
      "Data can help an organisation notice patterns in recruitment, progression, retention and access. It cannot tell you everything about why those patterns exist or what they feel like to the people involved.",
      "Pair quantitative measures with confidential feedback, accessible listening sessions and clear safeguards around privacy. Be transparent about what is collected, who can see it and how it will be used.",
      "Choose measures that relate to the change you want to make. If the information does not lead to a useful question or action, pause before collecting more. People are not data points; they are partners in understanding the experience behind the numbers.",
    ],
  },
  {
    slug: "inclusive-recruitment-starts-before-the-job-advert",
    title: "Inclusive recruitment starts before the job advert",
    category: "Recruitment",
    categorySlug: "recruitment",
    date: "7 August 2026",
    minutes: 5,
    excerpt: "Barriers often appear long before the interview. Here is where to look.",
    image: "https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/3NH15RW484EZXEVR43RV4KSVZJ.jpg",
    imageAlt: "A hiring team reviewing an inclusive recruitment process",
    paragraphs: [
      "The job advert is visible, but many recruitment barriers begin earlier: in how roles are designed, how essential criteria are chosen and who gets asked to shape the process.",
      "Review whether each criterion is genuinely necessary, offer accessible application formats and make the stages and assessment methods clear. Give panel members a shared framework for evaluating evidence rather than relying on assumptions about confidence or culture fit.",
      "An inclusive recruitment process is one people can understand, access and trust. It starts before the advert goes live and continues through onboarding and progression.",
    ],
  },
  {
    slug: "when-someone-gets-it-wrong-turning-awkward-moments-into-learning",
    title: "When someone gets it wrong: turning awkward moments into learning",
    category: "Inclusive leadership",
    categorySlug: "inclusive-leadership",
    date: "24 July 2026",
    minutes: 6,
    excerpt: "Mistakes will happen. What matters is whether your culture can learn from them.",
    image: "https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/48D617P74XETQH1WAAGE26AQQQ.jpg",
    imageAlt: "A facilitated discussion about inclusive leadership",
    paragraphs: [
      "Inclusion does not mean people never make mistakes. It means the organisation has a way to respond that takes impact seriously and leaves room for learning and accountability.",
      "Leaders can slow the moment down, listen to the person affected and avoid making intent the only thing that matters. A thoughtful response names the impact, sets a boundary where needed and helps people understand what should change.",
      "A culture that can learn from awkward moments is not a culture without standards. It is one where people can be challenged, repair harm and practise a better response next time.",
    ],
  },
]

export const featuredInsight = insightArticles[0]
export const mostReadInsights = [insightArticles[1], insightArticles[2], insightArticles[0], insightArticles[3]]
