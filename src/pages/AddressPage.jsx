import { useState, useEffect } from "react";
import { MapPin, Trash2, Edit3, Home, PlusCircle, CheckCircle2, XCircle ,Building2 } from "lucide-react";
import addressApi from "../api/addressApi";
import Address from "../components/common/Address";
import Notification from "../components/common/Notification";

export default function AddressPage() {

  const [addresses, setAddresses] = useState([]);
  const [addressData, setAddressData] = useState({});
  const [modal, setModal] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [del, setDel] = useState(false);
  const [edit, setEdit] = useState(false);

  const [show,setShow] = useState(false);
  const [type,setType] = useState('');
  const [message,setMessage]= useState('');

  const getAddresses = async () => {
    try {
      const response = await addressApi.getAddress();
      setAddresses(response.addresses);
    } catch (err) {
      setShow(true);
      setType('error');
      setMessage(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const handleDelete = (id) => {
    setAddressId(id);
    setDel(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await addressApi.deleteAddress(addressId);
      await getAddresses();
      setShow(true);
      setType('success');
      setMessage(response.message);
      setDel(false);
    } catch (err) {
      setShow(true);
      setType('error');
      setMessage(err.response?.data?.message || err.message)
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const response = await addressApi.patchAddress(id);
      await getAddresses();
      setShow(true);
      setType('success');
      setMessage(response.message);
    } catch (err) {
      setShow(true);
      setType('error');
      setMessage(err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (address) => {
    setAddressData(address);
    setEdit(true);
  };

  return (
    <>
    <Notification show={show} type={type} message={message} onClose={()=>setShow(false)}/>
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center my-2 md:my-4 xl:my-6 border-b pb-4 border-gray-200">
        <h2 className="text-base md:text-lg xl:text-xl lg:text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <MapPin className="text-brand w-6 h-6" />
          Delivery Addresses
        </h2>
        <button
          className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-lg hover:bg-brand-dark transition-all shadow-sm"
          onClick={() => setModal(true)}
        >
          <PlusCircle className="w-5 h-5" />
          New address
        </button>
      </div>

      {/* Address List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`relative border rounded-2xl p-5 bg-bg-tertiary shadow-sm hover:shadow-md transition-all ${
                address.isDefault ? "border-brand" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 text-xs flex gap-2 items-center rounded-full bg-gray-100 text-gray-600 font-medium">
                  {address.type==='Home'?(
                   <><Home size={20}/> {address.type}</> 
                  ):(
                    <><Building2 size={20}/> {address.type}</>
                  )}
                </span>
                {address.isDefault && (
                  <span className="flex items-center gap-1 text-brand text-sm font-medium">
                    <CheckCircle2 size={16} /> Default
                  </span>
                )}
              </div>

              <div className="space-y-1 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">{address.name}</p>
                <p className="text-gray-600">{address.phone}</p>
                <p className="text-gray-500">{address.address}</p>
              </div>

              <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(address)}
                  className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address._id)}
                    className="text-gray-600 hover:text-brand text-sm flex items-center gap-1"
                  >
                    <Home size={16} /> Set Default
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 italic">
            No address added yet.
          </p>
        )}
      </div>

      {/* Add / Edit Modal */}
      {(modal || edit) && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 mx-4"
          onClick={() => {
            setModal(false);
            setEdit(false);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Address
              onClose={() => {
                setModal(false);
                setEdit(false);
              }}
              onChange={() => getAddresses()}
              addressData={edit ? addressData : undefined}
            />
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {del && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setDel(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <XCircle className="text-red-500 w-10 h-10" />
              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Delete
              </h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this address?
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                  onClick={() => setDel(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
