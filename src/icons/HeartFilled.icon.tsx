import * as React from "react";
import { SVGProps } from "react";
const HeartFilledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="1em"
    height="1em"
    style={{
      //@ts-ignore
      enableBackground: "new 0 0 512 512",
    }}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      // fill="#f44336"
      d="M11.466 22.776a.746.746 0 0 0 1.068 0l9.594-9.721C26.129 9.002 23.286 2 17.596 2 14.179 2 12.611 4.511 12 4.98 11.386 4.509 9.828 2 6.404 2 .732 2-2.146 8.984 1.873 13.055z"
      data-original="#f44336"
    />
  </svg>
);
export default HeartFilledIcon;
