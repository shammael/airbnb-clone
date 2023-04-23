import * as React from "react";
import { SVGProps } from "react";
const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={512}
    height={512}
    style={{
      // @ts-ignore
      enableBackground: "new 0 0 512 512",
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M2 6a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm1 5a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2z"
      data-original="#000000"
    />
  </svg>
);
export default MenuIcon;
