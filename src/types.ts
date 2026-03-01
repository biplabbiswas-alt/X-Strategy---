export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface PostType {
  title: string;
  description: string;
  focus: string;
  example: string;
}

export interface WeeklyStrategy {
  [key: string]: PostType;
}

export const STRATEGY: WeeklyStrategy = {
  Monday: {
    title: 'Algorithm & Growth',
    description: 'Focus on YouTube algorithm updates, growth hacks, and technical SEO.',
    focus: 'Educational & Authority',
    example: 'Why your CTR is dropping and how to fix it in 3 steps...'
  },
  Tuesday: {
    title: 'Case Studies & Proof',
    description: 'Share results from your own channels or clients. Show, don\'t just tell.',
    focus: 'Social Proof & Trust',
    example: 'How we took a dead channel from 0 to 10k subs in 60 days...'
  },
  Wednesday: {
    title: 'Tools & Workflow',
    description: 'Actionable tips on editing, scripting, or AI tools for creators.',
    focus: 'Utility & Value',
    example: 'My top 5 AI tools for YouTube scripting in 2024...'
  },
  Thursday: {
    title: 'Community & Engagement',
    description: 'Ask questions, run polls, or host a mini Q&A session.',
    focus: 'Interaction & Community',
    example: 'What\'s the biggest struggle you\'re facing with your YouTube channel right now?'
  },
  Friday: {
    title: 'Trends & News',
    description: 'Discuss latest YouTube news, platform changes, or trending niches.',
    focus: 'Timeliness & Relevance',
    example: 'YouTube just announced a new feature for Shorts. Here\'s what it means for you...'
  },
  Saturday: {
    title: 'Behind the Scenes',
    description: 'Personal stories, your workspace, or what you\'re learning.',
    focus: 'Relatability & Branding',
    example: 'The reality of being a content strategist: 80% data, 20% creative...'
  },
  Sunday: {
    title: 'Planning & Reflection',
    description: 'Summarize the week or help others plan their upcoming content.',
    focus: 'Reflection & Preparation',
    example: '3 things I learned this week about the creator economy...'
  }
};

export interface GeneratedTweet {
  content: string;
  type: string;
}

export interface ContentResponse {
  tweets: GeneratedTweet[];
  overallImagePrompt: string;
}
