export function canShowModalOncePerDay(key = 'subscriptionModalLastShown') {
  const lastShown = localStorage.getItem(key)
  if (!lastShown) return true

  const lastDate = new Date(lastShown)
  const now = new Date()
  const diffMs = now - lastDate
  const hoursPassed = diffMs / (1000 * 60 * 60)

  return hoursPassed >= 24
}

export function saveModalShownTime(key = 'subscriptionModalLastShown') {
  localStorage.setItem(key, new Date().toISOString())
}
