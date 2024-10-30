import './AddProduct.css'
import { assets } from '../../assets/assets'
import {useForm} from "react-hook-form";
import AuthService from "../../services/auth.service.js";
import {isEmpty} from "lodash/lang.js";
import pushToast from "../../helpers/sonnerToast.js";
import {useEffect, useState} from "react";
import ProductService from "../../services/product.service.js";
import {useNavigate} from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [imageUrls, setImageUrls] = useState([]);
    const [categories, setCategories] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: undefined,
        criteriaMode: "firstError",
    });

    const onSubmit = async (data) => {
        const res = await ProductService.createProduct({
            images: data.images.split(","),
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price,
            count: data.count
        });
        if (!isEmpty(res)) {
            pushToast("Add product successfully", "success");
            navigate('/products');
        }
    };

    const onError = (errors, e) => {
        Object.values(errors).forEach((error) => {
            pushToast(error.message, "error");
        });
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await ProductService.getCategories({});
            setCategories(res.docs);
        }
        fetchCategories();
    }, []);

    const onChangeImageUrls = (e) => {
        const urls = e.target.value.split(",").map(item => item.trim());
        setImageUrls(urls);
    }

  return (
    <div className='add'>
        <form className='flex-col' onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="add-product-name flex-col">
                <p>Upload Image URLs</p>
                <input
                  type="text"
                  name='images'
                  placeholder='Type here, separated by comma'
                  {...register("images", {
                      required: "Product images are required",
                      onChange: onChangeImageUrls
                  })}
                />
            </div>
            <div className="add-product-name flex-col">
                <div className="preview">
                    {imageUrls.map((item, index) => {
                        return (
                          <img key={index} src={item} alt=""/>
                        )
                    })}
                </div>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input
                  type="text"
                  name='title'
                  placeholder='Type here'
                  {...register("title", {required: "Product name is required"})}
                />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea
                  name="description"
                  rows="6"
                  placeholder='Type here'
                  {...register("description", {required: "Product description is required"})}
                >

                </textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select name="category" {...register("category", {required: "Product category is required"})}>
                        <option value="">Select category</option>
                        {categories.map((item, index) => {
                            return (
                              <option key={item._id} value={item._id}>{item.title}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price (Vnd)</p>
                    <input
                      type="Number"
                      name="price"
                      defaultValue={0}
                      {...register("price", {required: "Product price is required"})}
                    />
                </div>
                <div className="flex-col">
                    <p>Product quantity</p>
                    <input
                      type="Number"
                      name="count"
                      defaultValue={1}
                      {...register("count", {required: "Product quantity is required"})}
                    />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>

    </div>
  )
}

export default AddProduct
