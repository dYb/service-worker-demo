
window.fetch('/api/fastest')
  .then(res => res.text())
  .then(text => render('.xhr-1', text))

window.fetch('/api/network-first')
  .then(res => res.text())
  .then(text => render('.xhr-2', text))

window.fetch('/api/cache-first')
  .then(res => res.text())
  .then(text => render('.xhr-3', text))

const render = (selector, text) => {
  document.querySelector(selector).textContent = `请求内容：${text}`
}
