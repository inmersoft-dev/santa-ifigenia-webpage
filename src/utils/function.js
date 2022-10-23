/**
 * Scroll to a target position, default the top of the page.
 * @param {number} [target=0] - The target position to scroll to.
 */
export const scrollTo = (target = 0) =>
  window.scroll({
    top: target,
    left: 0,
    behavior: "smooth",
  });
