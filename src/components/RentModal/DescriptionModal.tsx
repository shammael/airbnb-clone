import Heading from "../Heading";
import CommonProps from "./interface/CommonProps";
import { useState } from "react";
import RQ from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props
  extends CommonProps<"presentation", { title: string; description: string }> {
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
  const [value, setValue] = useState<{ description: string; title: string }>({
    description: values.presentation.description,
    title: values.presentation.title,
  });
  return (
    <div className="flex flex-col gap-2 mb-10">
      <Heading
        title="How would you describe your place"
        subtitle="Tell the world about your place"
      />
      <div className="flex flex-col">
        <label className="text-lg font-semibold text-neutral-500">Title</label>
        <input
          className="px-4 py-2 border-[1px] border-neutral-300 outline-neutral-400 rounded-md"
          placeholder="Ex: Villa Santa"
          type="text"
          onChange={(e) => {
            onChange("presentation", {
              description: value.description,
              title: e.target.value,
            });
            setValue({
              ...value,
              title: e.target.value,
            });
          }}
          value={value.title}
        />
      </div>
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
            value={value.description}
            onChange={(e) => {
              setValue({
                ...value,
                description: e,
              });
              onChange("presentation", {
                ...value,
                description: e,
              });
            }}
            className="h-[200px]"
            placeholder="Write the description of your place"
            modules={modules}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default DescriptionModal;
