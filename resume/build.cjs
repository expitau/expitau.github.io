const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8124;

// Serve static files from ./src
app.use(express.static(path.join(__dirname, 'src')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

  buildResume()
});

async function buildResume() {
  // Launch Puppeteer in headless mode
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  console.log("Navigating to http://localhost:8124/index.html");
  // Navigate to the URL
  await page.goto('http://localhost:8124/index.html', {
    waitUntil: 'networkidle0' // Ensures the page is fully loaded
  });

  // Generate the PDF
  await page.pdf({
    path: 'build/resume-image.pdf', // Output file
    format: 'Letter', // Page format
    printBackground: true, // Include background graphics
    pageRanges: '1'
  });

  // Save page html
  const content = await page.content();
  const fs = require('fs');
  fs.writeFile('build/index.html', content, function (err) {
    if (err) throw err;
    console.log('HTML saved!');
  });

  // Close the browser
  await browser.close();

  console.log('PDF generated successfully!');
  process.exit();
}
