import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import instance from "../../../../api/axios";
import type { ApiResponse } from "../../../../types/user.types";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../../utils/showErrorToast";
import type {  IPlanFormData,  IResPlanData } from "../../../../types/plan,types";



interface FeatureRow {
    feature: string;
    type: string;
    value: string;
}



const CreatePlanForm = () => {

    const [searchParams] = useSearchParams()
    const planId = searchParams.get('id');
    const [rows, setRows] = useState<FeatureRow[]>([{ feature: "", type: "", value: "" }]);
    const [formData, setFormData] = useState<IPlanFormData>({
        planName: "",
        yearlyAmount: "",
        monthlyAmount: "",
        target: "",
    });

    const [errors, setErrors] = useState<{
        planName?: string;
        yearlyAmount?: string;
        monthlyAmount?: string;
        target?: string
        features?: string;
    }>({});
    const navigate = useNavigate();

    const fetchData = async () => {
        console.log("fetch called")
        try {
            const res = await instance.get<IResPlanData>(`/admin/plan/${planId}`)
            if(res.data.success){
                const { data } = res.data
                setFormData({
                    planName: data.planName,
                    yearlyAmount: data.yearlyAmount,
                    monthlyAmount: data.monthlyAmount,
                    target: data.target
                })
                setRows(data.features)
            }
            

        } catch (error: any) {
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Failed to fetch plan data");
            }
            console.log("error in admin  plan edit ", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    

    const featureConfig = {
        user: [
            { value: "autoBid", label: "Auto Bid", allowedTypes: ["count"] },
            { value: "bidDiscount", label: "Bid Discount", allowedTypes: ["flat", "percentage"] },
        ],
        seller: [
            { value: "autoliveAuction", label: "Auto Live Auction", allowedTypes: ["count"] },
            { value: "auctionDiscount", label: "Auction Discount", allowedTypes: ["flat", "percentage"] },
        ],
    };






    const addRow = () => setRows([...rows, { feature: "", type: "", value: "" }]);
    const removeRow = (i: number) => setRows(rows.filter((_, idx) => idx !== i));

    const FeatureHandleChange = (i: number, key: keyof FeatureRow, value: string) => {
        setRows(prev => {
            const copy = [...prev];
            copy[i][key] = value;

            if (key === "feature") {
                copy[i].type = "";
                copy[i].value = "";
            }

            return copy;
        });
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" });
        setRows([{ feature: "", type: "", value: "" }])
    }

    const validate = () => {
        for (let r of rows) {
            if (!r.feature || !r.type || !r.value) return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};
        const { planName, yearlyAmount, monthlyAmount, target } = formData;

        if (!planName.trim()) newErrors.planName = "Plan name is required";
        if (!yearlyAmount || isNaN(Number(yearlyAmount || Number(yearlyAmount) < 1))) {
            newErrors.yearlyAmount = "Enter a valid yearly amount";
        }
        if (!monthlyAmount || isNaN(Number(monthlyAmount)) || Number(monthlyAmount) < 1 || Number(monthlyAmount) > Number(yearlyAmount)) {
            newErrors.monthlyAmount = "Enter a valid monthly amount";
        }
        if (!target.trim()) newErrors.target = "Choose target"

        if (!validate()) {
            newErrors.features = "Fill all feature fields"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            try {
                const res = await instance.put<ApiResponse>('/admin/plan', {
                    ...formData,
                    features: rows,
                    planId
                })
                if (res.data.success) {

                    toast("plan updated")
                    navigate('/admin/planManagement')
                }
            } catch (error: any) {
                console.log("error in plan submit form ", error)
                showErrorToast(error)
            }


        }


    };

    return (
        <div className="min-h-screen flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
                {/* Left: Image */}
                <div className="md:w-1/2 bg-blue-100 p-4 flex justify-center items-center">
                    <img
                        src="/images/Gemini_Generated_Image_dt7yu2dt7yu2dt7y-removebg-preview.png"
                        alt="Plan"
                        className="max-w-full"
                    />
                </div>

                {/* Right: Form */}
                <div className="md:w-1/2 p-8 w-full">
                    <form className="p-4 w-full" onSubmit={handleSubmit}>
                        <h2 className="text-center text-lg font-bold mb-4">Create Plan</h2>

                        {/* Plan Name */}
                        <div className="w-full mb-4">
                            <input
                                type="text"
                                name="planName"
                                value={formData.planName}
                                onChange={handleChange}
                                placeholder="Plan Name"
                                className={`w-full px-4 py-2 border ${errors.planName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.planName && <p className="text-red-500 text-xs mt-1">{errors.planName}</p>}
                        </div>

                        {/* Yearly Amount */}
                        <div className="w-full mb-4">
                            <input
                                type="number"
                                name="yearlyAmount"
                                value={formData.yearlyAmount}
                                onChange={handleChange}
                                placeholder="Yearly Amount"
                                className={`w-full px-4 py-2 border ${errors.yearlyAmount ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.yearlyAmount && <p className="text-red-500 text-xs mt-1">{errors.yearlyAmount}</p>}
                        </div>

                        {/* Monthly Amount */}
                        <div className="w-full mb-4">
                            <input
                                type="number"
                                name="monthlyAmount"
                                value={formData.monthlyAmount}
                                onChange={handleChange}
                                placeholder="Monthly Amount"
                                className={`w-full px-4 py-2 border ${errors.monthlyAmount ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.monthlyAmount && <p className="text-red-500 text-xs mt-1">{errors.monthlyAmount}</p>}
                        </div>

                        {/* target */}
                        <div className="w-full mb-4">
                            <select
                                name="target"
                                value={formData.target}
                                onChange={handleTargetChange}
                                className={`w-full px-4 py-2 border ${errors.target ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">Select Plan Target</option>
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                            </select>
                            {errors.target && <p className="text-red-500 text-xs mt-1">{errors.target}</p>}
                        </div>

                        {/* Features */}

                        {rows.map((row, i) => (
                            <div key={i} >
                                <div className="w-full ">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {/* Feature */}
                                        <select
                                            className="w-1/4 flex-1  px-4 py-2 border rounded-md "
                                            value={row.feature}
                                            onChange={e => FeatureHandleChange(i, "feature", e.target.value)} >
                                            <option value="">Feature</option>
                                            {formData.target &&
                                                featureConfig[formData.target].map(opt => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                        </select>

                                        {/* Type */}
                                        <select
                                            className="flex-1 w-1/4 px-4 py-2 border rounded-md"
                                            value={row.type} onChange={e => FeatureHandleChange(i, "type", e.target.value)}>
                                            <option value="">Type</option>
                                            {formData.target &&
                                                featureConfig[formData.target]
                                                    .find(f => f.value === row.feature)
                                                    ?.allowedTypes.map(t => (
                                                        <option key={t} value={t}>
                                                            {t}
                                                        </option>
                                                    ))}
                                        </select>

                                        {/* Value */}
                                        <input
                                            className="flex-1 w-1/4 px-4 py-2 border rounded-md"
                                            type="text"
                                            value={row.value}
                                            onChange={e => FeatureHandleChange(i, "value", e.target.value)}
                                            placeholder="Value"
                                        />

                                        {/* Remove */}
                                        {rows.length > 1 && (
                                            <button type="button" onClick={() => removeRow(i)}>
                                                -
                                            </button>
                                        )}

                                        {/* Add */}
                                        {i === rows.length - 1 && (
                                            <button type="button" onClick={addRow}>
                                                +
                                            </button>
                                        )}
                                    </div>

                                </div>

                            </div>
                        ))}
                        {errors.features && <p className="text-red-500 text-xs mt-1">{errors.features}</p>}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md mt-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePlanForm;
