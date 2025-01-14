// store/userData.ts
import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    sex: 'Maschio',
    name: '',
    age: 25
  }),
  actions: {
    setUserData(sex: string, name: string, age: number) {
      this.sex = sex
      this.name = name
      this.age = age
    }
  }
})
