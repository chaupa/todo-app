export const setLoading = (): void => {
  document.body.classList.add('loading')
  document.body.querySelectorAll('input').forEach((input) => {
    input.setAttribute('disabled', 'disabled')
  })
}

export const removeLoading = (): void => {
  document.body.classList.remove('loading')
  document.body.querySelectorAll('input').forEach((input) => {
    input.removeAttribute('disabled')
  })
  document.getElementById('addTask')?.focus()
}