/**
 * Svelte action
 *
 * Dispatch event on click outside of node
 * */
export function onClickOutside(node: any) {
  const handleClick = (event) => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('clickoutside', node));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

/**
 * https://svelte.dev/repl/1c7c89b3a80c48708f0f07720fb37a53?version=3.55.1
 */
export function resizeTextarea(node) {
  let contentRect;
  let entryTarget;
  const ro = new ResizeObserver((entries, observer) => {
    for (const entry of entries) {
      contentRect = entry.contentRect;
      entryTarget = entry.target;
    }
    node.dispatchEvent(
      new CustomEvent('resize', {
        detail: { contentRect, entryTarget }
      })
    );
  });
  ro.observe(node);
  return {
    destroy() {
      ro.disconnect();
    }
  };
}
