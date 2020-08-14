import "@testing-library/jest-dom/extend-expect";
/* eslint-disable no-undef */

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});
