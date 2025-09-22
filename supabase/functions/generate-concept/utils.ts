export const craftRequestBody = (audience) => {
  let prompt = `Create a single marketing concept for the brand below. Make sure to also consider its audience demographics.
Return ONLY the JSON fields \`name\` and \`description\`.
Brand: 
- Description: ${audience.brand_description}
Audience:
- Interests: ${(audience.interests || []).join(", ")}`;

  if (audience.age_min) {
    prompt = prompt + `\n- Age min: ${audience.age_min}`;
  }

  if (audience.age_max) {
    prompt = prompt + `\n- Age max: ${audience.age_max}`;
  }

  if (audience.city) {
    prompt = prompt + `\n- City: ${audience.city}`;
  }

  if (audience.state) {
    prompt = prompt + `\n- State: ${audience.state}`;
  }

  if (audience.birth_sex) {
    prompt = prompt + `\n- Birth gender: ${audience.birth_sex}`;
  }

  if (audience.income) {
    prompt = prompt + `\n- Income: ${audience.income}`;
  }

  if (audience.conceptToRemix) {
    prompt =
      prompt +
      `\nBase yourself from this previously used concept:\n
- Name: ${audience.conceptToRemix.name}
- Description: ${audience.conceptToRemix.description}`;
  }

  return {
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content:
          "You are a creative marketing strategist, be mindful of your brand and its audience. Adjust language formality accordingly. No need to mention their age.",
      },
      { role: "user", content: prompt },
    ],
    text: {
      format: {
        name: "marketing_concept",
        type: "json_schema",
        schema: {
          type: "object",
          additionalProperties: false,
          required: ["name", "description"],
          properties: {
            name: {
              type: "string",
              minLength: 3,
              maxLength: 60,
              description: "Short, catchy concept name",
            },
            description: {
              type: "string",
              minLength: 30,
              description:
                "Description explaining the concept and why it's suited for this audience.",
            },
          },
        },
      },
    },
    temperature: 0.8,
  };
};
