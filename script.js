document.querySelectorAll('.dark-mode-switch').forEach(item => {
  item.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
  })
})