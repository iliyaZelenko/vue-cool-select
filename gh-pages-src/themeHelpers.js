// текущая тема
export function getTheme () {
  return new URLSearchParams(window.location.search).get('theme') || 'bootstrap'
}

export function setTheme (theme) {
  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set('theme', theme)
  window.location.search = searchParams.toString()
}
