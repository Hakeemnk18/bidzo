import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import instance from "../../../../api/axios";
import type { ApiResponse } from "../../../../types/user.types";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../../utils/showErrorToast";
import { v4 as uuidv4 } from "uuid";
import { featureConfigSet } from "../../../../types/plan,types";
import { validateFeature, validMonthlyAmount, validYearlyAmount } from "../../../../utils/planHelpers";
import type {
    IPlanData,
    IPlanFormData,
    IResGetPlanName,
    FeatureRow,
    IResPlanData
} from "../../../../types/plan,types";



const CreatePlanForm = () => {
    const [searchParams] = useSearchParams()
    const planId = searchParams.get('id');
    const [rows, setRows] = useState<FeatureRow[]>([{ id: uuidv4(), feature: "", type: "", value: "" }]);
    const [plans, setPlans] = useState<IPlanData[]>([])
    


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

    const fetchPlans = async () => {
        try {
            const res = await instance.get<IResGetPlanName>('/admin/plan')
            if (res.data.success) {
                setPlans(res.data.data)
            }
        } catch (error) {
            console.log("error in fetch plan name", error)
            showErrorToast(error)
        }
    }
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
    //fetch plan names
    useEffect(() => {
        fetchPlans()
    }, [])

    const getAvailableFeatures = (rowId: string) => {
        if (!formData.target) return [];
        const selected = new Set(rows.filter(r => r.id !== rowId).map(r => r.feature).filter(Boolean));
        return featureConfigSet[formData.target].filter(f => !selected.has(f.value));
    };

    //set plan name
    


    const addRow = () => {
        if (!formData.target) return;
        if (rows.length < featureConfigSet[formData.target].length) {
            setRows(prev => [...prev, { id: uuidv4(), feature: "", type: "", value: "" }]);
        }
    };

    const removeRow = (rowId: string) => {
        setRows(prev => prev.filter(r => r.id !== rowId));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" });
        setRows([{ id: uuidv4(), feature: "", type: "", value: "" }])
    }

    const validate = () => {
        for (let r of rows) {
            if (!r.feature || !r.type || !r.value) return false;
        }
        return true;
    };

    
    const handleRowChange = (rowId: string, key: keyof FeatureRow, value: string) => {
        setRows(prev =>
            prev.map(r =>
                r.id === rowId
                    ? { ...r, [key]: value, ...(key === "feature" ? { type: "", value: "" } : {}) }
                    : r
            )
        );
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};
        const { planName, yearlyAmount, monthlyAmount, target } = formData;

        if (!planName.trim()) newErrors.planName = "Plan name is required";

        if (!target.trim()) newErrors.target = "Choose target";

        if (!yearlyAmount || isNaN(Number(yearlyAmount || Number(yearlyAmount) < 1))) {
            newErrors.yearlyAmount = "Enter a valid yearly amount";
        }

        if (!validYearlyAmount(plans, Number(yearlyAmount), target, planName)) {
            newErrors.yearlyAmount = "Enter a valid yearly amount"
        }

        if (!monthlyAmount || isNaN(Number(monthlyAmount)) || Number(monthlyAmount) < 1 || Number(monthlyAmount) > Number(yearlyAmount)) {
            newErrors.monthlyAmount = "Enter a valid monthly amount";
        }

        if (!validMonthlyAmount(plans,Number(monthlyAmount), target, planName)) {
            newErrors.monthlyAmount = "Enter a valid monthly amount";
        }

        if (!validate()) {
            newErrors.features = "Fill all feature fields"
        }

        if(!validateFeature(plans,rows,formData.target,planName)){
            newErrors.features = "features not valid"
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
                console.log("error in plan edit form ", error)
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

                        {/* target */}
                        <div className="w-full mb-4">
                            <select
                                disabled={true}
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

                        {/* Plan Name */}
                        <div className="w-full mb-4">
                            <select
                                name="planName"
                                disabled={true}
                                value={formData.planName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.planName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">Select plan name</option>
                                <option value="Gold">Gold</option>
                                <option value="Silver">Silver</option>

                            </select>

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



                        {/* Features */}

                        {rows.map((row, i) => {

                            const availableFeatures = getAvailableFeatures(row.id);
                            const selectedFeatureObj = formData.target
                                ? featureConfigSet[formData.target].find(f => f.value === row.feature)
                                : undefined;

                            return (
                                <div key={row.id} >
                                    <div className="w-full ">
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {/* Feature */}
                                            <select
                                                className="w-1/4 flex-1  px-4 py-2 border rounded-md"
                                                value={row.feature}
                                                onChange={e => handleRowChange(row.id, "feature", e.target.value)}
                                            >
                                                <option value="">Feature</option>
                                                {availableFeatures.map(f => (
                                                    <option key={f.value} value={f.value}>
                                                        {f.label}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Type */}
                                            <select
                                                className="flex-1 w-1/4 px-4 py-2 border rounded-md"
                                                value={row.type}
                                                onChange={e => handleRowChange(row.id, "type", e.target.value)}
                                                disabled={!row.feature}
                                            >
                                                <option value="">Type</option>
                                                {selectedFeatureObj?.allowedTypes.map(t => (
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
                                                onChange={e => handleRowChange(row.id, "value", e.target.value)}
                                                placeholder="Value"
                                                disabled={!row.feature}
                                            />

                                            {/* Remove */}
                                            {rows.length > 1 && (
                                                <button type="button" onClick={() => removeRow(row.id)}>
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
                            )
                        })}
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
