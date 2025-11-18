import { useState, useEffect } from 'react';
import productApi from '../../api/productApi';
import categoryApi from '../../api/categoryApi';
import brandApi from '../../api/brandApi';
import Notification from '../common/Notification';

// --- Helper Component: Input Field ---
const FormInput = ({ label, name, type = 'text', value, onChange, isFullWidth = false }) => (
    <div className={isFullWidth ? 'col-span-2' : 'col-span-1'}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {<span className="text-red-500">*</span>}
        </label>
        {type === 'textarea' ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
        )}
    </div>
);

export default function AddProduct({ onClose, onChange }) {
    // State cho các trường đơn giản và file ảnh
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        origin: '',
        target_audience: '',
        water_resistance: '',
        movement_type: '',
        glass_material: '',
        strap_material: '',
        dial_type: '',
        thickness: 0,
        power_reserve: '',
        features: '',
        flashSale: false,
        flashSaleEnd: '',
        category: '', // ID
        brand: '',    // ID
    });
    const [details, setDetails] = useState([{
        currentPrice: 0,
        flashSalePrice: 0,
        originalPrice: 0,
        color: '',
        colorCode: '',
        quantity: 0,
        stock: 0,
        sold: 0
    }]);
    const [images, setImages] = useState([]); // File list for upload
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    // --- 1. Tải Dữ liệu Tham chiếu (Categories & Brands) ---
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await categoryApi.getCategories();
                setCategories(response.categories);
            } catch (err) {
                console.log(err.response?.data?.message || err.message);
            }
        }
        const getBrands = async () => {
            try {
                const response = await brandApi.getBrands();
                setBrands(response.brands);
            } catch (err) {
            }
        }
        getCategories();
        getBrands();

    }, []);

    // --- 2. Xử lý Thay đổi Input ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Tự động tạo slug khi name thay đổi (Tối ưu: debounce/throttle)
        if (name === 'name') {
            // Hàm tạo slug đơn giản (chuyển tiếng Việt có dấu thành không dấu, thay khoảng trắng bằng gạch ngang)
            const slugValue = value.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Xóa dấu
                .trim().replace(/\s+/g, '-'); // Thay khoảng trắng bằng '-'
            setFormData(prev => ({ ...prev, slug: slugValue }));
        }
    };

    // --- 3. Xử lý Thay đổi chi tiết sản phẩm (detail array) ---
    const handleDetailChange = (index, e) => {
        const { name, value, type } = e.target;
        const newDetails = details.map((item, i) => {
            if (index === i) {
                return {
                    ...item,
                    [name]: type === 'number' ? parseFloat(value) || 0 : value
                };
            }
            return item;
        });
        setDetails(newDetails);
    };

    const handleAddDetail = () => {
        setDetails([...details, {
            currentPrice: 0,
            flashSalePrice: 0,
            originalPrice: 0,
            color: '',
            colorCode: '',
            quantity: 0,
            stock: 0,
            sold: 0
        }]);
    };

    const handleRemoveDetail = (index) => {
        const newDetails = details.filter((_, i) => i !== index);
        setDetails(newDetails);
    };

    // --- 4. Xử lý Tải ảnh lên ---
    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    // --- 5. Xử lý Submit Form ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Chuẩn bị dữ liệu tải lên (multipart/form-data)
            const data = new FormData();

            // Thêm tất cả các trường đơn giản
            for (const key in formData) {
                if (key === 'flashSaleEnd' && !formData[key]) continue; // Bỏ qua nếu không có FlashSaleEnd
                data.append(key, formData[key]);
            }
            // Thêm mảng details (cần chuyển sang chuỗi JSON)
            data.append('detail', JSON.stringify(details));

            // Thêm file ảnh
            images.forEach(image => {
                // Backend của bạn cần đọc các file này bằng multer upload.array('images')
                data.append('images', image);
            });

            // Gửi yêu cầu POST
            const response = await productApi.postProduct(data);
            setType('success');
            setMessage(response.message);
            setShow(true);
            setTimeout(() => {
                onChange?.();
                onClose?.();
            }, 3000);
        } catch (err) {
            setType('error');
            setMessage(err.response?.data?.message || err.message);
            setShow(true);
        } finally {
            setLoading(false);
        }
    };



    // --- 6. Giao diện (Render) ---
    return (
        <>
            <Notification type={type} message={message} show={show} onClose={() => setShow(false)} />
            <div className='bg-white rounded-lg shadow-2xl p-8 w-full transform transition-all duration-300'
            >

                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
                    <h2 className='text-3xl font-extrabold text-gray-800'>➕ Add New Product</h2>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* -------------------- BASIC INFORMATION -------------------- */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Product Name" name="name" value={formData.name} onChange={handleChange} />
                            <FormInput label="Slug (URL Path)" name="slug" value={formData.slug} onChange={handleChange} />

                            <div className="col-span-2">
                                <FormInput label="Description" name="description" type="textarea" value={formData.description} onChange={handleChange} isFullWidth />
                            </div>

                            {/* Select Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150">
                                    <option value="">-- Select Category --</option>
                                    {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand <span className="text-red-500">*</span></label>
                                <select name="brand" value={formData.brand} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150">
                                    <option value="">-- Select Brand --</option>
                                    {brands.map(brand => <option key={brand._id} value={brand._id}>{brand.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* -------------------- TECHNICAL SPECIFICATIONS -------------------- */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Technical Specifications & Promotion</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormInput label="Origin" name="origin" value={formData.origin} onChange={handleChange} />
                            <FormInput label="Target Audience" name="target_audience" value={formData.target_audience} onChange={handleChange} />
                            <FormInput label="Water Resistance" name="water_resistance" value={formData.water_resistance} onChange={handleChange} />
                            <FormInput label="Movement Type" name="movement_type" value={formData.movement_type} onChange={handleChange} />
                            <FormInput label="Glass Material" name="glass_material" value={formData.glass_material} onChange={handleChange} />
                            <FormInput label="Strap Material" name="strap_material" value={formData.strap_material} onChange={handleChange} />
                            <FormInput label="Dial Type" name="dial_type" value={formData.dial_type} onChange={handleChange} />
                            <FormInput label="Thickness (mm)" name="thickness" type="number" value={formData.thickness} onChange={handleChange} />
                            <FormInput label="Power Reserve" name="power_reserve" value={formData.power_reserve} onChange={handleChange} />

                            <div className="col-span-3">
                                <FormInput label="Features/Functions" name="features" type="textarea" value={formData.features} onChange={handleChange} isFullWidth />
                            </div>

                            {/* Flash Sale */}
                            <div className="col-span-3 flex items-center space-x-4 p-2 bg-yellow-50 rounded-md border border-yellow-300">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                                    <input type="checkbox" name="flashSale" checked={formData.flashSale} onChange={handleChange} className="form-checkbox text-blue-600 h-4 w-4" />
                                    <span>Apply Flash Sale</span>
                                </label>
                                {formData.flashSale && (
                                    <div className='flex-1'>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Flash Sale End:</label>
                                        <input type="datetime-local" name="flashSaleEnd" value={formData.flashSaleEnd} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 transition duration-150" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* -------------------- PRODUCT DETAILS (Color, Price, Quantity) -------------------- */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Details & Variations</h3>
                        {details.map((detail, index) => (
                            <div key={index} className="p-4 mb-4 border border-gray-300 rounded-lg shadow-inner bg-white relative">
                                <h4 className="text-lg font-medium mb-3 text-gray-800">Variation #{index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <FormInput label="Color" name="color" value={detail.color} onChange={(e) => handleDetailChange(index, e)} />
                                    <FormInput label="Color Code" name="colorCode" value={detail.colorCode} onChange={(e) => handleDetailChange(index, e)} />
                                    <FormInput label="Original Price" name="originalPrice" type="number" value={detail.originalPrice} onChange={(e) => handleDetailChange(index, e)} />
                                    <FormInput label="Current Price" name="currentPrice" type="number" value={detail.currentPrice} onChange={(e) => handleDetailChange(index, e)} />

                                    {formData.flashSale && (
                                        <FormInput label="Flash Sale Price" name="flashSalePrice" type="number" value={detail.flashSalePrice} onChange={(e) => handleDetailChange(index, e)} />
                                    )}

                                    <FormInput label="Inventory Quantity" name="quantity" type="number" value={detail.quantity} onChange={(e) => handleDetailChange(index, e)} />
                                    <FormInput label="Sold" name="sold" type="number" value={detail.sold} onChange={(e) => handleDetailChange(index, e)} />
                                </div>

                                {details.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveDetail(index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full bg-red-100 transition duration-150"
                                        title="Remove Variation"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddDetail} className="mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-150">
                            + Add Variation
                        </button>
                    </div>

                    {/* -------------------- IMAGES -------------------- */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Product Images</h3>
                        <div className="flex items-center space-x-4">
                            <input
                                type="file"
                                id="image-upload"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}

                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="text-gray-600 text-sm">Selected **{images.length}** image files.</p>
                        </div>
                    </div>

                    {/* -------------------- SUBMIT BUTTON -------------------- */}
                    <div className="pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-white font-bold rounded-lg shadow-lg transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'}`}
                        >
                            {loading ? 'Adding...' : 'SAVE PRODUCT'}
                        </button>
                    </div>

                </form>
            </div>

        </>
    );
};
