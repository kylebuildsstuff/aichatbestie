// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: any;
      hasuraJwt: string;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // You can replace any with something more specific if you like
    onclickoutside?: (event: any) => any;
  }
}
