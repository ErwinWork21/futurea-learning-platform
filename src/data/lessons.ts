export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Subject = 'Logical Programming' | 'Computational Thinking' | 'Python' | 'Web Development' | 'Game Development' | 'AI Engineer';

export interface LessonData {
  id: string;
  title: string;
  subject: Subject;
  difficulty: Difficulty;
  videoUrl?: string; // Optional URL for a tutorial video
  instructions: string;
  startingCode: string;
  hints: string[];
  correctOutput: string;
}

export const lessons: Record<string, LessonData> = {
  "python-lists-1": {
    id: "python-lists-1",
    title: "Intermediate Python: Modifying Lists",
    subject: "Python",
    difficulty: "Intermediate",
    videoUrl: "https://www.youtube.com/embed/placeholder", // Replace with real video later
    instructions: "You are building a shopping cart.\n\nCreate a list named 'cart' containing 'apple', 'banana', and 'milk'. The store ran out of apples, so change the first item in the list to 'orange'. Finally, print the updated list.",
    startingCode: 'cart = ["apple", "banana", "milk"]\n# Your code goes below this line\n',
    hints: [
      "Remember that Python lists use zero-based indexing. The very first item is always at index 0.",
      "To change an item in a list, select it by its index and assign a new string value. Example: my_list[0] = \"new_value\".",
      "Your code should look like this:\ncart[0] = \"orange\"\nprint(cart)"
    ],
    correctOutput: "['orange', 'banana', 'milk']"
  },
  "web-dev-html-1": {
    id: "web-dev-html-1",
    title: "Basic Web Development: Creating a Button",
    subject: "Web Development",
    difficulty: "Beginner",
    videoUrl: "https://www.youtube.com/embed/placeholder2",
    instructions: "Let's create a simple HTML button.\n\nWrite an HTML <button> tag that says 'Click Me!'.",
    startingCode: '<!-- Your HTML goes here -->\n',
    hints: [
      "HTML tags usually have an opening tag and a closing tag.",
      "The button tag looks like <button>Text</button>."
    ],
    correctOutput: "<button>Click Me!</button>"
  },
  "ai-engineer-1": {
    id: "ai-engineer-1",
    title: "Intro to AI: Basic Prompting",
    subject: "AI Engineer",
    difficulty: "Beginner",
    instructions: "Write a system prompt for an AI to act as a helpful math tutor.\n\nAssign the string to the variable `system_prompt`.",
    startingCode: 'system_prompt = ""\n# Write your prompt inside the quotes',
    hints: [
      "Think about the persona the AI should adopt.",
      "Example: 'You are a helpful math tutor...'"
    ],
    correctOutput: "You are a helpful math tutor" // Simplified check for example
  }
};
