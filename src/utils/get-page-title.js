import defaultSettings from '@/settings'

const title = defaultSettings.title || 'AEP'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
