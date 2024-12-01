const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const { degrees, PDFDocument, rgb, StandardFonts, PDFString, PDFName } = require('pdf-lib');
const fs = require('fs');
// Load yaml
const yaml = require('js-yaml');


const app = express();
const PORT = 8124;

// Serve static files from ./src
app.use(express.static(path.join(__dirname, 'src')));

app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  // If rebuild flag is set
  if (!process.argv.includes('--no-rebuild')) {
    console.log("Rebuilding PDFs...")
    await htmlToPdf('index', 'index', 'resume-image');
    await htmlToPdf('coverletter', 'coverletter', 'coverletter-image');
  }

  await modifyResume();
  await modifyCoverletter();

  // Move index.html and resume.pdf to ../public/resume
  fs.copyFileSync('build/index.html', '../public/resume/index.html');
  fs.copyFileSync('build/resume.pdf', '../public/resume/resume.pdf');

  process.exit()
});

async function htmlToPdf(file, outputHtml, outputPdf) {
  // Launch Puppeteer in headless mode
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  console.log(`Navigating to http://localhost:8124/${file}.html`);
  // Navigate to the URL
  await page.goto(`http://localhost:8124/${file}.html`, {
    waitUntil: 'networkidle0' // Ensures the page is fully loaded
  });

  // Generate the PDF
  await page.pdf({
    path: `build/${outputPdf}.pdf`, // Output file
    format: 'Letter', // Page format
    printBackground: true, // Include background graphics
    pageRanges: '1'
  });

  // Save page html
  const content = await page.content();
  const fs = require('fs');
  fs.writeFile(`build/${outputHtml}.html`, content, function (err) {
    if (err) throw err;
    console.log('HTML saved!');
  });

  // Close the browser
  await browser.close();

  console.log('PDF generated successfully!');
}


async function modifyResume() {
  console.log("Modifying resume...")
  const existingPdfBytes = fs.readFileSync('build/resume-image.pdf')
  const data = yaml.load(fs.readFileSync('src/data.yaml', 'utf8'));
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const page = pages[0]
  const allLinks = []
  const textOpacity = 0

  const createLink = (uri, rect) => {
      let link = page.doc.context.register(
          page.doc.context.obj({
              Type: 'Annot',
              Subtype: 'Link',
              Rect: rect,
              Border: [0, 0, 0],
              C: [0, 0, 1],
              A: {
                  Type: 'Action',
                  S: 'URI',
                  URI: PDFString.of(uri),
              },
          }),
      );
      allLinks.push(link);

      page.node.set(PDFName.of('Annots'), pdfDoc.context.obj(allLinks));
  }

  const { width, height } = page.getSize()
  page.drawText("# " + data.header.name, {
      x: -3,
      y: height - 55,
      size: 35,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  page.drawText(data.header.description, {
      x: 26,
      y: height - 73,
      size: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })
  createLink('mailto:expitau@gmail.com', [width - 200, height - 35, width - 100, height - 50]);
  createLink('https://github.com/expitau', [width - 232, height - 51, width - 175, height - 66]);
  createLink('https://www.linkedin.com/in/nathan-dsilva/', [width - 175, height - 51, width - 95, height - 66]);
  createLink('https://expitau.com', [width - 94, height - 51, width - 20, height - 66]);

  page.drawText('Email: ', {
      x: width - 190,
      y: height - 42,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })
  page.drawText(data.header.email, {
      x: width - 186,
      y: height - 46,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })
  page.drawText('\nLocation: ', {
      x: width - 90,
      y: height - 42,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })
  page.drawText(data.header.address, {
      x: width - 80,
      y: height - 46,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  page.drawText('Github: ', {
      x: width - 225,
      y: height - 57,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })

  page.drawText(data.header.github, {
      x: width - 212,
      y: height - 61,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })
  page.drawText('LinkedIn: ', {
      x: width - 170,
      y: height - 57,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })

  page.drawText(data.header.linkedin, {
      x: width - 157,
      y: height - 61,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })
  page.drawText('Website: ', {
      x: width - 90,
      y: height - 57,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })

  page.drawText(data.header.website, {
      x: width - 77,
      y: height - 61,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  page.drawText('## Work Experience', {
      x: 9,
      y: height - 131,
      size: 13,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  let offsets = [0, 74, 119, 192, 212]
  for (i in data.experience) {
      let job = data.experience[i]
      let currentOffset = offsets.shift()
      page.drawText((1 + Number(i)) + ". **" + job.title + "** @ " + job.company, {
          x: 11,
          y: height - 155 - currentOffset,
          size: 9,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity
      })
      page.drawText(job.dates, {
          x: width - 115,
          y: height - 155 - currentOffset,
          size: 9,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity
      })
      job.responsibilities && page.drawText("\t- " + (job.responsibilities || []).join("\n\t- "), {
          x: 19,
          y: height - 169 - currentOffset,
          size: 8.8,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity,
          maxWidth: 575,
          lineHeight: 13.5
      })
  }

  let PERSONAL_PROJECTS_START = 397
  page.drawText('## Personal Projects', {
      x: 9,
      y: height - PERSONAL_PROJECTS_START,
      size: 13,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  offsets = [0, 57]
  for (i in data.projects[0]) {
      let project = data.projects[0][i]
      let currentOffset = offsets.shift()
      page.drawText((1 + Number(i)) + ". **" + project.name + "**", {
          x: 11,
          y: height - PERSONAL_PROJECTS_START - 23 - currentOffset,
          size: 9,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity
      })
      page.drawText(project.genre, {
          x: 26,
          y: height - PERSONAL_PROJECTS_START - 33 - currentOffset,
          size: 9,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity
      })
      page.drawText(project.tech.join(', '), {
          x: width - 145,
          y: height - PERSONAL_PROJECTS_START - 33 - currentOffset,
          size: 9,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity
      })
      page.drawText(project.description, {
          x: 26,
          y: height - PERSONAL_PROJECTS_START - 46 - currentOffset,
          size: 9,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity,
          maxWidth: 575,
          lineHeight: 12.5
      })
  }

  let SKILLS_START = 554
  page.drawText('## Skills', {
      x: 9,
      y: height - SKILLS_START,
      size: 13,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  page.drawText('**Frontend & Web Development** - ' + data.skills_summary.frontend.join(', '), {
      x: 13,
      y: height - SKILLS_START - 25,
      size: 9.1,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
      maxWidth: 575,
      lineHeight: 12.5
  })

  page.drawText('**Programming Languages** - ' + data.skills_summary.languages.join(', '), {
      x: 18,
      y: height - SKILLS_START - 37,
      size: 9.1,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
      maxWidth: 575,
      lineHeight: 12.5
  })

  page.drawText('**Infrastructure & Tools** - ' + data.skills_summary.tools.join(', '), {
      x: 18,
      y: height - SKILLS_START - 50,
      size: 9.1,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
      maxWidth: 575,
      lineHeight: 12.5
  })

  page.drawText('**Soft Skills** - ' + data.skills_summary.soft.join(', '), {
      x: 18,
      y: height - SKILLS_START - 64,
      size: 9.1,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
      maxWidth: 575,
      lineHeight: 12.5
  })

  let EDUCATION_START = 647
  page.drawText('## Education', {
      x: 9,
      y: height - EDUCATION_START,
      size: 13,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  offsets = [0, 33]
  for (i in data.education) {
      let edu = data.education[i]
      let currentOffset = offsets.shift()
      page.drawText((1 + Number(i)) + ". **" + edu.name + "** " + edu.dates, {
          x: 11,
          y: height - EDUCATION_START - 25 - currentOffset,
          size: 9,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity
      })
      page.drawText(edu.description, {
          x: 27,
          y: height - EDUCATION_START - 37 - currentOffset,
          size: 8.8,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          opacity: textOpacity
      })
  }

  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync('build/resume.pdf', pdfBytes)
}


async function modifyCoverletter() {
  console.log("Modifying cover letter...")
  const existingPdfBytes = fs.readFileSync('build/coverletter-image.pdf')
  const data = yaml.load(fs.readFileSync('src/data.yaml', 'utf8'));
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const page = pages[0]
  const allLinks = []
  const textOpacity = 0

  const createLink = (uri, rect) => {
      let link = page.doc.context.register(
          page.doc.context.obj({
              Type: 'Annot',
              Subtype: 'Link',
              Rect: rect,
              Border: [0, 0, 0],
              C: [0, 0, 1],
              A: {
                  Type: 'Action',
                  S: 'URI',
                  URI: PDFString.of(uri),
              },
          }),
      );
      allLinks.push(link);

      page.node.set(PDFName.of('Annots'), pdfDoc.context.obj(allLinks));
  }

  const { width, height } = page.getSize()
  page.drawText("# " + data.header.name, {
      x: -3,
      y: height - 55,
      size: 35,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  page.drawText(data.header.description, {
      x: 26,
      y: height - 73,
      size: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })
  createLink('mailto:expitau@gmail.com', [width - 200, height - 35, width - 100, height - 50]);
  createLink('https://github.com/expitau', [width - 232, height - 51, width - 175, height - 66]);
  createLink('https://www.linkedin.com/in/nathan-dsilva/', [width - 175, height - 51, width - 95, height - 66]);
  createLink('https://expitau.com', [width - 94, height - 51, width - 20, height - 66]);

  page.drawText('Email: ', {
      x: width - 190,
      y: height - 42,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })
  page.drawText(data.header.email, {
      x: width - 186,
      y: height - 46,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })
  page.drawText('\nLocation: ', {
      x: width - 90,
      y: height - 42,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })
  page.drawText(data.header.address, {
      x: width - 80,
      y: height - 46,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  page.drawText('Github: ', {
      x: width - 225,
      y: height - 57,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })

  page.drawText(data.header.github, {
      x: width - 212,
      y: height - 61,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })
  page.drawText('LinkedIn: ', {
      x: width - 170,
      y: height - 57,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })

  page.drawText(data.header.linkedin, {
      x: width - 157,
      y: height - 61,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })
  page.drawText('Website: ', {
      x: width - 90,
      y: height - 57,
      size: 2,
      lineHeight: 2,
      maxWidth: 11,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity,
  })

  page.drawText(data.header.website, {
      x: width - 77,
      y: height - 61,
      size: 9.5,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  page.drawText('---', {
      x: 20,
      y: height - 101,
      size: 6,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  let letter = data.coverletter[0].replaceAll("\n", "\n ").replace("high-level", "high- level").replace("top-talented", "top- talented").replace('different', '\ndifferent')
  page.drawText(letter, {
      x: 78,
      y: height - 123,
      size: 8.73,
      font: helveticaFont,
      maxWidth: 457,
      lineHeight: 13.1,
      color: rgb(0.95, 0.1, 0.1),
      opacity: textOpacity
  })

  const pdfBytes = await pdfDoc.save()
  fs.writeFileSync('build/coverletter.pdf', pdfBytes)
}
