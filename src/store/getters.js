const getters = {
  language: state => state.settings.language,
  _localizer: state => state.localization._localizer,
  _parameter: state => state.settings._parameter,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.auth.token,
  tokenPayload: state => state.auth.tokenPayload,
  avatar: state => state.employee.avatar,
  me: state => state.employee.me,
  introduction: state => state.user.introduction,
  roles: state => state.employee.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
