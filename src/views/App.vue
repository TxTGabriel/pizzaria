<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="link-topo">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/Pedido">Pedido</RouterLink>
        <RouterLink to="/Historico">Historico</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>



<style scoped>
header {
  background-color: #00a00d;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.5rem;
}

.link-topo {
  font-size: 16px;
  margin-top: 10px;
}

nav a {
  padding: 10px;
  text-decoration: none;
  color: rgb(230, 230, 230);
  border-bottom: 2px solid transparent;
}

nav a.router-link-exact-active {
  border-color: blue;
}

@media (min-width: 768px) {
  .logo {
    font-size: 2rem;
  }

  .link-topo {
    margin-top: 0;
    display: flex;
    justify-content: center;
  }

  nav a {
    margin: 0 10px;
  }
}
</style>
