import { HfInference } from "@huggingface/inference";
const generateText = async (question) => {
    const inference = new HfInference("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");
    const prompt = `Convert the following query :\nQuery: ${question}\n:`;
    let fullResponse = "";

    for await (const chunk of inference.chatCompletionStream({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
    })) {
        const content = chunk.choices[0]?.delta?.content || "";
        fullResponse += content;
    }
    return fullResponse.trim().split('/n');
};
export default generateText;