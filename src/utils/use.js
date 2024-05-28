export function slideToggle(e) {
  const { currentTarget } = e;

  const { nextSibling } = currentTarget;

  const { scrollHeight } = nextSibling;

  const { height } = nextSibling.style;

  if (!height) {
    nextSibling.style.height = `${scrollHeight}px`;

    nextSibling.ontransitionend = () => {
      nextSibling.style.height = 'auto';
    };
  } else {
    nextSibling.ontransitionend = null;

    nextSibling.style.height = `${scrollHeight}px`;

    setTimeout(() => {
      nextSibling.removeAttribute('style');
    });
  }
}
