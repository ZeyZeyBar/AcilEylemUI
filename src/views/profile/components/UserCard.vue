<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>Hakkımda</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="avatar || defaultAvatar" :height="'100px'" :width="'100px'" :hoverable="false" />
      </div>
      <div class="box-center">
        <div class="user-name text-center" v-text="employeeUpdateMeDto.name" />
      </div>
    </div>

    <div class="user-bio">
      <div class="user-identity-knowledge user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="user" /><span>Kimlik Bilgileri</span></div>
        <div class="user-bio-section-body">
          <el-row :gutter="20" style="margin-top: 15px;">
            <el-col :span="12">
              <span style="font-weight: bold;">Sicil : </span>
              <span class="text-muted" v-text="me.username" />
            </el-col>
            <el-col :span="12">
              <div style="float: right;">
                <span style="font-weight: bold;">TC Kimlik No : </span>
                <span class="text-muted" v-text="employeeUpdateMeDto.tcIdentity" />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 5px;">
            <el-col :span="12">
              <span style="font-weight: bold;">Cihaz Demirbaş Numarası : </span>
              <span class="text-muted" v-text="employeeUpdateMeDto.plateNumber" />
            </el-col>
            <el-col :span="12">
              <div style="float: right;">
                <span style="font-weight: bold;">Yazıcı Demirbaş Numarası : </span>
                <span class="text-muted" v-text="employeeUpdateMeDto.serialNumber" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="user-contact-knowledge user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="message" /><span>İletişim Bilgileri</span></div>
        <div class="user-bio-section-body">
          <el-row :gutter="20" style="margin-top: 15px;">
            <el-col :span="12">
              <span style="font-weight: bold;">Cihaz Telefon Numarası : </span>
              <span class="text-muted" v-text="employeeUpdateMeDto.phone" />
            </el-col>
            <el-col :span="12">
              <div style="float: right;">
                <span style="font-weight: bold;">Kişisel Telefon Numarası : </span>
                <span v-if="employeeUpdateMeDto.phone2" class="text-muted" v-text="employeeUpdateMeDto.phone2" />
                <i v-else class="el-icon-minus el-icon-small-bold el-icon-minus-orange" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="user-role-knowledge user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>Rol Bilgileri</span></div>
        <div class="user-bio-section-body">
          <el-row :gutter="20" style="margin-top: 15px;">
            <el-col :span="12">
              <span style="font-weight: bold;">Bölge : </span>
              <span v-if="computedEmployeeRegionName" class="text-muted" v-text="computedEmployeeRegionName" />
              <i v-else class="el-icon-minus el-icon-small-bold el-icon-minus-orange" />
            </el-col>
            <el-col :span="12">
              <div style="float: right;">
                <span style="font-weight: bold;">Çalışan Türü : </span>
                <span v-if="computedEmployeeTypeName" class="text-muted" v-text="computedEmployeeTypeName" />
                <i v-else class="el-icon-minus el-icon-small-bold el-icon-minus-orange" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="user-token-knowledge user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="international" /><span>Erişim Jetonu Bilgileri</span></div>
        <div class="user-bio-section-body">
          <el-row :gutter="20" style="margin-top: 15px;">
            <el-col :span="12">
              <span style="font-weight: bold;">İzleyen : </span>
              <span class="text-muted" v-text="tokenPayload.aud" />
            </el-col>
            <el-col :span="12">
              <div style="float: right;">
                <span style="font-weight: bold;">Yayınlayan : </span>
                <span class="text-muted" v-text="tokenPayload.iss" />
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 5px;">
            <el-col :span="12">
              <span style="font-weight: bold;">Oluşturma Tarihi : </span>
              <span class="text-muted" v-text="new Date(tokenPayload.nbf * 1000).toLocaleString()" />
            </el-col>
            <el-col :span="12">
              <div style="float: right;">
                <span style="font-weight: bold;">Son Geçerlilik Tarihi : </span>
                <span class="text-muted" v-text="new Date(tokenPayload.exp * 1000).toLocaleString()" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

import { mapGetters } from 'vuex'

import checkPermission from '@/utils/permission'

import defaultAvatar from '@/assets/avatar.png'

import {
  getAll as getAllEmployeeTypes
} from '@/api/employeeTypes'

import {
  getAllByActive as getAllRegionsByActive
} from '@/api/regions'

export default {
  components: { PanThumb },
  props: {
    employeeUpdateMeDto: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      allEmployeeTypes: [],
      allActiveRegions: [],
      defaultAvatar
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      'me',
      'token',
      'tokenPayload'
    ]),
    computedEmployeeTypeName() {
      return this.allEmployeeTypes
        .find(employeeType =>
          employeeType.id ===
            this.me.employeeTypeId
        )?.name
    },
    computedEmployeeRegionName() {
      return this.allActiveRegions
        .find(region =>
          region.id ===
            this.me.regionId
        )?.name
    }
  },
  created() {
    if (checkPermission(['employeeTypes.getall'])) this.getAllEmployeeTypes()
    if (checkPermission(['regions.getallbyactive'])) this.getAllActiveRegions()
  },
  methods: {
    checkPermission,
    async getAllEmployeeTypes() {
      this.allEmployeeTypesLoading = true
      return await new Promise((resolve, reject) => {
        getAllEmployeeTypes().then(response => {
          const { data } = response
          this.allEmployeeTypes = data
          this.allEmployeeTypesLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    async getAllActiveRegions() {
      this.allActiveRegionsLoading = true
      return await new Promise((resolve, reject) => {
        getAllRegionsByActive(
          true
        ).then(response => {
          const { data } = response
          this.allActiveRegions = data
          this.allActiveRegionsLoading = false
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>

<style scoped>

  .el-icon-small-bold {
    font-weight: bold;
    font-size: small;
  }

  .el-icon-minus-orange {
    color: orange;
  }

</style>
