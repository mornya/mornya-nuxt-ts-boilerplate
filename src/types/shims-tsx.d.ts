/*
 * Composition API 적용을 위한 타입 추가
 */
import { VNode } from 'vue';
import { ComponentRenderProxy } from '@vue/composition-api';

declare global {
  namespace JSX {
    interface Element extends VNode {}

    interface ElementClass extends ComponentRenderProxy<unknown, unknown, unknown> {}

    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }

    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
