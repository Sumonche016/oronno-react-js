import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct, updateProduct } from "../../../Services/apiServices";
import { useForm } from "react-hook-form";
import BasicInformation from "./BasicInformation";
import Priceing from "./Priceing";
import Images from "./Images";
import Tags from "./Tags";
import Select from "react-select";
const animatedComponents = makeAnimated();
import makeAnimated from "react-select/animated";
import { category } from "./TagOption";
import Loading from "../../SharedComponent/Loading";
import SaveButton from "../../../utils/Button/SaveButton";
import { toast } from "react-toastify";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const EditProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { productId } = useParams();

  const [loader, setLoader] = useState({
    fetch: false,
    submit: false,
  });
  const { register, handleSubmit, reset } = useForm();
  const [englishTag, setEnglishTags] = useState([]);
  const [banglaTags, setBanglaTags] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  const [priority, setPriority] = useState(null)

  const [description, setDescription] = useState("");
  const [productCare, setProductCare] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedCategory, setselectedCategory] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

  };
  useEffect(() => {
    setLoader({ ...loader, fetch: true });
    async function fetchProducts() {
      const response = await getSingleProduct(productId);
      console.log(response);
      if (response.data.success) {
        console.log("singleproduct", response.data.data);
        setSingleProduct(response.data.data);

        reset({
          producTtitle: response.data.data.product_title,
          Product_Price: response.data.data.product_price,
          Discount: response.data.data.product_discount,
        });

        setDescription(response?.data?.data?.product_info.product_details);
        const contentBlock = htmlToDraft(response?.data?.data?.product_info.product_details);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState);

        }
        setProductCare(response.data.data.product_info.product_care);
        setBanglaTags(response.data.data.product_tags_bangla);
        setEnglishTags(response.data.data.product_tags_english);
        setselectedCategory(response.data.data.product_category);
        setImageUrl(response.data.data.product_images);
        setPriority(response.data.data.product_info.priority)

        setLoader({ ...loader, fetch: false });
      }
    }
    fetchProducts();
  }, []);

  console.log(singleProduct);

  const handleMultiselect = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);

    setselectedCategory(values);
  };

  const handleImage = async (event) => {
    const url = `https://api.imgbb.com/1/upload?key=4f903613e3812eb596d6cfe75fe8cfc8`;

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
      setLoader({ ...loader, submit: true });

      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

      const payload = {

        product_title: data.producTtitle,
        product_price: data.Product_Price,
        product_discount: data.Discount,
        product_info: {
          product_care: productCare,
          product_details: html,
          priority: Number(priority)
        },
        product_images: imageUrl,
        product_category: selectedCategory,
        product_tags_english: englishTag,
        product_tags_bangla: banglaTags,
      };
      console.log(payload);

      let response = await updateProduct(productId, payload);
      console.log(response);
      if (response.data.success) {
        toast.success("Product updated");

        setLoader({ ...loader, submit: false });
      }
    } catch (error) {
      setLoader({ ...loader, submit: false });
      toast.error("error");
      console.log(error);
    }
  };

  if (loader.fetch) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-[1.75rem] font-medium">Edit Product</h1>

        </div>

        <form
          id="editProduct"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4"
        >
          <div>
            <div className="grid gird-cols-1 md:grid-cols-5 gap-0 md:gap-6">
              <div className="col-span-3 ">
                <BasicInformation
                  onEditorStateChange={onEditorStateChange}
                  editorState={editorState}
                  register={register}
                  description={description}
                  setDescription={setDescription}
                />
                <Priceing register={register} />
                <Images
                  uploadProgress={uploadProgress}
                  imageUrl={imageUrl}
                  handleImage={handleImage}
                  setImageUrl={setImageUrl}
                />
                <div className="product-care bg-white shadow-light p-5 mt-6">
                  <h1 className="text-[1.125rem] font-medium mb-5 ">
                    Product Care
                  </h1>
                  <textarea
                    defaultValue={productCare}
                    onChange={(e) => setProductCare(e.target.value)}
                    className="border-input border  text-[15px] font-medium w-full form-control pl-1"
                    name=""
                    id=""
                    cols="30"
                    rows="7"
                  ></textarea>
                </div>
              </div>

              <div className="col-span-2 text-[15px] font-medium">
                <Tags
                  setBanglaTags={setBanglaTags}
                  englishTag={englishTag}
                  setEnglishTags={setEnglishTags}
                  banglaTags={banglaTags}
                />
                <div className="bg-white shadow-light p-5 mt-6">
                  <h1 className="text-[1.125rem] font-medium mb-5 ">
                    Category
                  </h1>

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
                    <h1 className="text-[1.125rem] font-medium mb-5 ">Priority</h1>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3].map((option) => (
                        <input
                          key={option}
                          type="button"
                          value={option}
                          onClick={() => setPriority(option)}
                          className={`border border-input rounded-md cursor-pointer font-medium focus:border-primary-green focus:outline-none px-3 py-2 ${priority === option
                            ? "bg-primary-green text-white"
                            : "bg-white"
                            } transition-colors duration-200`}
                        />
                      ))}
                    </div>

                  </div>
                </div>
                <div className="flex mt-6">

                  <div>
                    <SaveButton
                      loading={loader.submit}
                      disabled={loader.submit}
                      tittle={"Update Product"}
                      type={"submit"}
                      form={"editProduct"}
                      background={"#6bb42f"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
