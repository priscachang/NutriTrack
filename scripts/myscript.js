// Select the container for the plot
const container = d3.select("div#plot");

// Add introductory text with icons for each meat type
container
  .insert("h2", "#buttons")
  .html(`
    <span style="color: black;">What is Your Favorite Meat?</span>
    <img src="images/beef.jpg" alt="Beef Icon" style="width: 50px; height: 50px; margin-left: 10px;">
    <img src="images/chicken.jpg" alt="Chicken Icon" style="width: 60px; height: 72px; margin-left: 5px;">
    <img src="images/fish.jpg" alt="Fish Icon" style="width: 50px; height: 50px; margin-left: 5px;">
    <img src="images/pork.jpg" alt="Pork Icon" style="width: 50px; height: 50px; margin-left: 5px;">
    <br>
    <span style="font-size: 18px;">Select 2~3 types of meats to compare their nutrients!</span>
  `);

// Define button labels and initial state
const meatTypes = ["Beef", "Chicken", "Fish", "Processed_Pork"];
const selectedMeats = new Set(["Beef", "Chicken"]); // Default selected meats

// Map of combinations to images (replace with your actual images later)
const imageMap = {
  "Beef,Chicken": "images/bc.jpg",
  "Beef,Fish": "images/bf.jpg",
  "Beef,Processed_Pork": "images/bp.jpg",
  "Chicken,Fish": "images/cf.jpg",
  "Fish,Processed_Pork": "images/fp.jpg",
  "Chicken,Processed_Pork": "images/cp.jpg",
  "Beef,Fish,Processed_Pork": "images/bfp.jpg",
  "Chicken,Fish,Processed_Pork": "images/cfp.jpg",
  "Beef,Chicken,Processed_Pork": "images/bcp.jpg",
  "Beef,Chicken,Fish": "images/bcf.jpg",
};

// Create buttons
const buttonContainer = container.select("#buttons");

meatTypes.forEach((meat) => {
  buttonContainer
    .append("button")
    .attr("id", meat.replace(/[^a-zA-Z0-9]/g, "_")) // Replace spaces with underscores for ID
    .classed("selected", selectedMeats.has(meat))
    .text(meat)
    .on("click", function () {
      // Toggle selection
      if (selectedMeats.has(meat)) {
        selectedMeats.delete(meat);
        d3.select(this).classed("selected", false);
      } else {
        selectedMeats.add(meat);
        d3.select(this).classed("selected", true);
      }
      updateVisualization();
    });
});

// Function to update the visualization
function updateVisualization() {
  const messageContainer = container.select("#message");
  const imageContainer = container.select("#image-container");
  const explanationContainer = container.select("#explanation");

  // Clear existing content
  messageContainer.text("");
  imageContainer.html("");
  explanationContainer.html("");

  // Get selected meats as a sorted array
  const selectedArray = Array.from(selectedMeats).sort();

  if (selectedArray.length < 2 || selectedArray.length > 3) {
    // Display message if fewer than 2 or more than 3 meats are selected
    messageContainer.text("Please select 2~3 types of meats!");
  } else {
    // Find the corresponding image for the combination
    const combinationKey = selectedArray.join(",");
    const imagePath = imageMap[combinationKey] || "images/temp.jpg";

    // Display the image
    imageContainer
      .append("img")
      .attr("src", imagePath)
      .attr("alt", `Image for ${combinationKey}`);

    // Add explanation paragraph
    explanationContainer
      .append("p")
      .style("margin-top", "20px")
      .style("font-size", "14px")
      .text(
        "The Parallel Coordinate Plot visualizes multiple variables simultaneously, making it easier to compare nutritional attributes across different meat types. Each line represents a meat product, connecting values of variables such as protein, fat, and sodium. By following the lines, you can identify patterns, differences, or similarities among the meat types."
      );
  }
}

// Add an empty container for explanation
container.append("div").attr("id", "explanation");

// Initialize with the default selection
updateVisualization();
