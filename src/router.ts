import Cart from './cart'
import {
  Tacos,
  Bus
} from '@components/subRouter/tacos'
import StyledComponentTest from '@components/styledComponents/test'
import EmotionTest from '@components/emotion/index'
import Counter from '@/counter'

// title用于目录生成
export const routes = [
  {
    path: "/cart",
    component: Cart,
    title: 'cart购物车'
  },
  {
    title: '子路由',
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
    title: 'StyledComponent',
    path: "/stylecomp",
    component: StyledComponentTest
  },
  {
    title: 'emotion',
    path: '/emotion',
    component: EmotionTest
  },
  {
    title: 'redux',
    path: '/redux',
    component: Counter
  }
];