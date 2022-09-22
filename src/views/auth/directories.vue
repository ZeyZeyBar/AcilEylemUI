<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Müdürlükler</span>
        </div>
        <el-form :model="directoryUpdateDto" :rules="directoryUpdateDtoRules">
          <el-table
            ref="directoryTable"
            v-loading="allDirectoriesLoading"
            :data="allDirectories"
            row-class-name="clickable-table-row"
            style="width: 100%;"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="Müdürlük No" prop="directoryId" align="center" width="130">
              <template slot-scope="{row}">
                <span>{{ row.directoryId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Müdürlük Adı" prop="directoryName" align="center">
              <template slot-scope="{row}">
                <span v-if="updatableDirectoryId !== row.id">{{ row.directoryName }}</span>
                <el-form-item v-else prop="directoryName">
                  <el-input v-model="directoryUpdateDto.directoryName" :placeholder="row.directoryName" />
                </el-form-item>
              </template>
            </el-table-column>
            <!-- <el-table-column label="Tarih" prop="dateModified" align="center">
              <template slot-scope="{row}">
                <span v-if="updatableDirectoryId !== row.id">{{ row.dateModified }}</span>
                <el-form-item v-else prop="dateModified">
                  <el-input :value="row.dateModified" disabled />
                </el-form-item>
              </template>
            </el-table-column> -->
            <el-table-column label="Güncelle" align="center" width="90">
              <template slot-scope="{row}">
                <el-button v-if="updatableDirectoryId !== row.id" type="success" size="mini" @click="setUpdatableDirectoryId(row.id, row.dateModified)">
                  <i class="el-icon-edit" />
                </el-button>
                <el-form-item v-else prop="">
                  <el-row>
                    <el-button type="success" size="mini" @click="updateDirectory">
                      <i class="el-icon-check" />
                    </el-button>
                  </el-row>
                  <el-row>
                    <el-button type="danger" size="mini" @click="clearDirectoryUpdateInputs">
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
                  :title="`${row.directoryName} müdürlüğü silmek istediğinizden emin misiniz ?`"
                  @onConfirm="deleteDirectory(row.id)"
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
            <span>Yeni Müdürlük Ekle</span>
          </div>
          <el-form :model="directoryCreateDto" :rules="directoryCreateDtoRules">
            <el-form-item prop="directoryId">
              <md-input v-model="directoryCreateDto.directoryId" icon="el-icon-search" name="directoryId" placeholder="Müdürlük Numarısı (zorunlu)">
                Müdürlük Numarısı*
              </md-input>
            </el-form-item>
            <el-form-item prop="directoryName">
              <md-input v-model="directoryCreateDto.directoryName" icon="el-icon-search" name="directoryName" placeholder="Müdürlük adı giriniz (zorunlu)">
                Müdürlük Adı*
              </md-input>
            </el-form-item>
            <el-button type="success" @click="addDirectory">
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
  add as addDirectory,
  update as updateDirectory,
  remove as deleteDirectory,
  getAll as getAllDirectories
} from '@/api/directory'
import MdInput from '@/components/MDinput'

const defaultDirectoryCreateDto = {
  directoryId: '',
  directoryName: ''
}
const defaultDirectoryUpdateDto = {
  id: 0,
  directoryName: '',
  directoryId: '',
  dateModified: ''
}
export default {
  name: 'Directories',
  components: {
    MdInput
  },
  data() {
    return {
      allDirectories: [],
      allDirectoriesLoading: true,
      directoryCreateDto: ({ ...defaultDirectoryCreateDto }),
      directoryCreateDtoRules: {
        directoryId: [{ required: true, trigger: 'change', message: 'Müdürlük Numarası alanı zorunludur!' }],
        directoryName: [{ required: true, trigger: 'change', message: 'Müdürlük adı alanı zorunludur!' }]
      },
      directoryUpdateDtoRules: {
        directoryId: [{ required: true, trigger: 'change', message: 'Müdürlük Numarası alanı zorunludur!' }],
        directoryName: [{ required: true, trigger: 'change', message: 'Müdürlük adı alanı zorunludur!' }]
      },
      updatableDirectoryId: null,
      updatetableDateModified: null,
      directoryUpdateDto: ({ ...defaultDirectoryUpdateDto })
    }
  },
  created() {
    this.getAllDirectories()
  },
  methods: {
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
    async addDirectory() {
      return await new Promise((resolve, reject) => {
        addDirectory(this.directoryCreateDto).then(async() => {
          this.clearDirectoryCreateInputs()
          await this.getAllDirectories()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async updateDirectory() {
      return await new Promise((resolve, reject) => {
        updateDirectory(this.directoryUpdateDto).then(async() => {
          this.clearDirectoryUpdateInputs()
          await this.getAllDirectories()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async deleteDirectory(id) {
      return await new Promise((resolve, reject) => {
        deleteDirectory(id).then(async() => {
          await this.getAllDirectories()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    clearDirectoryCreateInputs() {
      this.directoryCreateDto = ({ ...defaultDirectoryCreateDto })
    },
    clearDirectoryUpdateInputs() {
      this.clearUpdatableDirectoryId()
      this.directoryUpdateDto = ({ ...defaultDirectoryUpdateDto })
    },
    setUpdatableDirectoryId(directoryId, dateModified) {
      this.updatableDirectoryId = directoryId
      this.updatetableDateModified = dateModified
      defaultDirectoryUpdateDto.id = this.updatableDirectoryId
      defaultDirectoryUpdateDto.dateModified = this.updatetableDateModified
      this.directoryUpdateDto = ({ ...defaultDirectoryUpdateDto })
    },
    clearUpdatableDirectoryId() {
      this.setUpdatableDirectoryId(0)
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
