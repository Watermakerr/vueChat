<template>
  <div>
    <form>
      <input type="text" name="username" id="" v:model="name" />
      <input type="password" name="password" id="" v:model="password" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const name = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      name: name.value,
      password: password.value
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped></style>
