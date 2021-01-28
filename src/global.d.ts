declare module "*.svg" {
  const __url: string;
  export default __url;
  export const ReactComponent: React.FC<React.HTMLAttributes<SVGElement>>;
}
