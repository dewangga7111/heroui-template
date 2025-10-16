import { Input, extendVariants } from "@heroui/react";

const AppTextInput = extendVariants(Input, {
  defaultVariants: {
    labelPlacement: "outside-top",
  },
});

export default AppTextInput;