import { it, expect, vi } from "vitest";
import { renderTitle } from "./dom.js";
import path from "path";
import fs from "fs";
import { JSDOM } from "jsdom";

// load the index.html file content
const htmlPath = path.join(__dirname, 'index.html');
const htmlContent = fs.readFileSync(htmlPath).toString();

// creating virtual dom
const dom = new JSDOM(htmlContent);

// get the document
const document = dom.window.document;

// stubbing the global document with the custom document
vi.stubGlobal('document', document);

it('should render the title', () => {
    renderTitle();

    const titleContainer = document.getElementById('title');
    console.log(titleContainer);
    const titlePara = titleContainer.firstElementChild;
    expect(titlePara.textContent).toBe('Testing the DOM with Vitest');
})