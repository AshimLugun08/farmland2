"use client";
import { useState } from "react";
import {useRouter} from "next/navigation";
// import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import {redirect} from "next/navigation";

const UploadForm = () => {
    const router = useRouter();
    const [price, setPrice] = useState("");
    const [product, setProduct] = useState("");
    const [contact_no, setContactNo] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const imgUpload = async () => {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "mystore");
        data.append("cloud_name", "du5ghkse1");

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/du5ghkse1/image/upload`, {
                method: "POST",
                body: data,
            });
            console.log(res)
            if (!res.ok) {
                throw new Error("Failed to upload image");
            }

            const res2 = await res.json();
            console.log(res2);
            return res2.url; // Return the response to handle it in handleSubmit
        } catch (error) {
            console.error("Image upload error:", error);
            setError(error.message);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast("Uploading",{
            position: "top-right",
            autoClose:5000,
            hideProgressBar: false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
            theme:"light",
        })
        const imgData = await imgUpload();
        console.log(imgData);

        if (!imgData) {
            return;
        }
        const res = await fetch(`api/uplode`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product,
                price,
                contact_no,
                description,
                img: imgData, // Assuming the URL is in imgData
            }),
        });

        const res2 = await res.json();

        if (!res2) {
            setError(res2.msg);
            toast("err occured",{
                position: "top-right",
                autoClose:5000,
                hideProgressBar: false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
                progress:undefined,
                theme:"light",
            })

        } else {

            console.log("Successfully uploaded");
            toast("uploaded succesfully",{
                position: "top-right",
                autoClose:5000,
                hideProgressBar: false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
                progress:undefined,
                theme:"light",
            })
            router.push("/myPost");
        }
    };

    return (
        <>
            <section className="bg-gray-300">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-600 md:text-2xl">
                                Upload Your <span className="text-green-900">Product</span>
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="productname" className="block mb-2 text-sm font-medium">Product
                                        Name</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setProduct(e.target.value)}
                                        name="productname"
                                        id="productname"
                                        placeholder="Enter product name"
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact" className="block mb-2 text-sm font-medium">Contact
                                        No</label>
                                    <input
                                        type="number"
                                        onChange={(e) => setContactNo(e.target.value)}
                                        name="contact"
                                        id="contact"
                                        placeholder="Enter your number"
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description"
                                           className="block mb-2 text-sm font-medium">Description</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                        name="description"
                                        id="description"
                                        placeholder="Enter description"
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price"
                                           className="block mb-2 text-sm font-medium">Price</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setPrice(e.target.value)}
                                        name="price"
                                        id="description"
                                        placeholder="Enter price"
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="img" className="block mb-2 text-sm font-medium">Upload Image</label>
                                    <input
                                        type="file"
                                        onChange={(e) => setImg(e.target.files[0])}
                                        name="img"
                                        id="img"
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                {error && <div className="text-red-600 text-sm">{error}</div>}
                                {success && <div className="text-green-500 text-sm">{success}</div>}
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                                    >
                                        Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UploadForm;
