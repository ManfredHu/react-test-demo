import Cart from './cart'
import {
  Tacos,
  Bus
} from '@components/subRouter/tacos'
import StyledComponentTest from '@components/styledComponents/test'
export const routes = [
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/tacos",
    component: Tacos,
    routes: [
      {
        path: "/tacos/bus",
        component: Bus
      },
      {
        path: "/tacos/cart",
        component: Cart
      }
    ]
  },
  {
    path: "/stylecomp",
    component: StyledComponentTest
  }
];