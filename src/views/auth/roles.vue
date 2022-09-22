<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Roller</span>
        </div>
        <el-form :model="roleUpdateDto" :rules="roleUpdateDtoRules">
          <el-table
            ref="roleTable"
            v-loading="allRolesLoading"
            :data="allRoles"
            row-class-name="clickable-table-row"
            style="width: 100%;"
            border
            fit
            highlight-current-row
            @expand-change="selectRoleForWorkOrderTypes"
            @current-change="selectRole"
          >
            <el-table-column type="expand">
              <template slot-scope="{row}">
                <el-alert
                  title="İş Emri Tipleri"
                  type="success"
                  :closable="false"
                  show-icon
                  style="width: fit-content;"
                >
                  <span style="margin-top: 9px; display: block;">{{ row.name }} rolünün işlem yapabileceği iş emri tiplerini seçiniz..</span>
                  <el-checkbox-button
                    v-for="changedRoleWorkOrderType in changedAllRoleWorkOrderTypesByRoleId"
                    :key="changedRoleWorkOrderType.workOrderTypeCode"
                    v-model="changedRoleWorkOrderType.isActive"
                    :label="changedRoleWorkOrderType.workOrderTypeCode"
                    :title="allWorkOrderTypes.find(workOrderType => workOrderType.workOrderTypeCode === changedRoleWorkOrderType.workOrderTypeCode).description"
                    class="el-checkbox-button--mini"
                    style="margin-top: 9px;"
                  />
                  <el-button
                    :loading="changedAllRoleWorkOrderTypesByRoleIdLoading"
                    type="success"
                    style="margin-top: 9px; display: block;"
                    size="mini"
                    @click="saveChangesRoleWorkOrderTypes"
                  >
                    Değişiklikleri Kaydet
                  </el-button>
                </el-alert>
              </template>
            </el-table-column>
            <el-table-column label="ID" prop="id" align="center" width="130">
              <template slot-scope="{row}">
                <span>{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Rol Adı" prop="name" align="center">
              <template slot-scope="{row}">
                <span v-if="updatableRoleId !== row.id">{{ row.name }}</span>
                <el-form-item v-else prop="name">
                  <el-input v-model="roleUpdateDto.name" :placeholder="row.name" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="Rol Açıklaması" prop="description" align="center">
              <template slot-scope="{row}">
                <span v-if="updatableRoleId !== row.id">{{ row.description }}</span>
                <el-form-item v-else prop="description">
                  <el-input v-model="roleUpdateDto.description" :placeholder="row.description" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="Güncelle" align="center" width="90">
              <template slot-scope="{row}">
                <el-button v-if="updatableRoleId !== row.id" type="success" size="mini" @click="setUpdatableRoleId(row.id)">
                  <i class="el-icon-edit" />
                </el-button>
                <el-form-item v-else prop="">
                  <el-row>
                    <el-button type="success" size="mini" @click="updateRole">
                      <i class="el-icon-check" />
                    </el-button>
                  </el-row>
                  <el-row>
                    <el-button type="danger" size="mini" @click="clearRoleUpdateInputs">
                      <i class="el-icon-close" />
                    </el-button>
                  </el-row>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="Sil" align="center" width="80">
              <template slot-scope="{row}">
                <el-popconfirm
                  confirm-button-text="Evet"
                  cancel-button-text="Hayır"
                  icon="el-icon-delete"
                  icon-color="red"
                  :title="`${row.name} müdürlüğü silmek istediğinizden emin misiniz ?`"
                  @onConfirm="deleteRole(row.id)"
                >
                  <el-button slot="reference" type="danger" size="mini">
                    <i class="el-icon-delete-solid" />
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-card>
    </el-row>
    <el-row :gutter="20" style="margin-top:50px;">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Yeni Rol Ekle</span>
          </div>
          <el-form :model="roleCreateDto" :rules="roleCreateDtoRules">
            <el-form-item prop="name">
              <md-input v-model="roleCreateDto.name" icon="el-icon-search" name="name" placeholder="Rol Adı (zorunlu)">
                Rol Adı*
              </md-input>
            </el-form-item>
            <el-form-item prop="description">
              <md-input v-model="roleCreateDto.description" icon="el-icon-search" name="description" placeholder="Açıklama giriniz">
                Açıklama
              </md-input>
            </el-form-item>
            <el-button type="success" @click="addRole">
              Kaydet
            </el-button>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Rol Yetkileri</span>
          </div>
          <div v-if="selectedRoleId !== null">
            <el-tabs v-model="activeRoleGroupTab" type="border-card" @tab-click="selectRoleGroup">
              <el-tab-pane v-for="roleGroup in allRoleGroups" :key="roleGroup.id" :label="roleGroup.name">
                <el-table
                  v-loading="changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleIdLoading"
                  :data="changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;"
                  :height="300"
                >
                  <el-table-column label="ID" prop="id" align="center" width="80">
                    <template slot-scope="{row}">
                      <span>{{ row.id }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Yetki Adı" prop="name" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Yetki Açıklaması" prop="description" align="center">
                    <template slot-scope="{row}">
                      <span>{{ row.description }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Aktiflik" prop="isActive" align="center">
                    <template slot-scope="{row}">
                      <el-switch v-model="row.isActive" />
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
            <el-button type="success" style="margin-top: 9px;" size="mini" @click="saveChangesRoleClaims">
              Değişiklikleri Kaydet
            </el-button>
          </div>
          <div v-else>
            Rolün sahip olduğu, rol gruplarına göre gruplandırılmış yetkileri görebilmek için lütfen tablodan bir rol seçiniz..!
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Rol Kullanıcıları</span>
          </div>
          <div v-if="selectedRoleId !== null">
            <el-table
              v-loading="allEmployeeRolesWithEmployeeByRoleIdLoading"
              :data="allEmployeeRolesWithEmployeeByRoleId"
              border
              fit
              highlight-current-row
              style="width: 100%;"
            >
              <el-table-column label="ID" prop="id" align="center" width="80">
                <template slot-scope="{row}">
                  <span>{{ row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Çalışan" prop="employee.username" align="center">
                <template slot-scope="{row}">
                  <span>{{ `${row.employee.name} (${row.employee.username})` }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Sil" align="center" width="80">
                <template slot-scope="{row}">
                  <el-popconfirm
                    confirm-button-text="Evet"
                    cancel-button-text="Hayır"
                    icon="el-icon-delete"
                    icon-color="red"
                    :title="`${allRoles.find(role => role.id === row.roleId).name} rolünden
                      ${row.employee.name} (${row.employee.username})
                      çalışanını kaldırmak istediğinizden emin misiniz ?`"
                    @onConfirm="deleteEmployeeRole(row.id)"
                  >
                    <el-button slot="reference" type="danger" size="mini">
                      <i class="el-icon-delete-solid" />
                    </el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <el-card class="box-card" style="margin-top: 10px;">
              <div slot="header" class="clearfix">
                <span>Çalışana Rol Ata</span>
              </div>
              <el-form :model="employeeRoleCreateDto" :rules="employeeRoleCreateDtoRules">
                <el-row :gutter="20">
                  <el-col :span="20">
                    <el-form-item prop="username">
                      <el-select
                        v-model="employeeRoleCreateDto.username"
                        v-loading="allActiveEmployeesLoading"
                        placeholder="Çalışan*"
                        filterable
                      >
                        <el-option
                          v-for="employee in allActiveEmployees"
                          :key="employee.username"
                          :label="`${employee.name} (${employee.username})`"
                          :value="employee.username"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item prop="">
                      <el-button type="success" size="mini" @click="addEmployeeRole">
                        Ekle
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </div>
          <div v-else>
            Rolün sahip olduğu çalışanları görebilmek için lütfen tablodan bir rol seçiniz..!
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  add as addRole,
  update as updateRole,
  remove as deleteRole,
  getAll as getAllRoles
} from '@/api/roles'
import MdInput from '@/components/MDinput'

import {
  getAllByActive as getAllEmployeesByActive
} from '@/api/employees'

import {
  add as addEmployeeRole,
  remove as deleteEmployeeRole,
  getAllWithEmployeeByRoleId as getAllEmployeeRolesWithEmployeeByRoleId
} from '@/api/employeeRoles'
import {
  getAll as getAllRoleGroups
} from '@/api/roleGroups'

import {
  getAllByRoleGroupId as getAllRoleGroupClaimsByRoleGroupId,
  getAllWithRoleClaimsByRoleGroupIdAndRoleId as getAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId
} from '@/api/roleGroupClaims'

const defaultRoleCreateDto = {
  name: '',
  description: ''
}
const defaultRoleUpdateDto = {
  id: 0,
  name: '',
  description: ''
}

const defaultEmployeeRoleCreateDto = {
  username: '',
  roleId: 0
}

export default {
  name: 'Roles',
  components: {
    MdInput
  },
  data() {
    return {
      allRoles: [],
      allRolesLoading: true,
      roleCreateDto: ({ ...defaultRoleCreateDto }),
      roleUpdateDto: ({ ...defaultRoleUpdateDto }),
      updatableRoleId: null,
      roleCreateDtoRules: {
        name: [{ required: true, trigger: 'change', message: 'Role Adı alanı zorunludur!' }]
      },
      roleUpdateDtoRules: {
        name: [{ required: true, trigger: 'change', message: 'Role Adı alanı zorunludur!' }]
      },
      allEmployeeRolesWithEmployeeByRoleId: [],
      allEmployeeRolesWithEmployeeByRoleIdLoading: false,
      selectedRoleId: null,
      employeeRoleCreateDto: ({ ...defaultEmployeeRoleCreateDto }),
      employeeRoleCreateDtoRules: {},
      allActiveEmployeesLoading: false,
      changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId: [],
      changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleIdLoading: false,
      activeRoleGroupTab: '0',
      allRoleGroups: [],
      changedAllRoleWorkOrderTypesByRoleId: [],
      changedAllRoleWorkOrderTypesByRoleIdLoading: false
    }
  },
  created() {
    this.getAllRoles()
    this.getAllActiveEmployees()
    this.getAllRoleGroups()
  },
  methods: {
    async getAllRoles() {
      this.allDirectoriesLoading = true
      return await new Promise((resolve, reject) => {
        getAllRoles().then(response => {
          const { data } = response
          this.allRoles = data
          this.allRolesLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async addRole() {
      return await new Promise((resolve, reject) => {
        addRole(this.roleCreateDto).then(async() => {
          this.clearRoleCreateInputs()
          await this.getAllRoles()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async updateRole() {
      return await new Promise((resolve, reject) => {
        updateRole(this.roleUpdateDto).then(async() => {
          this.clearRoleUpdateInputs()
          await this.getAllRoles()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async deleteRole(id) {
      return await new Promise((resolve, reject) => {
        deleteRole(id).then(async() => {
          await this.getAllRoles()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async addEmployeeRole() {
      return await new Promise((resolve, reject) => {
        addEmployeeRole(
          this.employeeRoleCreateDto
        ).then(async() => {
          this.clearEmployeeRoleCreateInputs()
          await this.resetEmployeeRoleTable()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async deleteEmployeeRole(employeeRoleId) {
      return await new Promise((resolve, reject) => {
        deleteEmployeeRole(employeeRoleId)
          .then(async() => {
            await this.resetEmployeeRoleTable()
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },
    async getAllEmployeeRolesWithEmployeeByRoleId(roleId) {
      this.allEmployeeRolesWithEmployeeByRoleIdLoading = true
      return await new Promise((resolve, reject) => {
        getAllEmployeeRolesWithEmployeeByRoleId(
          roleId
        ).then(response => {
          const { data } = response
          this.allEmployeeRolesWithEmployeeByRoleId = data
          this.allEmployeeRolesWithEmployeeByRoleIdLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async selectRole(role) {
      this.selectedRoleId = role.id
      this.clearEmployeeRoleCreateInputs()
      await this.resetEmployeeRoleTable()
    },
    selectRoleGroup(roleGroup) {
      const selectedRoleGroupId = roleGroup.$vnode.key
      this.getAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId(selectedRoleGroupId)
    },
    async resetEmployeeRoleTable() {
      await this.getAllEmployeeRolesWithEmployeeByRoleId(
        this.selectedRoleId
      )
    },
    async resetRoleGroupTabs() {
      this.changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId = []
      await this.getAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId(
        this.allRoleGroups[0].id
      )
      this.activeRoleGroupTab = '0'
    },
    async getAllRoleGroups() {
      return await new Promise((resolve, reject) => {
        getAllRoleGroups().then(response => {
          const { data } = response
          this.allRoleGroups = data
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAllActiveEmployees() {
      this.allActiveEmployeesLoading = true
      return await new Promise((resolve, reject) => {
        getAllEmployeesByActive(
          true
        ).then(response => {
          const { data } = response
          this.allActiveEmployees = data
          this.allActiveEmployeesLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAllRoleGroupClaimsByRoleGroupId(roleGroupId) {
      return await new Promise((resolve, reject) => {
        getAllRoleGroupClaimsByRoleGroupId(
          roleGroupId
        ).then(response => {
          const { data } = response
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId(roleGroupId) {
      this.changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleIdLoading = true
      return await new Promise((resolve, reject) => {
        getAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId(
          roleGroupId,
          this.selectedRoleId
        ).then(async response => {
          const { data } = response
          this.allRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId =
            (await this.getAllRoleGroupClaimsByRoleGroupId(
              roleGroupId
            )).map(roleGroupClaim => {
              const roleGroupClaimWithRoleClaims = data
                .find(roleGroupClaimWithRoleClaims => {
                  return roleGroupClaimWithRoleClaims.id === roleGroupClaim.id
                })
              roleGroupClaim.isActive = !!roleGroupClaimWithRoleClaims
              roleGroupClaim.roleClaims = roleGroupClaim.isActive
                ? roleGroupClaimWithRoleClaims.roleClaims
                : []
              return roleGroupClaim
            })
          this.changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId =
            this.allRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId
              .map(roleGroupClaimWithRoleClaims => ({ ...roleGroupClaimWithRoleClaims }))
          this.changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleIdLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async saveChangesRoleClaims() {
      const addedRoleClaims = []
      const deletedRoleClaims = []
      for (
        const roleGroupClaimWithRoleClaims
        of this.changedAllRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId
      ) {
        const roleGroupClaim = this.allRoleGroupClaimsWithRoleClaimsByRoleGroupIdAndRoleId
          .find(roleGroupClaim => roleGroupClaim.id === roleGroupClaimWithRoleClaims.id)
        if (roleGroupClaimWithRoleClaims.isActive !== roleGroupClaim.isActive) {
          if (roleGroupClaimWithRoleClaims.isActive) {
            addedRoleClaims.push({
              roleId: this.selectedRoleId,
              roleGroupClaimId: roleGroupClaimWithRoleClaims.id
            })
          } else {
            for (
              const roleClaim
              of roleGroupClaimWithRoleClaims.roleClaims
            ) {
              deletedRoleClaims.push(
                roleClaim.id
              )
            }
          }
        }
      }
      if (addedRoleClaims.length > 0 || deletedRoleClaims.length > 0) {
        if (addedRoleClaims.length > 0) await this.addMultipleRoleClaim(addedRoleClaims)
        if (deletedRoleClaims.length > 0) await this.deleteMultipleRoleClaimByIds(deletedRoleClaims)
        await this.resetRoleGroupTabs()
      }
    },
    async selectRoleForWorkOrderTypes(role, expandedRoles) {
      this.resetRoleWorkOrderTypes()
      if (expandedRoles.find(expandedRole => expandedRole === role)) {
        expandedRoles.filter(expandedRole => expandedRole !== role)
          .forEach(expandedRole => {
            this.$refs.rolesTable
              .toggleRowExpansion(
                expandedRole,
                false
              )
          })
        await this.selectRole(role)
        await this.getAllRoleWorkOrderTypesByRoleId()
      }
    },
    resetRoleWorkOrderTypes() {
      this.changedAllRoleWorkOrderTypesByRoleId = []
      this.changedAllRoleWorkOrderTypesByRoleIdLoading = true
    },
    async saveChangesRoleWorkOrderTypes() {
      const addedRoleWorkOrderTypes = []
      const deletedRoleWorkOrderTypes = []
      for (
        const changedRoleWorkOrderType
        of this.changedAllRoleWorkOrderTypesByRoleId
      ) {
        const roleWorkOrderType = this.allRoleWorkOrderTypesByRoleId
          .find(roleWorkOrderType => roleWorkOrderType.workOrderTypeCode ===
            changedRoleWorkOrderType.workOrderTypeCode)
        if (changedRoleWorkOrderType.isActive !== roleWorkOrderType.isActive) {
          if (changedRoleWorkOrderType.isActive) {
            addedRoleWorkOrderTypes.push({
              roleId: changedRoleWorkOrderType.roleId,
              workOrderTypeCode: changedRoleWorkOrderType.workOrderTypeCode
            })
          } else {
            deletedRoleWorkOrderTypes.push(
              changedRoleWorkOrderType.id
            )
          }
        }
      }
      if (addedRoleWorkOrderTypes.length > 0 || deletedRoleWorkOrderTypes.length > 0) {
        if (addedRoleWorkOrderTypes.length > 0) await this.addMultipleRoleWorkOrderType(addedRoleWorkOrderTypes)
        if (deletedRoleWorkOrderTypes.length > 0) await this.deleteMultipleRoleWorkOrderTypeByIds(deletedRoleWorkOrderTypes)
        this.resetRoleWorkOrderTypes()
        await this.getAllRoleWorkOrderTypesByRoleId()
      }
    },
    clearRoleCreateInputs() {
      this.roleCreateDto = ({ ...defaultRoleCreateDto })
    },
    clearRoleUpdateInputs() {
      this.clearUpdatableRoleId()
      this.roleUpdateDto = ({ ...defaultRoleUpdateDto })
    },
    setUpdatableRoleId(roleId) {
      this.updatableRoleId = roleId
      defaultRoleUpdateDto.id = this.updatableRoleId
      this.roleUpdateDto = ({ ...defaultRoleUpdateDto })
    },
    clearUpdatableRoleId() {
      this.setUpdatableRoleId(0)
    },
    clearEmployeeRoleCreateInputs() {
      defaultEmployeeRoleCreateDto.roleId = this.selectedRoleId
      this.employeeRoleCreateDto = ({ ...defaultEmployeeRoleCreateDto })
    }
  }
}
</script>

<style>

  .clickable-table-row {
    cursor: pointer;
  }

</style>

<style scoped>

  .mixin-components-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
  }

  .el-select {
    display: block;
  }
</style>
