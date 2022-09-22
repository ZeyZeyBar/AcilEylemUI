<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Şeflikler</span>
        </div>
        <el-form :model="chiefUpdateDto" :rules="chiefUpdateDtoRules">
          <el-table
            ref="chiefTable"
            v-loading="allChiefsLoading"
            :data="allChiefs"
            row-class-name="clickable-table-row"
            style="width: 100%;"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="Şeflik No" prop="chief_No" align="center" width="130">
              <template slot-scope="{row}">
                <span>{{ row.chief_No }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Şeflik Adı" prop="chief_Name" align="center">
              <template slot-scope="{row}">
                <span v-if="updatableChiefId !== row.id">{{ row.chief_Name }}</span>
                <el-form-item v-else prop="chief_Name">
                  <el-input v-model="chiefUpdateDto.chief_Name" :placeholder="row.chief_Name" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="Müdürlük No" prop="directory_No" align="center">
              <template slot-scope="{row}">
                <span v-if="updatableChiefId !== row.id">{{ computedDirectoryName(row.directory_No) }}</span>
                <el-form-item v-else prop="directory_No">
                  <el-select
                    v-model="chiefUpdateDto.directory_No"
                    v-loading="allDirectoriesLoading"
                    filterable
                    placeholder="Bağlı Olduğu Müdürlük*"
                  >
                    <el-option
                      v-for="directory in allDirectories"
                      :key="directory.directoryId"
                      :label="directory.directoryName"
                      :value="directory.directoryId"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="Güncelle" align="center" width="90">
              <template slot-scope="{row}">
                <el-button v-if="updatableChiefId !== row.id" type="success" size="mini" @click="setUpdatableChiefId(row.id)">
                  <i class="el-icon-edit" />
                </el-button>
                <el-form-item v-else prop="">
                  <el-row>
                    <el-button type="success" size="mini" @click="updateChief">
                      <i class="el-icon-check" />
                    </el-button>
                  </el-row>
                  <el-row>
                    <el-button type="danger" size="mini" @click="clearChiefUpdateInputs">
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
                  :title="`${row.chief_Name} şefliği silmek istediğinizden emin misiniz ?`"
                  @onConfirm="deleteChief(row.id)"
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
            <span>Yeni Şeflik Ekle</span>
          </div>
          <el-form :model="chiefCreateDto" :rules="chiefCreateDtoRules">
            <el-form-item prop="chief_No">
              <md-input v-model="chiefCreateDto.chief_No" icon="el-icon-search" name="chief_No" placeholder="Şeflik Numarası (zorunlu)">
                Şeflik Numarısı*
              </md-input>
            </el-form-item>
            <el-form-item prop="chief_Name">
              <md-input v-model="chiefCreateDto.chief_Name" icon="el-icon-search" name="chief_Name" placeholder="Şeflik adı giriniz (zorunlu)">
                Şeflik Adı*
              </md-input>
            </el-form-item>
            <el-form-item prop="directory_No">
              <el-select
                v-model="chiefCreateDto.directory_No"
                v-loading="allDirectoriesLoading"
                filterable
                placeholder="Bağlı Olduğu Müdürlük*"
              >
                <el-option
                  v-for="directory in allDirectories"
                  :key="directory.directoryId"
                  :label="directory.directoryName"
                  :value="directory.directoryId"
                />
              </el-select>
            </el-form-item>
            <el-button type="success" @click="addChief">
              Kaydet
            </el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  add as addChief,
  update as updateChief,
  remove as deleteChief,
  getAll as getAllChiefs
} from '@/api/chiefs'
import {
  getAll as getAllDirectories
} from '@/api/directory'

import MdInput from '@/components/MDinput'

const defaultChiefCreateDto = {
  chief_No: '',
  chief_Name: '',
  directory_No: null
}
const defaultChiefUpdateDto = {
  id: 0,
  chief_Name: '',
  directory_No: null
}

export default {
  name: 'Chiefs',
  components: {
    MdInput
  },
  data() {
    return {
      allChiefs: [],
      allDirectories: [],
      allChiefsLoading: true,
      allDirectoriesLoading: true,
      chiefCreateDto: ({ ...defaultChiefCreateDto }),
      chiefUpdateDto: ({ ...defaultChiefUpdateDto }),
      chiefCreateDtoRules: {
        chief_No: [{ required: true, trigger: 'change', message: 'Şeflik Numarası alanı zorunludur!' }],
        chief_Name: [{ required: true, trigger: 'change', message: 'Şeflik adı alanı zorunludur!' }]
      },
      chiefUpdateDtoRules: {
        chief_No: [{ required: true, trigger: 'change', message: 'Şeflik Numarası alanı zorunludur!' }],
        chief_Name: [{ required: true, trigger: 'change', message: 'Şeflik adı alanı zorunludur!' }]
      },
      updatableChiefId: null
    }
  },
  computed: {
    computedDirectoryName() {
      return (directory_No) => {
        return this.allDirectories.find(d => d.directoryId === directory_No)?.directoryName
      }
    }
  },
  created() {
    this.getAllChiefs()
    this.getAllDirectories()
  },
  methods: {
    async getAllChiefs() {
      this.allChiefsLoading = true
      return await new Promise((resolve, reject) => {
        getAllChiefs().then(response => {
          const { data } = response
          this.allChiefs = data
          this.allChiefsLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async addChief() {
      return await new Promise((resolve, reject) => {
        addChief(this.chiefCreateDto).then(async() => {
          this.clearChiefCreateInputs()
          await this.getAllChiefs()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async updateChief() {
      return await new Promise((resolve, reject) => {
        updateChief(this.chiefUpdateDto).then(async() => {
          this.clearChiefUpdateInputs()
          await this.getAllChiefs()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async deleteChief(id) {
      return await new Promise((resolve, reject) => {
        deleteChief(id).then(async() => {
          await this.getAllChiefs()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAllDirectories() {
      this.allDirectoriesLoading = true
      return await new Promise((resolve, reject) => {
        getAllDirectories().then(response => {
          const { data } = response
          this.allDirectories = data
          this.allDirectoriesLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    clearChiefCreateInputs() {
      this.chiefCreateDto = ({ ...defaultChiefCreateDto })
    },
    clearChiefUpdateInputs() {
      this.clearUpdatableChiefId()
      this.chiefUpdateDto = ({ ...defaultChiefUpdateDto })
    },
    setUpdatableChiefId(chiefId) {
      this.updatableChiefId = chiefId
      defaultChiefUpdateDto.id = this.updatableChiefId
      this.chiefUpdateDto = ({ ...defaultChiefUpdateDto })
    },
    clearUpdatableChiefId() {
      this.setUpdatableChiefId(0)
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

