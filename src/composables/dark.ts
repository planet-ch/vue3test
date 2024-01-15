import { useDark, useToggle } from "@vueuse/core";

export const isDark = useDark();
console.log(isDark, 'isDark');
export const toggleDark = useToggle(isDark);
