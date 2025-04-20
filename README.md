# Project Template
Scaffold for vibe-coding projects with [Cline](https://cline.bot/)

After cloning, `mv cline_template $NEW_PROJECT_NAME` && `rm -rfv .git` to create a new name and delete the git history for the project.

Then, edit [docs/memory-bank/projectbrief.md](docs/memory-bank/projectbrief.md) to taste and run `initialize memory bank` from Cline cli within vscode.

## Environment Variables

The project requires the following environment variables to be set in a `.env` file:

- `PRODUCTS_TO_FIND`: A comma-separated list of hardware products to track (e.g., `nvidia rtx 5070ti,nvidia rtx 5080`).
- `DISCORD_WEBHOOK`: The Discord webhook URI for sending stock alerts.
