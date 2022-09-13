import { sanitize } from "./sanitize";

describe("sanitize", () => {
  it("should sanitize the string input to HTML output", () => {
    let res = sanitize("foo");
    expect(res.__html).toEqual("foo");
    res = sanitize('<a href="https://example.org">Example.org</a>');
    expect(res.__html).toEqual('<a href="https://example.org">Example.org</a>');
  });
  it("should not sanitize not allowed tags", () => {
    let res = sanitize(
      'Before <iframe src="https://example.org"></iframe> After'
    );
    expect(res.__html).toEqual("Before  After");
  });
  it("should accept options for rendering", () => {
    let res = sanitize(
      '<a href="https://example.org" target="_blank">Example.org</a>',
      { allowedAttributes: { a: ["href"] } }
    );
    expect(res.__html).toEqual('<a href="https://example.org">Example.org</a>');
  });
});
