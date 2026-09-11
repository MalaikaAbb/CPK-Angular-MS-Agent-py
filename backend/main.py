# quickstart : connect the selected agent backend
from __future__ import annotations
import os
import uvicorn
from agent_framework import Agent, tool, SupportsChatGetResponse
from agent_framework.openai import OpenAIChatClient
from agent_framework.ag_ui import add_agent_framework_fastapi_endpoint
from agent_framework.ag_ui import AgentFrameworkAgent
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request, status
from typing import Annotated
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

class SearchItem(BaseModel):
    query: str
    done: bool

# shared state : state schema start
STATE_SCHEMA: dict[str, object] = {
    "language": {
        "type": "string",
        "enum": ["english", "spanish"],
        "description": "Preferred language.",
    }
}
PREDICT_STATE_CONFIG: dict[str, dict[str, str]] = {
    "language": {"tool": "update_language", "tool_argument": "language"}
}
# shared state : state schema end

# frontend tools : server tool getWeather start
@tool
def getWeather(
    location: Annotated[str, Field(description="The location to get weather for")],
) -> str:
    normalized = location.strip() or "the requested location"
    return f"The weather for {normalized} is 70 degrees."
# frontend tools : server tool getWeather end


# shared state : update language tool start
@tool
def update_language(
    language: Annotated[str, Field(description="Preferred language: 'english' or 'spanish'")],
) -> str:
    normalized = (language or "").strip().lower()
    if normalized not in ("english", "spanish"):
        return "Language unchanged. Use 'english' or 'spanish'."
    return f"Language updated to {normalized}."
# shared state : update language tool end


def _build_chat_client():
    if os.getenv("AZURE_OPENAI_ENDPOINT"):
        return OpenAIChatClient(
            model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-4o-mini"),
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        )
    if os.getenv("OPENAI_API_KEY"):
        return OpenAIChatClient(
            model=os.getenv("OPENAI_CHAT_MODEL_ID", "gpt-4o-mini"),
            api_key=os.getenv("OPENAI_API_KEY"),
        )
    raise RuntimeError(
        "Set either AZURE_OPENAI_ENDPOINT + AZURE_OPENAI_API_KEY, or OPENAI_API_KEY."
    )



# shared state : agent with state schema start
def create_agent(chat_client: SupportsChatGetResponse) -> AgentFrameworkAgent:
    base_agent = Agent(
        name="sample_agent",
        instructions="You are a helpful assistant.",
        client=chat_client,
        tools=[update_language, getWeather],   
    )
    return AgentFrameworkAgent(
        agent=base_agent,
        name="CopilotKitMicrosoftAgentFrameworkAgent",
        description="Assistant that tracks a simple language state.",
        state_schema=STATE_SCHEMA,               
        predict_state_config=PREDICT_STATE_CONFIG, 
        require_confirmation=False,
    )
# shared state : agent with state schema end
    

chat_client = _build_chat_client()

agent = create_agent(chat_client)

app = FastAPI(title="CopilotKit + Microsoft Agent Framework (Python)")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# quickstart : expose agent framework endpoint start
add_agent_framework_fastapi_endpoint(app=app, agent=agent, path="/")
# quickstart : expose agent framework endpoint end

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8200, reload=True)

