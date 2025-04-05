const { OpenAI } = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate task recommendations
const generateTaskRecommendations = async (existingTasks, count = 3) => {
  try {
    // Format existing tasks for prompt
    const tasksStr = existingTasks
      .map(
        (task) =>
          `- ${task.title} (${task.status || "N/A"}, Priority: ${
            task.priority || "N/A"
          })`
      )
      .join("\n");

    const prompt = `Based on the following existing tasks:
${tasksStr}

Generate ${count} recommended new tasks that would complement these. Each task should have:
1. A title
2. A brief description
3. A suggested priority (low, medium, or high)

Format the response as JSON with an array of objects with title, description, and priority fields.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const responseContent =
      completion.choices[0]?.message?.content || '{"tasks":[]}';
    const responseJson = JSON.parse(responseContent);

    // Ensure we have an array of tasks
    const recommendedTasks = responseJson.tasks || [];

    return recommendedTasks.map((task) => ({
      title: task.title,
      description: task.description,
      priority: task.priority?.toLowerCase() || "medium",
      status: "pending",
    }));
  } catch (error) {
    console.error("Error generating task recommendations:", error);
    throw new Error("Failed to generate task recommendations");
  }
};

module.exports = {
  generateTaskRecommendations,
};
