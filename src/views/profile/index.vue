<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="6" :xs="24">
        <user-card :employee-update-me-dto="employeeUpdateMeDto" />
      </el-col>

      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Hesap" name="account">
              <account :employee-update-me-dto="employeeUpdateMeDto" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import UserCard from './components/UserCard'
import Account from './components/Account'

import store from '../../store'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      employeeUpdateMeDto: {
        tcIdentity: store.getters.me.tcIdentity,
        name: store.getters.me.name,
        phone: store.getters.me.phone,
        phone2: store.getters.me.phone2,
        plateNumber: store.getters.me.plateNumber,
        serialNumber: store.getters.me.serialNumber,
        currentPassword: null,
        newPassword: null
      },
      activeTab: 'account'
    }
  }
}
</script>
