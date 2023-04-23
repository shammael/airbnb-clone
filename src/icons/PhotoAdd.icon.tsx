import * as React from "react";
import { SVGProps } from "react";
const PhotoAddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={512}
    height={512}
    style={{
      //@ts-ignore
      enableBackground: "new 0 0 512 512",
    }}
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      d="M4.934 27.207h15.132a1 1 0 1 0 0-2H4.934A.935.935 0 0 1 4 24.272V10.291c0-.516.419-.935.934-.935h4.351c1.293 0 2.45-.867 2.818-2.115l.182-.633a.942.942 0 0 1 .897-.674h4.776a.94.94 0 0 1 .896.67l.186.643c.267.908.959 1.61 1.815 1.926v1.389a2.937 2.937 0 0 0 2.934 2.933h3.352v4.638a1 1 0 1 0 2 0V10.29a2.938 2.938 0 0 0-2.934-2.935h-4.352a.94.94 0 0 1-.895-.669l-.186-.643a2.953 2.953 0 0 0-2.816-2.11h-4.776a2.955 2.955 0 0 0-2.818 2.116l-.182.633a.942.942 0 0 1-.897.673h-4.35A2.938 2.938 0 0 0 2 10.291v13.981a2.938 2.938 0 0 0 2.934 2.935zm21.273-17.85c.515 0 .934.418.934.934v1.204h-3.352a.935.935 0 0 1-.934-.933V9.356z"
      data-original="#000000"
    />
    <path
      d="M15.57 11.415a5.841 5.841 0 0 0-5.835 5.835c0 3.217 2.618 5.834 5.835 5.834s5.835-2.617 5.835-5.834a5.841 5.841 0 0 0-5.835-5.835zm0 9.669c-2.114 0-3.835-1.72-3.835-3.834s1.72-3.835 3.835-3.835 3.835 1.72 3.835 3.835-1.72 3.834-3.835 3.834zM29 23.272h-1.793V21.48a1 1 0 1 0-2 0v1.793h-1.794a1 1 0 1 0 0 2h1.794v1.794a1 1 0 1 0 2 0v-1.794H29a1 1 0 1 0 0-2z"
      data-original="#000000"
    />
  </svg>
);
export default PhotoAddIcon;
