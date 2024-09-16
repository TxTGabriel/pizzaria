import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Inicio from '../../views/Inicio.vue'

describe('Inicio', () => {
  it('renders properly', () => {
    const wrapper = mount
    (Inicio,{props:
          {msg: 'Bem vindo a pizzaria Leads2b'}
        }
    )
    expect(wrapper.text()).toBe('Bem vindo a pizzaria Leads2b')
  })
})
