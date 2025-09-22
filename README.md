# RYA Lite

Lite version of an app that helps you turn **audience vibes → marketing concepts** fast.

https://rya-lite.vercel.app/

## What you can do
- Create an audience
- Generate a marketing concept **based on the audience** using an LLM
- Save and view generated concepts
- Remix a concept to create a new variation

## Key assumptions
- The app includes authentication so users can save their own audiences and concepts
- The app must use the same stack as the live product: **Supabase**, **Next.js**, **Vercel**
- The app must use a styling library for development speed.
- The app must allow users to create audiences with relevant demographic variables.
- Demographic variables chosen:
  - Age
  - State
  - City
  - Birth sex
  - Income
  - Interests
- The app must also allow users to provide a description of their brand; this helps the LLM generate a more relevant concept.

## How I approached it
1. Started off Next.js Supabase template: 
```bash
  npx create-next-app@latest rya-lite -e with-supabase
```
2. Adjusted Tailwind theming to match [RYA's](https://www.askrya.com/) color pallete
3. Crafted a simple yet meaningful homepage
4. Built the audience form and list
5. Built the audience detail page, which allows users to create new concepts or remix existing ones
6. Made sure the whole app has a pleasant UI/UX
7. Integrated everything with Supabase and deployed the app to Vercel

## If I had a bit more time
1. Write automated tests 
2. Separate Brand into its own entity (Brand → Audiences → Concepts)
