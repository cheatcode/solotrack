import { toast } from "./mod.esm.min.js";

const toasts = (() => {
  if (typeof window !== 'undefined') {
    return toast({ position: 'top-right' });
  }

  return {};
})();

export default toasts;
