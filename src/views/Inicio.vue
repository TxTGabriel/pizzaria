<template>
  <div class="about">
    <h1 class="titulo">Bem vindo a pizzaria Leads2b</h1>
    <img src="https://veja.abril.com.br/wp-content/uploads/2018/08/comer-e-beber-ctb-restaurante-avenida-paulista-pizzeria-0010.jpg?quality=90&strip=info&w=720&h=440&crop=1" alt="DaeloPizzaria" class="imagem" />
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.titulo {
  font-size: 3rem;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
}

.imagem {
  max-width: 100%;
  height: center;
}

@media (min-width: 1024px) {
  .titulo {
    font-size: 4rem;
  }
  .imagem {
    width: 1000%; 
    background: fixed;
  }
}
</style>