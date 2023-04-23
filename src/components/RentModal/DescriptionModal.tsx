import Heading from "../Heading";
import CommonProps from "./interface/CommonProps";
import { useState } from "react";
import RQ from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props extends CommonProps<"description", string> {
  isLoading: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [
      {
        list: "ordered",
      },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme,
    [{ align: [] }],

    ["clean"],
  ],
};

const DescriptionModal = ({ isLoading, onChange, values }: Props) => {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place"
        subtitle="Tell the world about your place"
      />
      <div>
        <label
          htmlFor="description"
          className="text-lg font-semibold text-neutral-500"
        >
          Description
        </label>
        <div className="rounded-[40px]">
          <RQ
            theme="snow"
            value={value}
            onChange={(e) => onChange("description", e)}
            className="h-[200px]"
            placeholder="Write the description of your place"
            modules={modules}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
