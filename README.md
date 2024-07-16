# BOT AI Platform
## Features
- The user can ask question to BOT AI regrading GitHub, It will generate list of commands. 
- User can save the chat and navigate to new chat.
- Converstaion will be stored in local storage.
- Can maintain multiple chats.
- Can navigate through chats and can delete the chats

## Technologies Used

- React
- Context API
- Converse with Hugging Face LLM
- used "meta-llama/Meta-Llama-3-8B-Instruct" to interact

### Challenges Faced

- UI Design: Initially designed the user interface, which took some time to structure properly.
- As I am new to LLM and NLP concepts, I started learning about them to understand how to implement these technologies.
- Discovered various LLM and NLP APIs.
- I Choose OpenAI as the first API to implement, following the OpenAI Quickstart Guide i.e. https://platform.openai.com/docs/quickstart.
- Implemented a backend to make requests to OpenAI and retrieve responses. but I faced many issues, then I fixed. After all its thowing error with rate limits and exceeded limits, so decided to explore other options.
- Then I found Hugging Face API with many available models but was confused about which model to use.
- Tested multiple models; the first five showed errors due to large data.
- Successfully used the meta-llama/Meta-Llama-3-8B-Instruct model to get text-based responses. but I want only commands to display and do some actions.
- Needed responses as commands, so adjusted the model to retrieve only commands.

- VSCode Integration:
    - Faced challenges inserting the generated commands into the integrated terminal of the VSCode window.
    - Reviewed the Visual Studio Code documentation and started implementing an extension, but it did not work as expected. So I searched for additional resources to connect the application to VSCode. due to time constraints, had to stop implementing this part.

### Learnings

- Gained knowledge about LLM and NLP, how they work, and how they are trained.
- Learned about different APIs and their usage.
- Understood the complexity of integrating generated commands into an IDE like VSCode.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   - git clone https://github.com/GowthamAkula89/bot-ai
2. Navigate to the project directory:
    #### Frontend
    - cd bot-ai
3. Install dependencies:
    - npm install
### Running the Application
- Start the development server:
    - npm start
    - Open http://localhost:3000 in your web browser to view the application.


### Live web URL
- Fronted: https://bot-ai-ag.vercel.app/