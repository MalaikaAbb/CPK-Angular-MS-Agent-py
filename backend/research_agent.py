# SELF-DEFINED — not from the docs or the showcase.
#
# https://docs.copilotkit.ai/angular/ms-agent-python/ag-ui addresses an agent
# as "research-agent" but never defines one. This is the smallest Agent
# Framework agent that can answer to that runtime key, built the same way as
# `create_agent` in main.py. Its instructions are the showcase's research
# sub-agent prompt (`_RESEARCH_INSTRUCTIONS` in subagents_agent.py), reused so
# its replies are recognisably different from the default agent's.
from __future__ import annotations

from agent_framework import Agent, SupportsChatGetResponse
from agent_framework.ag_ui import AgentFrameworkAgent

from subagents_agent import _RESEARCH_INSTRUCTIONS


def create_research_agent(chat_client: SupportsChatGetResponse) -> AgentFrameworkAgent:
    base_agent = Agent(
        name="research_agent",
        instructions=_RESEARCH_INSTRUCTIONS,
        client=chat_client,
        tools=[],
    )
    return AgentFrameworkAgent(
        agent=base_agent,
        name="CopilotKitMSAgentResearchAgent",
        description="Research agent: answers a topic with 3-5 key facts.",
        require_confirmation=False,
    )
