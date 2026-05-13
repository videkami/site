fetch('header.html')
  .then((r) => r.text())
  .then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;
    Array.from(doc.body.childNodes).forEach((node) => {
      if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
        const s = document.createElement('script');
        if (node.src) s.src = node.src;
        else s.textContent = node.textContent;
        placeholder.appendChild(s);
      } else {
        placeholder.appendChild(node.cloneNode(true));
      }
    });
  })
  .catch((err) => console.error('Header load failed:', err));
