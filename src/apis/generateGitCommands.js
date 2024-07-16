import { HfInference } from "@huggingface/inference";
const extractGitCommands = async (text) => {
    const inference = new HfInference("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");
    const prompt = `Extract only the git commands from the following text:\n${text}\nGit commands:`;
    let fullResponse = "";

    for await (const chunk of inference.chatCompletionStream({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
    })) {
        const content = chunk.choices[0]?.delta?.content || "";
        fullResponse += content;
    }
    return fullResponse.trim().split("\n");
};
export default extractGitCommands;