import { saveAs } from "file-saver";
import { marked } from "marked";

export const exportToWord = (markdown, filename = "Tailored_Resume.docx") => {
  const html = marked.parse(markdown); // markdown → html
  const converted = window.htmlDocx.asBlob(html); // html → Word blob
  saveAs(converted, filename); // Download
};
