declare module "html-to-text" {
  export function convert(html: string, options?: { worpwrap: number }): string;
}
