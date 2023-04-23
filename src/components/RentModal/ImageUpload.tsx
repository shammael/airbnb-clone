import Heading from "../Heading";
import ImageUpload from "../ImageUpload";
import CommonProps from "./interface/CommonProps";

type Property = "imageSrc";
interface Props extends CommonProps<Property, string> {}

const ImageUploadModal = ({ onChange, values }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add photos of your place"
        subtitle="Show the world how's your place looks like"
      />
      <ImageUpload
        onChange={(value) => onChange("imageSrc", value)}
        value={values.imageSrc}
      />
    </div>
  );
};

export default ImageUploadModal;
