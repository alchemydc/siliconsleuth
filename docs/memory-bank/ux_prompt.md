A responsive grid component displaying a list of tracked hardware products. Each item in the grid should clearly indicate the product name and its current monitoring status using an icon on the right side with a hover-over tooltip.

**Layout:** Use a responsive grid layout. On larger screens (desktop), display items in a multi-column grid (e.g., 3 or 4 columns, adjust as needed for visual balance). On tablet screens, transition to a 2-column grid. On mobile screens, display items in a single vertical column, ensuring each item takes up the full width. Maintain consistent and clean spacing between grid items.

**Styling:** Apply a modern and minimalist aesthetic. Use a clean, sans-serif font for all text. Employ a light background with dark text for readability (inheriting Tailwind's default light mode). Ensure a smooth transition to dark mode based on the user's system preference using Tailwind's dark mode utilities. Each grid item should have subtle padding. The product name should be clearly legible.

**Status Indicators:** On the right of each tracked hardware item, display an icon representing the monitoring status:
- **Monitoring:** Use the `eye` icon from lucide-react. Color it a neutral gray (`text-gray-500`). Add a hover-over tooltip that reads "Monitoring."
- **Stock Found:** Use the `smile` icon from lucide-react. Color it green (`text-green-500`). Add a hover-over tooltip that reads "Stock Found!"
- **Error:** Use the `alert-triangle` icon from lucide-react. Color it red (`text-red-500`). Add a hover-over tooltip that reads "Error in Monitoring."

**Responsiveness:** Ensure the grid adapts fluidly to different screen sizes as described in the Layout section. The icons should remain clearly visible across all screen sizes.

**Interactions:** The status icons should display their tooltip on hover (desktop) or tap (mobile). When the monitoring status of an item changes, implement a subtle fade-in/fade-out animation for the status icon to visually indicate the update.

**Components:** Utilize `shadcn/ui` for any necessary container elements (like `div` with appropriate Tailwind classes for the grid). Ensure proper semantic HTML structure.

**Output:** A single, responsive React component file using TypeScript.

