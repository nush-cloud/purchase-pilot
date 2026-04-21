# Testing Notes
- verify that typed messages appear immediately in the conversation UI
- verify that laptop-related prompts switch recommendation cards from shoes to laptops
- verify that shoe-related prompts switch recommendations back to running shoes
- connected the homepage chat UI to the real backend route so Claude responses could drive the recommendation flow
- verify that the assistant remembers earlier details like budget, platform, and product type across multiple turns
- verify that recommendation cards remain visually consistent even when Claude returns slightly uneven product data
- verify that clicking Save on a recommendation makes it appear on the Saved page
- verify that the Compare page reflects the latest Claude-generated recommendation set from the homepage
- verify that clicking Save on a recommendation makes it appear on the Saved page
- verify that the Compare page reflects the latest Claude-generated recommendation set from the homepage
- verify that removing a saved product updates the Saved page immediately without a manual refresh
- verify that the page scrolls to the recommendation section automatically after the assistant response completes
- verify that clicking New Search resets the homepage conversation and clears current recommendation state
- verify that clicking Compare on a product adds only that product to the Compare page
- verify that Clear Compare resets the Compare page immediately
## What to Test
- Can users understand the app quickly?
- Are follow-up questions clear?
- Are product recommendations easy to scan?
- Is compare useful?
- Is save useful?


## Testing Template
### Tester
### Task
### What happened
### Confusions
### What worked
### What I changed after testing