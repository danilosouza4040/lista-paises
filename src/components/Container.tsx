import { ReactNode } from "react";
import { twMerge } from 'tailwind-merge'

interface GridContainerProps{
  children: ReactNode
  className?: string
}

export function Container({children, className}: GridContainerProps){
  const defaultClass = "flex flex-col lg:flex-row items-center w-full max-w-[1246px] px-[15px] mx-auto"
  const combinedClases = twMerge(defaultClass, className)
  return(
    <div className={combinedClases}>
      {children}
    </div>
  );
}