export type FAQItem = {
  question: string
  answer: string
}

export type FAQGroup = {
  title: string
  items: FAQItem[]
}

export const faqGroups: FAQGroup[] = [
  {
    title: "Working together & training",
    items: [
      {
        question: "What does Chuks Etuka Consulting do?",
        answer: "Chuks Etuka Consulting helps organisations turn good intentions about diversity, equity, inclusion and belonging (DEI&B) into meaningful action. We support charities, public-sector organisations, schools, social enterprises and businesses to build more inclusive workplaces, accessible services and equitable cultures. Our services include DEI&B consultancy, diversity and inclusion training, anti-racism workshops, inclusive leadership coaching, accessibility audits, equality impact assessments and practical inclusion strategies. In short, we help you move beyond tick-box inclusion towards changes people can actually see, feel and experience. Because a beautifully written policy is lovely, but it works much better when someone puts it into practice!",
      },
      {
        question: "Who does Chuks Etuka Consulting work with?",
        answer: "We work with organisations that want to make inclusion part of how they operate, lead, recruit and deliver services. Our clients may include charities, local authorities, schools, community organisations, social enterprises, SMEs and other purpose-driven businesses. Whether you are a small charity with big ambitions or a growing organisation trying to get inclusion right, we can help you identify practical next steps. You don't need a dedicated DEI&B department or a 47-page strategy to start the conversation. You just need a willingness to listen, learn and do something differently.",
      },
      {
        question: "What is DEI&B consultancy, and why does my organisation need it?",
        answer: "DEI&B consultancy helps organisations understand how their policies, practices, leadership decisions and everyday culture affect people from different backgrounds and with different experiences. A consultant can help you identify barriers, assess current practice, develop a DEI&B strategy and turn recommendations into realistic actions. This matters because good intentions alone don't guarantee fair outcomes. You might have an equal opportunities policy while your recruitment process unintentionally excludes talented candidates. CEC helps you examine the gap between what your organisation says it values and what people actually experience. Think of it as an inclusion reality check without the judgement, unnecessary jargon or 200-slide presentation.",
      },
      {
        question: "What types of diversity, inclusion & belonging training do you offer?",
        answer: "Chuks Etuka Consulting offers tailored diversity, equity, inclusion and accessibility training designed around your organisation's needs. Topics can include:\n• Disability awareness and workplace accessibility\n• Anti-racism and racial equity\n• Inclusive leadership and inclusive recruitment\n• Unconscious bias and equitable decision-making\n• Psychological safety and belonging\n• Intersectionality and lived experience\n• Trauma-informed practice\n• Creating more inclusive services and workplaces\n\nSessions can be designed for leaders, managers, frontline staff, volunteers, trustees or whole teams. The focus is on practical learning, reflection and actions participants can apply in their roles. We want people leaving with more than a certificate and a half-finished notebook!",
      },
      {
        question: "Can you tailor DEI&B training to our organisation?",
        answer: "Absolutely. Effective inclusion training should reflect your organisation's context, challenges and objectives, not simply arrive in a generic PowerPoint wearing a different logo. We can discuss your sector, workforce, existing policies, learning objectives and the issues you want to address before shaping a suitable session. Depending on your brief, training can include scenarios, facilitated discussion, practical exercises and opportunities for reflection. The aim is to make the learning relevant to people's everyday decisions and responsibilities, rather than delivering a one-size-fits-all session and hoping for the best.",
      },
      {
        question: "Do you deliver in-person and online training?",
        answer: "CEC can discuss both in-person and online delivery, depending on the project, location, availability and agreed requirements. We can also explore suitable formats for workshops, masterclasses, leadership development and team learning. Accessibility is an important consideration when planning delivery. We encourage clients to discuss access requirements in advance, including captioning, accessible materials, communication preferences and other reasonable adjustments. After all, a session about inclusion should not accidentally exclude someone before the first slide appears!",
      },
    ],
  },
  {
    title: "Specialist support & lasting change",
    items: [
      {
        question: "What is an accessibility audit, and how can it help my organisation?",
        answer: "An accessibility audit examines how easily people living with disabilities and others with access requirements can use your spaces, services or digital experiences. Depending on the agreed scope, CEC can support physical accessibility assessments, online accessibility reviews and practical evaluations informed by disabled people's experiences. An audit can help identify barriers, prioritise improvements and make recommendations that support a more accessible customer, visitor, employee or service-user experience. Accessibility isn't simply about ramps and lifts. It can also involve signage, communication, digital content, information formats and the way services are designed and delivered. The goal is to help you understand what creates barriers and what you can do about them, not just produce a report that looks impressive on a shelf.",
      },
      {
        question: "Why should we choose a disability-informed accessibility consultant?",
        answer: "Accessibility is about people's real experiences, not just measurements on a checklist. Chuks Etuka Consulting brings professional DEI&B expertise together with lived experience of disability. This perspective can help organisations explore barriers that might otherwise be overlooked. Depending on the project, we can examine how people encounter your environment, policies, services and processes, then develop practical recommendations for improvement. Lived experience is not a substitute for technical standards or specialist assessments where these are required. It is a valuable perspective that can help make accessibility work more grounded, relevant and human-centred. Because the people affected by a barrier should have a say in how we remove it.",
      },
      {
        question: "Can you help us develop a DEI&B strategy?",
        answer: "Yes. CEC can support organisations to develop or strengthen a diversity, equity and inclusion strategy that reflects their objectives, people and operating context. This may include reviewing existing policies and practice, identifying priorities, considering relevant workforce or service-user data, engaging stakeholders and developing an action plan with responsibilities and measures of progress. A useful DEI&B strategy should help people answer three questions: What needs to change? Who is responsible for making it happen? How will we know whether it is making a difference? The aim is to make inclusion part of everyday decision-making, rather than an annual document that reappears around awareness days.",
      },
      {
        question: "Do you provide anti-racism training and racial equity consultancy?",
        answer: "Yes. CEC can support organisations to explore racism, racial inequity, bias and the ways organisational systems and everyday practices affect people's experiences and opportunities. Depending on your needs, support may include anti-racism workshops, reflective discussions, inclusive leadership development, policy reviews and work to strengthen racial equity within organisational culture. The approach is practical, thoughtful and focused on learning, accountability and meaningful change. These conversations can be uncomfortable at times. That's not a reason to avoid them, but they should be handled with care, clarity and a willingness to examine assumptions. The aim is not to point fingers for the sake of it. It is to understand what needs to change and take responsibility for changing it.",
      },
      {
        question: "Can you help us improve inclusive leadership and psychological safety?",
        answer: "Yes. CEC supports organisations to consider how leadership behaviours, workplace culture and decision-making affect inclusion, trust and belonging. This may include inclusive leadership coaching, reflective supervision, facilitated discussions and training on psychological safety. Psychological safety means people feel able to speak up, ask questions, raise concerns and acknowledge mistakes without unreasonable fear of humiliation or punishment. It doesn't mean avoiding difficult conversations or agreeing with everyone. It means creating conditions in which people can contribute honestly and challenge things constructively. Because if everyone in your meeting agrees with the boss all the time, you might have a wonderfully harmonious team, a room full of robots, or a room full of people who don't feel safe enough to disagree!",
      },
      {
        question: "What is an Equality Impact Assessment, and can you help with one?",
        answer: "An Equality Impact Assessment (EIA) helps an organisation consider how a proposed or existing policy, service, project or decision may affect different groups of people. It can help identify potential disadvantage, accessibility barriers and opportunities to improve fairness before decisions are implemented. CEC can support organisations with EIA processes and inclusive governance, depending on the project scope. This may include reviewing proposals, identifying relevant equality considerations, engaging affected stakeholders and developing recommendations. An EIA should be more than a form completed because someone asked for one. Used thoughtfully, it can help decision-makers spot problems early and make better-informed choices. The earlier you identify a barrier, the easier it may be to address. Prevention is often less painful than the organisational equivalent of emergency plumbing!",
      },
    ],
  },
  {
    title: "Costs, next steps & measuring progress",
    items: [
      {
        question: "How much does DEI&B consultancy or inclusion training cost?",
        answer: "The cost depends on the service, preparation required, delivery format, project complexity and level of support needed. CEC offers different services and can discuss an approach that reflects your organisation's objectives and budget. If you're working with a limited budget, tell me. We can discuss your priorities and whether a proportionate starting point is possible. Meaningful inclusion shouldn't begin with a financial panic attack!",
      },
      {
        question: "How do we get started with Chuks Etuka Consulting?",
        answer: "The first step is to get in touch and tell us a little about your organisation and what you're hoping to achieve. We can discuss your challenges, objectives, timescales and the type of support that may be most useful. Depending on your needs, the next step could be a training session, accessibility audit, DEI&B strategy review, equality impact assessment or a more detailed diagnostic. You don't need to arrive with all the answers. That's part of what the conversation is for. Not sure where to start? Ask about a free 30-minute Inclusion Discovery Call, subject to availability. It's an opportunity to explore your priorities and consider suitable next steps before committing to a larger piece of work.",
      },
      {
        question: "How do we know whether EDI consultancy is making a difference?",
        answer: "Progress should be assessed through evidence, not just enthusiasm… although enthusiasm certainly helps! Depending on your objectives, CEC can help you identify appropriate measures, such as staff feedback, recruitment and progression data, accessibility improvements, participation, policy implementation or progress against agreed actions. The right measures depend on the organisation and the change you are trying to achieve. It is also important to protect people's privacy, interpret data responsibly and listen to lived experience alongside numerical results. Some changes may be visible quickly; others require sustained effort and review. The aim is to understand what is improving, what remains difficult and what needs to happen next. Because the real test of inclusion isn't how many training sessions you've delivered. It's whether people experience a meaningful difference.",
      },
    ],
  },
]
