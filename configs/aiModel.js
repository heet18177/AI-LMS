const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);


// 2. Model for Course Outlines (JSON with Emojis)        
export const courseOutlineAIModel = genAI
  .getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: { responseMimeType: "application/json" },
  })
  .startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Generate a study material for ${topic} for ${courseType} and the level of difficulty will be ${difficultyLevel}, with a summary of the course, a list of chapters along with a summary for each chapter, and a topic list in each chapter, including appropriate emoji in the content. All results should be in JSON format." }],
      },
      {
        role: "model",
        parts: [{ 
          text: JSON.stringify({
            courseTitle: "🚀 Python Mastery: From Basics to Advanced 🐍",
            courseSummary: "Master Python programming with hands-on chapters and clear summaries. 🎓",
            difficulty: "Easy",
            chapters: [
              {
                chapterNumber: 1,
                chapterTitle: "Introduction to Python 🛠️",
                chapterSummary: "Learn how to set up your environment and write your first code.",
                topics: ["Installing Python 💻", "Print statements ⌨️", "Variables 📊"]
              }
            ]
          }) 
        }],
      }
    ],
  });

// 3. Model for Detailed Study Notes (HTML)
export const generateNotesAiModel = genAI
  .getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  })
  .startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Generate detailed study notes in HTML format. Do not use <html>, <head>, or <body> tags. Use <h2>, <h3>, <p>, and <ul> for structure." }],
      },
      {
        role: "model",
        parts: [{ 
          text: "<h2>Chapter Title 📖</h2><p>Overview of the topic...</p><h3>Key Points</h3><ul><li>Point 1 ✨</li><li>Point 2 🌟</li></ul>" 
        }],
      }
    ],
  });

// 4. Model for Flashcards
export const generateStudyTypeContentAiModel = genAI
  .getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: { responseMimeType: "application/json" },
  })
  .startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Generate the flashcard on topic: ${chapters} in JSON format with front back content, Maximum 15" }],
      },
      {
        role: "model",
        parts: [{ 
          text: JSON.stringify([
            {
              front: "What is a Variable? 📦",
              back: "A container for storing data values."
            },
            {
              front: "What is an Atom? ⚛️",
              back: "The basic unit of a chemical element."
            }
          ]) 
        }],
      }
    ],
  });

  //Model for quiz
  const GenerateQuizAiModel = genAI
  .getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: { responseMimeType: "application/json" },
  })
  .startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate quiz on topic :- Flutter fundamentels , User Interface(UI) Development , Basic Navigation with Question and Options along with correct answer in JSON format",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: JSON.stringify([
              {
                quizTitle: "Flutter Essentials Quiz",
                questions: [
                  {
                    id: 1,
                    topic: "Fundamentals",
                    question:
                      "Which programming language is used to develop Flutter applications?",
                    options: ["Java", "Kotlin", "Dart", "Swift"],
                    correctAnswer: "Dart",
                  },
                ],
              },
            ]),
          },
        ],
      },
    ],
  });

/**
 * Utility function to generate the initial course outline
 */
export async function generateOutline(prompt) {
  try {
    const response = await courseOutlineAIModel.sendMessage(prompt);
    return response.response.text();
  } catch (error) {
    console.error("Error generating outline:", error);
    throw error;
  }
}