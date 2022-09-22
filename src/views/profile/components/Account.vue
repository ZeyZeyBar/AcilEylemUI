<template>
  <el-form :model="employeeUpdateMeDto" :rules="employeeUpdateMeDtoRules">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="TC Kimlik Numarası*" prop="tcIdentity">
              <el-input v-model.trim="employeeUpdateMeDto.tcIdentity" placeholder="TC Kimlik Numarası*" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Tam isim*" prop="name">
              <el-input v-model.trim="employeeUpdateMeDto.name" placeholder="Tam isim*" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Cihaz Telefon Numarası*" prop="phone">
              <el-input v-model.trim="employeeUpdateMeDto.phone" placeholder="Cihaz Telefon Numarası*" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Kişisel Telefon Numarası" prop="phone2">
              <el-input v-model.trim="employeeUpdateMeDto.phone2" placeholder="Kişisel Telefon Numarası" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Cihaz Demirbaş Numarası*" prop="plateNumber">
              <el-input v-model.trim="employeeUpdateMeDto.plateNumber" placeholder="Cihaz Demirbaş Numarası*" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Yazıcı Demirbaş Numarası*" prop="serialNumber">
              <el-input v-model.trim="employeeUpdateMeDto.serialNumber" placeholder="Yazıcı Demirbaş Numarası*" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Mevcut Şifre*" prop="currentPassword">
              <el-input v-model.trim="employeeUpdateMeDto.currentPassword" placeholder="Mevcut Şifre*" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Yeni Şifre" prop="newPassword">
              <el-input v-model.trim="employeeUpdateMeDto.newPassword" placeholder="Yeni Şifre" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="updateMe">Güncelle</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import store from '../../../store'

import {
  updateMe
} from '@/api/employees'

export default {
  props: {
    employeeUpdateMeDto: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      employeeUpdateMeDtoRules: {}
    }
  },
  methods: {
    async updateMe() {
      return await new Promise((resolve, reject) => {
        updateMe(
          this.employeeUpdateMeDto
        ).then(async() => {
          await store.dispatch('employee/getMe')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>
