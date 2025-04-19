import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import { category } from "./TagOption";
import BasicInformation from "./BasicInformation";
import Priceing from "./Priceing";
import Images from "./Images";
import Tags from "./Tags";
import SaveButton from "../../../utils/Button/SaveButton";
import makeAnimated from "react-select/animated";
import { addProduct } from "../../../Services/apiServices";
import { toast } from "react-toastify";
import "./Admin.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const animatedComponents = makeAnimated();
const AddProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [englishTag, setEnglishTags] = useState([]);
  const [banglaTags, setBanglaTags] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [description, setDescription] = useState("");
  const [productCare, setProductCare] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [priority, setPriority] = useState(null);
  const [badge, setBadge] = useState("");

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const [selectedCategory, setselectedCategory] = useState([]);

  const [loader, setLoader] = useState(false);
  const productNameRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const handleMultiselect = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);

    setselectedCategory(values);
  };

  const handleImage = async (event) => {
    const url = `https://api.imgbb.com/1/upload?key=3d10492adfa8561b3f13d1051a54448e`;

    const imageFormData = new FormData();
    imageFormData.append("image", event.target.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.upload.addEventListener("progress", function (event) {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    });
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const imgData = JSON.parse(xhr.responseText);
        setImageUrl(imgData.data.url);
      }
    };
    xhr.send(imageFormData);
  };

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const payload = {
        product_title: data.producTtitle,
        product_price: data.Product_Price,
        product_discount: data.Discount,
        product_info: {
          product_details: html,
          product_care: productCare,
          priority: Number(priority),
        },
        product_images: imageUrl,
        product_category: selectedCategory,
        product_tags_english: englishTag,
        product_tags_bangla: banglaTags,
      };
      console.log(payload);

      const response = await addProduct(payload);
      if (response.data.success) {
        reset();
        setImageUrl(null);
        setEditorState("");
        setLoader(false);
        toast.success("Product Added");
        setPriority(null);
        setBanglaTags([]);
        setEnglishTags([]);
        setselectedCategory([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    reset();
    setImageUrl(null);
    setDescription("");
    setLoader(false);

    setBanglaTags([]);
    setEnglishTags([]);
    setselectedCategory([]);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-[1.2rem] font-medium">Add Product</h1>
      </div>

      <form id="addProduct" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div>
          <div className="grid gird-cols-1 md:grid-cols-5 gap-0 md:gap-6">
            <div className="col-span-3 ">
              <BasicInformation
                onEditorStateChange={onEditorStateChange}
                editorState={editorState}
                register={register}
                setDescription={setDescription}
                description={description}
              />
              <Priceing register={register} />
              <Images
                uploadProgress={uploadProgress}
                imageUrl={imageUrl}
                handleImage={handleImage}
                setImageUrl={setImageUrl}
              />

              <div className="product-care bg-white border-primary rounded-[10px] p-5 mt-6">
                <h1 className="text-[1.125rem] font-medium mb-5">
                  Product Care
                </h1>
                <textarea
                  value={productCare}
                  onChange={(e) => setProductCare(e.target.value)}
                  className="border-input border text-[15px] font-medium w-full form-control pl-1"
                  name=""
                  id=""
                  cols="30"
                  rows="7"
                ></textarea>
              </div>
            </div>

            <div className="col-span-2 ">
              <Tags
                setBanglaTags={setBanglaTags}
                englishTag={englishTag}
                setEnglishTags={setEnglishTags}
                banglaTags={banglaTags}
              />
              <div className="bg-white border-primary rounded-[10px] p-5 mt-6">
                <h1 className="text-[1.125rem] font-medium mb-5 ">Category</h1>

                <div className="text-[15px] font-medium">
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    value={selectedCategory.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                    onChange={handleMultiselect}
                    options={category}
                    isMulti
                  />
                </div>

                <div className="mt-4">
                  <h1 className="text-[1.125rem] font-medium mb-5 ">
                    Priority
                  </h1>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((option) => (
                      <input
                        key={option}
                        type="button"
                        value={option}
                        onClick={() => setPriority(option)}
                        className={`border border-input rounded-md cursor-pointer font-medium focus:border-primary-green focus:outline-none px-3 py-2 ${
                          priority === option
                            ? "bg-primary-green text-white"
                            : "bg-white"
                        } transition-colors duration-200`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <div>
                  <SaveButton
                    disabled={loader}
                    loading={loader}
                    tittle={"Save Product"}
                    type={"submit"}
                    form={"addProduct"}
                    background={"#6bb42f"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
