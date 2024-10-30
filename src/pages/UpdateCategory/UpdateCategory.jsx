import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import CategoriesService from "../../services/categories.service.js";
import {isEmpty} from "lodash/lang.js";
import pushToast from "../../helpers/sonnerToast.js";

export default function UpdateCategory() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [category, setCategory] = useState(null);
  const [thumbnailUrl, setThumbnail] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: undefined,
    criteriaMode: "firstError",
  });

  const onSubmit = async (data) => {
    const res = await CategoriesService.updateCategory({
      id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
    });
    if (!isEmpty(res)) {
      pushToast("Update categories successfully", "success");
      navigate('/categories');
    }
  };

  const onError = (errors, e) => {
    Object.values(errors).forEach((error) => {
      pushToast(error.message, "error");
    });
  }

  const onChangeThumbnailUrl = (e) => {
    setThumbnail(e.target?.value?.trim());
  }

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await CategoriesService.getCategory(id);
      setCategory(res);
      setValue('title', res.title);
      setValue('description', res.description);
      setValue('thumbnail', res.thumbnail);
    }
    fetchCategory();
  }, []);

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="add-product-name flex-col">
          <p>Upload Thumbnail URL</p>
          <input
            type="text"
            name='images'
            placeholder='Type here, separated by comma'
            {...register("thumbnail", {
              required: "Category thumbnail are required",
              onChange: onChangeThumbnailUrl
            })}
            defaultValue={category?.thumbnail}
          />
        </div>
        <div className="add-product-name flex-col">
          <div className="preview">
            <img src={thumbnailUrl} alt=""/>
          </div>
        </div>
        <div className="add-product-name flex-col">
          <p>Category name</p>
          <input
            type="text"
            name='title'
            placeholder='Type here'
            {...register("title", {required: "Category name is required"})}
            defaultValue={category?.title}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Category description</p>
          <textarea
            name="description"
            rows="6"
            placeholder='Type here'
            {...register("description", {required: "Cateogry description is required"})}
            defaultValue={category?.description}
          >

                </textarea>
        </div>
        <button type='submit' className='add-btn'>UPDATE</button>
      </form>

    </div>
  )
}