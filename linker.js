document
  .getElementById("url-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the user input URL from the input field
    const inputUrl = document.getElementById("input-url").value;
    console.log(inputUrl);

    // Set your Google Safe Browsing API key and endpoint
    const apiKey = "AIzaSyB1HVgDfQjWfAnYXzgC25c16764TkUlW3s"; // Replace with your actual API key
    const apiEndpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

    // Construct the request payload for the API
    const requestBody = {
      client: {
        clientId: "YourClientId",
        clientVersion: "1.5.2",
      },
      threatInfo: {
        threatTypes: [
          "MALWARE",
          "SOCIAL_ENGINEERING",
          "POTENTIALLY_HARMFUL_APPLICATION",
          "UNWANTED_SOFTWARE",
        ],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url: inputUrl }],
      },
    };

    try {
      // Send a POST request to the Google Safe Browsing API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is not successful
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // Parse the response data as JSON
      const data = await response.json();
      console.log(data);

      // Display the analysis result in the results div
      const resultDiv = document.getElementById("results");

      // Check if the API found any matches (potential threats)
      if (data.matches && data.matches.length > 0) {
        resultDiv.innerHTML = "<p>Bad link: This URL might be unsafe.</p>";
      } else {
        resultDiv.innerHTML = "<p>Good link: This URL seems safe.</p>";
      }
    } catch (error) {
      // Display an error message if an error occurs
      console.error("Error while fetching data:", error);

      const resultDiv = document.getElementById("results");
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });
