/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type HookAdapterProps<THook extends (...args: any) => any> = {
  hook: THook;
  children: (hookResult: ReturnType<THook>) => ReactNode;
} & (Parameters<THook> extends [] ? { parameters?: never } : { parameters: Parameters<THook> });

export const HookAdapter = <THook extends (...args: any) => any>({
  hook,
  parameters,
  children
}: HookAdapterProps<THook>) => {
  const hookResult = hook(...(parameters ?? []));
  return children(hookResult);
};
