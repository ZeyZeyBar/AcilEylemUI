import request from '@/utils/request'

const relativeUrl = 'workOrders'

export function add(workOrderCreateDto) {
  return request({
    url: relativeUrl,
    method: 'post',
    data: workOrderCreateDto
  })
}

export function update(workOrderUpdateDto) {
  return request({
    url: relativeUrl,
    method: 'put',
    data: workOrderUpdateDto
  })
}

export function remove(ieno) {
  return request({
    url: `${relativeUrl}/${ieno}`,
    method: 'delete'
  })
}

export function getAll() {
  return request({
    url: relativeUrl,
    method: 'get'
  })
}

export function get(ieno) {
  return request({
    url: `${relativeUrl}/${ieno}`,
    method: 'get'
  })
}

export function assignToEmployees(workOrderAssignToEmployeeList) {
  return request({
    url: `${relativeUrl}/assignToEmployees/`,
    method: 'put',
    data: workOrderAssignToEmployeeList
  })
}

export function assignToEmployeesByDivideByWorkCount(workOrderAssignDto) {
  return request({
    url: `${relativeUrl}/assignToEmployeesByDivideByWorkCount/`,
    method: 'put',
    data: workOrderAssignDto
  })
}

export function assignToEmployeesByDivideByBuildingCount(workOrderAssignDto) {
  return request({
    url: `${relativeUrl}/assignToEmployeesByDivideByBuildingCount/`,
    method: 'put',
    data: workOrderAssignDto
  })
}

export function cancel(workOrderIds) {
  return request({
    url: `${relativeUrl}/cancel/`,
    method: 'put',
    data: workOrderIds
  })
}

export function finalize(workOrderFinalizeCreateDto) {
  return request({
    url: `${relativeUrl}/finalize/`,
    method: 'post',
    data: workOrderFinalizeCreateDto
  })
}

export function endTheDay() {
  return request({
    url: `${relativeUrl}/endTheDay/`,
    method: 'get'
  })
}

export function getAllByFilter(workOrderFilterDto, pageNumber, pageSize) {
  return request({
    url: `${relativeUrl}/getAllByFilter/`,
    method: 'post',
    data: workOrderFilterDto,
    params: {
      pageNumber,
      pageSize
    }
  })
}

export function getAllSortedsByBookAndServiceBoxByFilter(workOrderSortedByBookAndServiceBoxFilterDto) {
  return request({
    url: `${relativeUrl}/getAllSortedsByBookAndServiceBoxByFilter/`,
    method: 'post',
    data: workOrderSortedByBookAndServiceBoxFilterDto
  })
}

export function getAllAssignablesByFilter(workOrderFilterDto) {
  return request({
    url: `${relativeUrl}/getAllAssignablesByFilter/`,
    method: 'post',
    data: workOrderFilterDto
  })
}

export function getAllLeakageAssignablesByFilter(workOrderFilterDto) {
  return request({
    url: `${relativeUrl}/getAllLeakageAssignablesByFilter/`,
    method: 'post',
    data: workOrderFilterDto
  })
}

export function getAllAssignedsByFilter(workOrderFilterDto) {
  return request({
    url: `${relativeUrl}/getAllAssignedsByFilter/`,
    method: 'post',
    data: workOrderFilterDto
  })
}

export function getAllLeakageAssignedsByFilter(workOrderFilterDto) {
  return request({
    url: `${relativeUrl}/getAllLeakageAssignedsByFilter/`,
    method: 'post',
    data: workOrderFilterDto
  })
}

export function getAllGasOpeningsByFilter(workOrderFilterDto, pageNumber, pageSize) {
  return request({
    url: `${relativeUrl}/getAllGasOpeningsByFilter/`,
    method: 'post',
    data: workOrderFilterDto,
    params: {
      pageNumber,
      pageSize
    }
  })
}

export function getAllGasCuttingsByFilter(workOrderFilterDto, pageNumber, pageSize) {
  return request({
    url: `${relativeUrl}/getAllGasCuttingsByFilter/`,
    method: 'post',
    data: workOrderFilterDto,
    params: {
      pageNumber,
      pageSize
    }
  })
}

export function getAllLeakagesByFilter(workOrderFilterDto, pageNumber, pageSize) {
  return request({
    url: `${relativeUrl}/getAllLeakagesByFilter/`,
    method: 'post',
    data: workOrderFilterDto,
    params: {
      pageNumber,
      pageSize
    }
  })
}

export function getAllInstallationChecksByFilter(workOrderFilterDto, pageNumber, pageSize) {
  return request({
    url: `${relativeUrl}/getAllInstallationChecksByFilter/`,
    method: 'post',
    data: workOrderFilterDto,
    params: {
      pageNumber,
      pageSize
    }
  })
}

export function getWithDetails(ieno) {
  return request({
    url: `${relativeUrl}/getWithDetails/${ieno}`,
    method: 'get'
  })
}

export function getAllReportsByFilter(workOrderReportFilterDto) {
  return request({
    url: `${relativeUrl}/getAllReportsByFilter/`,
    method: 'post',
    data: workOrderReportFilterDto
  })
}

export function getAllEmployeeReportsByFilter(workOrderEmployeeReportFilterDto) {
  return request({
    url: `${relativeUrl}/getAllEmployeeReportsByFilter/`,
    method: 'post',
    data: workOrderEmployeeReportFilterDto
  })
}

export function getAllGasOpeningEmployeeReports() {
  return request({
    url: `${relativeUrl}/getAllGasOpeningEmployeeReports/`,
    method: 'get'
  })
}

export function getAllGasCuttingEmployeeReports() {
  return request({
    url: `${relativeUrl}/getAllGasCuttingEmployeeReports/`,
    method: 'get'
  })
}

export function getAllStatusesByIds(workOrderIds) {
  return request({
    url: `${relativeUrl}/getAllStatusesByIds/`,
    method: 'post',
    data: workOrderIds
  })
}

export function getAllAssignedsToMeGeneralReportByDateFilter(workOrderDateFilterDto) {
  return request({
    url: `${relativeUrl}/getAllAssignedsToMeGeneralReportByDateFilter/`,
    method: 'post',
    data: workOrderDateFilterDto
  })
}

export function getDashboardReport() {
  return request({
    url: `${relativeUrl}/getDashboardReport/`,
    method: 'get'
  })
}

export function getAllActivesGroupByTypeReport() {
  return request({
    url: `${relativeUrl}/getAllActivesGroupByTypeReport/`,
    method: 'get'
  })
}

export function getAllActivesGroupByTypeAndDayInThisWeekReport() {
  return request({
    url: `${relativeUrl}/getAllActivesGroupByTypeAndDayInThisWeekReport/`,
    method: 'get'
  })
}

export function getAllCompletedsGroupByRegionAndDayInThisWeekReport() {
  return request({
    url: `${relativeUrl}/getAllCompletedsGroupByRegionAndDayInThisWeekReport/`,
    method: 'get'
  })
}

export function getAllActivesGroupByRegionReport() {
  return request({
    url: `${relativeUrl}/getAllActivesGroupByRegionReport/`,
    method: 'get'
  })
}

export function getAllCompletedsGroupByTypeAndCauseReport() {
  return request({
    url: `${relativeUrl}/getAllCompletedsGroupByTypeAndCauseReport/`,
    method: 'get'
  })
}

export function getAllAssignedsToMeGroupByTypeDescriptionReportByDateFilter(workOrderDateFilterDto) {
  return request({
    url: `${relativeUrl}/getAllAssignedsToMeGroupByTypeDescriptionReportByDateFilter/`,
    method: 'post',
    data: workOrderDateFilterDto
  })
}

export function getAllAssignedsToMeByMyRegionAndEmployeeTypeByStatusFilterByDate(workOrderStatusFilterByDateDto) {
  return request({
    url: `${relativeUrl}/getAllAssignedsToMeByMyRegionAndEmployeeTypeByStatusFilterByDate/`,
    method: 'post',
    data: workOrderStatusFilterByDateDto
  })
}

export function getAllPicturesById(workOrderId) {
  return request({
    url: `${relativeUrl}/getAllPicturesById/${workOrderId}`,
    method: 'get'
  })
}
