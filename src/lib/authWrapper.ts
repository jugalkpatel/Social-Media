import { ComponentType } from 'react';

// import type  { ComponentType} from "react";
export function authWrapper<P>(Component: ComponentType<P>) {
  return (props: P) => {};
}
