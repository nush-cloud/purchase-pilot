# Case Study Draft

## Overview
Purchase Pilot is a conversational AI shopping assistant that helps users discover products through guided recommendations.

## Problem
Online shopping creates decision fatigue because users must compare too many options manually.

## Goal
Reduce shopping friction through a guided AI-powered experience.

## Process
- Defined problem
- Set up repo and documentation
- Built UI
- Integrated AI
- Tested with users
- Iterated based on feedback


- created the initial landing page, navbar, and placeholder compare/saved pages
- built a static chat interface with mock conversation data before integrating the AI backend
- created reusable recommendation cards using mock product data to validate the shopping results experience before backend integration
- built a side-by-side comparison page to reduce decision fatigue and make recommendation tradeoffs easier to scan
- built a saved-products page to support shortlist behavior and make the shopping flow feel more complete
- made the chat input interactive so users could add new messages locally before connecting the real AI backend
- connected the chat interface to local recommendation logic so user input could drive different result sets before real AI integration
- connected the homepage chat UI to the real backend route so Claude responses could drive the recommendation flow
- improved the AI flow by sending full chat history to the backend so Claude could remember earlier user constraints
- improved backend response quality by normalizing Claude-generated recommendation data before rendering it in product cards
- connected Claude-generated homepage recommendations to the Compare and Saved pages so the app behaved like one continuous shopping flow
- connected Claude-generated homepage recommendations to the Compare and Saved pages so the app behaved like one continuous shopping flow
- improved the saved-products experience by making shortlist updates reflect immediately in the UI
- improved homepage usability by auto-scrolling users to recommendation results after each response
- improved usability by adding a reset action so users could start a fresh shopping flow without reloading the page
- improved the decision flow by letting users explicitly choose which Claude-generated products to compare instead of always comparing the full result set
- verify that the navbar updates saved-count and compare-count badges automatically when products are added or removed
- improved product-card clarity by surfacing saved and compare status directly inside recommendation cards
## Outcome
To be completed during development and testing.

## Reflection
To be completed at the end of the project.