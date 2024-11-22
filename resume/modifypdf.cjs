const { degrees, PDFDocument, rgb, StandardFonts, PDFString, PDFName } = require('pdf-lib');
const fs = require('fs');
// Load yaml
const yaml = require('js-yaml');

async function modifyPdf() {
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
    page.drawText(data.header.name, {
        x: 25,
        y: height - 55,
        size: 35,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        opacity: textOpacity
    })

    page.drawText(data.header.description, {
        x: 26,
        y: height - 70,
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
        console.log(job)
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

modifyPdf()
