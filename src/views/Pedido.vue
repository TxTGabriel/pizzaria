<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Sabor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.name }}</td>
          <td>
            <div class="dropdown">
              <button @click="toggleDropdown(index)" class="dropdown-button">
                {{ selectedOptionIndex === index ? selectedOption : 'Escolher Sabor' }}
              </button>
              <div v-if="isDropdownOpen === index" class="dropdown-menu">
                <button
                  v-for="(flavor, idx) in flavors"
                  :key="idx"
                  @click="selectFlavor(flavor, index)"
                  class="dropdown-item"
                >
                  {{ flavor }}
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="save-container">
      <button 
        v-if="selectedOptionIndex !== null && selectedFlavor !== null" 
        @click="emitSaveOrder"
        class="save-button"
      >
        Salvar Pedido
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import dayjs from 'dayjs';

const store = useStore();
const router = useRouter();





const items = ref([
  { name: 'Pizza Grande' },
  { name: 'Pizza Média' },
  { name: 'Pizza Pequena' }
]);

const flavors = ref([
  'Margherita',
  'Pepperoni',
  'Quatro Queijos',
  'Frango com Catupiry',
  'Vegetariana'
]);




const isDropdownOpen = ref(null);
const selectedOptionIndex = ref(null);
const selectedOption = ref(null);
const selectedFlavor = ref(null);

const toggleDropdown = (index) => {
  isDropdownOpen.value = isDropdownOpen.value === index ? null : index;
};

const selectFlavor = (flavor, index) => {
  selectedOption.value = flavor;
  selectedFlavor.value = flavor;
  selectedOptionIndex.value = index;
  isDropdownOpen.value = null;
};

const emitSaveOrder = () => 
{
  try
  {
  if (selectedOptionIndex.value === null || selectedFlavor.value === null) {
    alert('Por favor, selecione um sabor e um item.');
    return;
  }

  const size = items.value[selectedOptionIndex.value].name;
  const created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');      

  const order = { size, flavor: selectedFlavor.value, created_at};
  
  store.dispatch('saveOrder', order)
    .then(() => {
      console.log('Pedido salvo:', order);
      router.push({ name: 'Historico' });
    })
  } catch (error)
  {
    this.erro = error.message;
  }
};

</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 200px;
  margin-left: 550px;
}

table {
  width: 50%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
}

.dropdown-button:hover {
  background-color: #45a049;
}

.dropdown-menu {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  width: 250%;
  border: 1px solid #ddd;
  background-color: white;
  z-index: 1;
}

.dropdown-item {
  padding: 10px;
  border: center;
  text-align: center;
  background-color: #45a049;
  cursor: pointer;
  width: 90%;
}

.dropdown-item:hover {
  background-color: #205323;
}

.save-button {
  background-color: #008CBA;
  color: white;
}

.save-button:hover {
  background-color: #007bb5;
}

.save-container {
  margin-top: 20px;
}
</style>
