import * as React from 'react'
import { VueInReact } from 'vuera'
import HelloVue from './hello.vue'

export interface HelloProps {
  name?: string;
}

export const Hello: React.SFC<HelloProps> = VueInReact(HelloVue)
