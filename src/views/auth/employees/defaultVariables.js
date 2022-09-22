export const defaultEmployeeCreateDto = {
  username: undefined,
  name: '',
  password: null,
  directory_Id: null,
  chief_Id: null,
  email: '',
  gsm: '',
  home_Phone: '',
  work_Phone: '',
  fax_Phone: '',
  radio_Code: '',
  work_Address: ''
}

export const defaultEmployeeUpdateDto = Object
  .assign({
    newPassword: null,
    isActive: false
  }, defaultEmployeeCreateDto)

export const defaultEmployeeFilterDto = {
  name: null,
  directory_Id: null,
  chief_Id: null,
  isActive: null
}

export const employeeTableColumns = {
  username: { label: 'Kullanıcı Adı', shown: true, width: 200 },
  name: { label: 'Tam isim', shown: true, width: 200 },
  email: { label: 'E-Posta Adresi', shown: true, width: 200 },
  gsm: { label: 'Kişisel Telefon Numarası', shown: true, width: 200 },
  home_Phone: { label: 'Ev Telefon Numarası', shown: true, width: 200 },
  work_Phone: { label: 'İş Telefon Numarası', shown: true, width: 200 },
  fax_Phone: { label: 'Faks Telefon Numarası', shown: true, width: 200 },
  radio_Code: { label: 'Telsiz Kod Numarası', shown: true, width: 200 },
  directory_Id: { label: 'Müdürlük', shown: true, width: 200, updateMode: 'select', stateName: 'allActiveDirectories' },
  chief_Id: { label: 'Şeflik', shown: true, width: 200, updateMode: 'select', stateName: 'allActiveChiefs' },
  work_Adress: { label: 'İş Adresi', shown: true, width: 200 },
  newPassword: { label: 'Yeni Parola', shown: true, shownInUpdateMode: true, width: 200 },
  isActive: { label: 'Aktiflik', shown: true, width: 200, updateMode: 'check' }
}
