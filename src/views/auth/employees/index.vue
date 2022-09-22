<template>
  <div class="mixin-components-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button style="margin-bottom: 10px;" type="success" size="medium" @click="showAddEmployeeDialog">Yeni Kullanıcı Ekle</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Kullanıcılar</span>
          </div>
          <el-collapse style="margin-bottom: 15px;">
            <el-collapse-item title="Filtreler">
              <el-form :model="employeeFilterDto" :rules="employeeFilterDtoRules">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item prop="name">
                      <el-input v-model="employeeFilterDto.name" placeholder="Tam İsim" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="directory_Id">
                      <el-select
                        v-model="employeeFilterDto.directory_Id"
                        v-loading="allActiveDirectoriesLoading"
                        filterable
                        placeholder="Müdürlük"
                        @change="getAllChiefsByDirectoryId(employeeFilterDto.directory_Id)"
                        @clear="clearEmployeeTableChiefInputs"
                      >
                        <el-option
                          v-for="directory in allActiveDirectories"
                          :key="directory.directoryId"
                          :label="directory.directoryName"
                          :value="directory.directoryId"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="chief_Id">
                      <el-select
                        v-model="chiefId"
                        v-loading="allActiveChiefsByDirectoryLoading"
                        filterable
                        placeholder="Şeflik"
                        @change="getAllChiefByDirectory(chiefId)"
                        @clear="clearEmployeeTableChiefInputs(false)"
                      >
                        <el-option
                          v-for="chief in allActiveChiefsByDirectory"
                          :key="chief.chief_No"
                          :label="chief.chief_Name"
                          :value="chief.chief_No"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="gsm">
                      <el-input v-model="employeeFilterDto.gsm" placeholder="Telefon Numarası" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <div style="text-align: center">
                      <el-radio-group v-model="employeeFilterDto.isActive">
                        <el-radio :label="true">Aktif</el-radio>
                        <el-radio :label="false">Pasif</el-radio>
                        <el-radio :label="null">Hepsi</el-radio>
                      </el-radio-group>
                      <el-button style="margin-left: 10px;" type="primary" size="medium" @click="getAllEmployeesByFilter">Ara</el-button>
                      <el-button size="medium" @click="clearEmployeeTableAndFilterInputs(false)">Temizle</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>
          </el-collapse>
          <div style="margin-bottom: 15px;">
            <span>Listelenen Satır Sayısı: {{ allEmployeesByFilter.length }}</span>
          </div>
          <el-form :model="employeeUpdateDto" :rules="employeeUpdateDtoRules">
            <el-table
              v-loading="allEmployeesByFilterLoading"
              :data="allEmployeesByFilter"
              border
              fit
              highlight-current-row
              style="width: 100%;"
              :height="500"
            >
              <el-table-column
                v-for="(columnData, columnName) in computedEmployeeTableColumns"
                :key="columnName"
                :label="columnData.label"
                :prop="columnName"
                align="center"
                :width="columnData.width"
              >
                <template slot-scope="{row}">
                  <div v-if="employeeUpdateDto.username !== row.username">
                    <div v-if="typeof row[columnName] === 'boolean'">
                      <i v-if="row[columnName]" class="el-icon-check el-icon-large-bold el-icon-check-green" />
                      <i v-else class="el-icon-close el-icon-large-bold el-icon-close-red" />
                    </div>
                    <i v-else-if="row[columnName] === null" class="el-icon-minus el-icon-large-bold el-icon-minus-orange" />
                    <el-button v-else-if="columnData.shownInUpdateMode" type="info" size="mini" @click="setEmployeeUpdateInputs(row)">
                      <i class="el-icon-edit" />
                    </el-button>
                    <span v-else>{{ computedEmployeeTableColumn(row, columnName) }}</span>
                  </div>
                  <el-form-item v-else :prop="columnName">
                    <el-select
                      v-if="columnData.updateMode === 'select' && columnName === 'directory_Id'"
                      v-model="employeeUpdateDto[columnName]"
                      filterable
                    >
                      <el-option
                        v-for="data in getState(columnData.stateName)"
                        :key="data.directoryId"
                        :label="data.directoryName"
                        :value="data.directoryId"
                      />
                    </el-select>
                    <el-select
                      v-else-if="columnData.updateMode === 'select' && columnName === 'chief_Id'"
                      v-model="employeeUpdateDto[columnName]"
                      filterable
                    >
                      <el-option
                        v-for="data in getState(columnData.stateName)"
                        :key="data.chief_No"
                        :label="data.chief_Name"
                        :value="data.chief_No"
                      />
                    </el-select>
                    <el-checkbox
                      v-else-if="columnData.updateMode === 'check'"
                      v-model="employeeUpdateDto[columnName]"
                    />
                    <el-input
                      v-else
                      v-model="employeeUpdateDto[columnName]"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="Güncelle" align="center" width="90" fixed="right">
                <template slot-scope="{row}">
                  <el-button v-if="employeeUpdateDto.username !== row.username" type="success" size="mini" @click="setEmployeeUpdateInputs(row)">
                    <i class="el-icon-edit" />
                  </el-button>
                  <el-form-item v-else prop="">
                    <el-row>
                      <el-button type="success" size="mini" @click="updateEmployee">
                        <i class="el-icon-check" />
                      </el-button>
                    </el-row>
                    <el-row>
                      <el-button type="danger" size="mini" @click="clearEmployeeUpdateInputs">
                        <i class="el-icon-close" />
                      </el-button>
                    </el-row>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-alert
      title="Tüm kullanıcıları listelemek için filtrelerde değişiklik yapmadan doğrudan 'Ara' butonunu kullanınız."
      type="info"
    />

    <el-dialog
      title="Yeni Kullanıcı Ekle"
      :visible.sync="addEmployeeDialogVisible"
      width="30%"
    >
      <el-form :model="employeeCreateDto" :rules="employeeCreateDtoRules">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="username">
                  <el-input-number
                    v-model="employeeCreateDto.username"
                    placeholder="Kullanıcı Adı*"
                    :min="0"
                    :max="99999"
                    :precision="0"
                    :controls="false"
                    style="width: 100%; text-align: left;"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="directory_Id">
                  <el-select
                    v-model="employeeCreateDto.directory_Id"
                    v-loading="allActiveDirectoriesLoading"
                    filterable
                    placeholder="Bağlı Olduğu Müdürlük*"
                    @change="getAllChiefsByDirectoryId(employeeCreateDto.directory_Id)"
                    @clear="clearEmployeeTableChiefInputs"
                  >
                    <el-option
                      v-for="directory in allActiveDirectories"
                      :key="directory.directoryId"
                      :label="directory.directoryName"
                      :value="directory.directoryId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="name">
                  <el-input v-model="employeeCreateDto.name" placeholder="Tam isim*" maxlength="30" show-word-limit />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="chief_Id">
                  <el-select
                    v-model="chiefId2"
                    v-loading="allActiveChiefsByDirectoryLoading"
                    filterable
                    placeholder="Şeflik*"
                    @change="getAllChiefByDirectory(chiefId2)"
                    @clear="clearEmployeeTableChiefInputs(false)"
                  >
                    <el-option
                      v-for="chief in allActiveChiefsByDirectory"
                      :key="chief.chief_No"
                      :label="chief.chief_Name"
                      :value="chief.chief_No"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="email">
                  <el-input v-model="employeeCreateDto.email" placeholder="E-Posta Adresi*" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="gsm">
                  <el-input v-model="employeeCreateDto.gsm" placeholder="Kişisel Telefon Numarası*" maxlength="15" show-word-limit />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="password">
                  <el-input v-model="employeeCreateDto.password" type="password" placeholder="Şifre*" maxlength="50" show-password />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="work_Phone">
                  <el-input v-model="employeeCreateDto.work_Phone" placeholder="İş Telefon Numarası" maxlength="15" show-word-limit />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="home_Phone">
                  <el-input v-model="employeeCreateDto.home_Phone" placeholder="Ev Telefonu Numarası" maxlength="15" show-word-limit />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="fax_Phone">
                  <el-input v-model="employeeCreateDto.fax_Phone" placeholder="Faks Telefon Numarası" maxlength="15" show-word-limit />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="radio_Code">
                  <el-input v-model="employeeCreateDto.radio_Code" placeholder="Telsiz Kodu" maxlength="15" show-word-limit />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="work_Adress">
                  <el-input v-model="employeeCreateDto.work_Adress" type="textarea" placeholder="İş Adresi" maxlength="250" show-word-limit />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmployeeDialogVisible = false">Kapat</el-button>
        <el-button type="success" @click="addEmployee">Ekle</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  defaultEmployeeCreateDto,
  defaultEmployeeUpdateDto,
  defaultEmployeeFilterDto,
  employeeTableColumns
} from './defaultVariables'

import {
  add as addEmployee,
  update as updateEmployee,
  getAllByFilter as getAllEmployeesByFilter
} from '@/api/employees'

import {
  getAllByActive as getAllByActiveDirectories
} from '@/api/directory'

import {
  getAllByActive as getAllByActiveChiefs,
  getAllChiefByDirectoryId as getAllChiefByDirectory
} from '@/api/chiefs'

export default {
  name: 'Employees',
  data() {
    return {
      allEmployeesByFilter: [],
      allEmployeesByFilterLoading: false,
      allActiveDirectories: [],
      allActiveDirectoriesLoading: true,
      allActiveChiefs: [],
      allActiveChiefsLoading: true,
      allActiveChiefsByDirectory: [],
      allActiveChiefsByDirectoryLoading: false,
      employeeCreateDto: ({ ...defaultEmployeeCreateDto }),
      employeeCreateDtoRules: {},
      employeeUpdateDto: ({ ...defaultEmployeeUpdateDto }),
      employeeUpdateDtoRules: {},
      employeeFilterDto: ({ ...defaultEmployeeFilterDto }),
      employeeFilterDtoRules: {},
      employeeTableColumns: ({ ...employeeTableColumns }),
      addEmployeeDialogVisible: false,
      chiefId: null,
      chiefId2: null
    }
  },
  computed: {
    computedEmployeeTableColumns() {
      return Object.fromEntries(
        Object.entries(this.employeeTableColumns)
          .filter(([columnName, columnData]) => columnData.shown))
    },
    computedEmployeeTableColumn() {
      return (row, column) => {
        switch (column) {
          case 'directory_Id': return this.allActiveDirectories.find(directory => directory.directoryId === row[column])?.directoryName
          case 'chief_Id': return this.allActiveChiefs.find(chief => chief.chief_No === row[column])?.chief_Name
          default: return row[column]
        }
      }
    },
    getState() {
      return name => {
        return this[name]
      }
    }
  },
  watch: {
    addEmployeeDialogVisible(visible) {
      if (!visible) {
        this.clearEmployeeCreateInputs()
      }
    },
    chiefId(value) {
      this.employeeFilterDto.chief_Id =
        this.allActiveChiefsByDirectory
          .find(chief =>
            chief.chief_No === value
          )?.chief_No ?? null
    },
    chiefId2(value) {
      this.employeeCreateDto.chief_Id =
        this.allActiveChiefsByDirectory
          .find(chief =>
            chief.chief_No === value
          )?.chief_No ?? null
    }
  },
  created() {
    this.getAllByActiveDirectories()
    this.getAllByActiveChiefs()
  },
  methods: {
    async getAllByActiveDirectories() {
      this.allActiveDirectoriesLoading = true
      return await new Promise((resolve, reject) => {
        getAllByActiveDirectories(
          true
        ).then(response => {
          const { data } = response
          this.allActiveDirectories = data
          this.allActiveDirectoriesLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAllByActiveChiefs() {
      this.allActiveChiefsLoading = true
      return await new Promise((resolve, reject) => {
        getAllByActiveChiefs(
          true
        ).then(response => {
          const { data } = response
          this.allActiveChiefs = data
          this.allActiveChiefsLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAllEmployeesByFilter() {
      this.allEmployeesByFilterLoading = true
      return await new Promise((resolve, reject) => {
        getAllEmployeesByFilter(
          this.employeeFilterDto
        ).then(response => {
          const { data } = response
          this.allEmployeesByFilter = data
          this.allEmployeesByFilterLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAllChiefByDirectory(directoryId) {
      if (directoryId > 0) {
        this.allActiveChiefsByDirectoryLoading = true
        return await new Promise((resolve, reject) => {
          getAllChiefByDirectory(
            directoryId
          ).then(response => {
            const { data } = response
            this.allActiveChiefsByDirectory = data
            this.allActiveChiefsByDirectoryLoading = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    },
    getAllChiefsByDirectoryId(regionId) {
      this.getAllChiefByDirectory(regionId)
    },
    async addEmployee() {
      this.employeeCreateDto.username = `${this.employeeCreateDto.username}`

      return await new Promise((resolve, reject) => {
        addEmployee(
          this.employeeCreateDto
        ).then(async() => {
          await this.resetEmployeeTable()
          resolve()
        }).catch(error => {
          reject(error)
        })
        this.closeAddEmployeeDialog()
      })
    },
    async updateEmployee() {
      return await new Promise((resolve, reject) => {
        updateEmployee(
          this.employeeUpdateDto
        ).then(async() => {
          this.clearEmployeeUpdateInputs()
          await this.resetEmployeeTable()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    setEmployeeUpdateInputs(employee) {
      for (
        const key
        in this.employeeUpdateDto
      ) {
        this.employeeUpdateDto[key] =
          employee[key]
      }
    },
    clearEmployeeUpdateInputs() {
      this.employeeUpdateDto = ({ ...defaultEmployeeUpdateDto })
    },
    showAddEmployeeDialog() {
      this.addEmployeeDialogVisible = true
    },
    closeAddEmployeeDialog() {
      this.addEmployeeDialogVisible = false
    },
    clearEmployeeCreateInputs() {
      this.employeeCreateDto = ({ ...defaultEmployeeCreateDto })
      this.clearEmployeeTableChiefInputs()
    },
    clearEmployeeFilterInputs() {
      this.employeeFilterDto = ({ ...defaultEmployeeFilterDto })
    },
    clearEmployeeTable() {
      this.allEmployeesByFilter = []
    },
    clearEmployeeTableChiefInputs(clearChiefs = true) {
      this.employeeFilterDto.directory_Id = !clearChiefs ? this.employeeFilterDto.directory_Id : null
      this.chiefId = !clearChiefs ? this.chiefId : null
      this.chiefId2 = !clearChiefs ? this.chiefId2 : null
      this.allActiveChiefsByDirectory = !clearChiefs ? this.allActiveChiefsByDirectory : []
    },
    clearEmployeeTableAndFilterInputs() {
      this.clearEmployeeTable()
      this.clearEmployeeFilterInputs()
      this.clearEmployeeTableChiefInputs()
    }
  }
}
</script>

<style>

  .el-input-number .el-input__inner {
    text-align: left;
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

  .el-icon-large-bold {
    font-weight: bold;
    font-size: large;
  }

  .el-icon-check-green {
    color: green;
  }

  .el-icon-close-red {
    color: red;
  }

  .el-icon-minus-orange {
    color: orange;
  }

</style>

