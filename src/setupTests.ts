// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9. See also: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/ react-i18next/.test(args[0])) {
      return;
    }
    // originalError.call(console, ...args)
  };
});

afterAll(() => {
  console.error = originalError;
  window.scrollTo = jest.fn();
});
