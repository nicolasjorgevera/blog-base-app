import { Button } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";

export interface ButtonAppProps {
  text: string;
  onClick: ( params: any ) => void;
}


const ButtonApp = ( {text, onClick } : ButtonAppProps) => {
  return (
    <NextUIProvider>
      <Button onPress={onClick}>{text}</Button>
    </NextUIProvider>
  )
}

export default ButtonApp;