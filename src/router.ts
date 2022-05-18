import Cart from '@/page/Cart'
import {
  Tacos,
  Bus
} from '@/components/SubRouter/tacos'
import StyledComponentTest from '@/components/StyledComponents/test'
import EmotionTest from '@/components/Emotion/index'
import Counter from '@/page/Counter'

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