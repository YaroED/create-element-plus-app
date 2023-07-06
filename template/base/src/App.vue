<template>
  <header>
    <img alt="element-plus logo" class="logo" src="@/assets/logo.svg" width="120" height="120" />
    <div class="wrapper">
      <HelloWorld msg="create-element-plus-app" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <el-skeleton :rows="3" animated />
      <el-button class="btn" type="primary" @click="handleClick">我是 ElButton</el-button>
    </div>
  </header>

  <RouterView />
</template>
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ElButton, ElSkeleton, ElMessageBox } from 'element-plus'
import { login } from '@/api/user'

const handleClick = async () => {
  try {
    const rsp = await login()
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  } catch (error) {}
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.btn {
  margin-top: 1rem;
}
</style>
