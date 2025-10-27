import {  useEffect, useState } from "react";
import type { IPlanData, IResGetPlanName } from "../../../../types/plan,types";
import { showErrorToast } from "../../../../utils/showErrorToast";
import instance from "../../../../api/axios";
import type { IResRazorpayCreateOrder, IRazorpayOrder } from "../../../../types/razorpay.type";
import {  openRazorpayCheckoutFunction } from "../../../../utils/razorpayHelper";
import type { IResCurrentSubscription, IResSubscription } from "../../../../types/subscription.type";
import AlertModal from "../modal/Alert";
import CurrentPlan from "../modal/CurrentPlan";




interface Props {
    className: string;
}

const CheckCircleIcon = ({ className }: Props) => (
    <svg className={`w-4 h-4 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
);

const PlansPage = () => {

    const [plans, setPlans] = useState<IPlanData[]>([])
    const [isYearly, setIsYearly] = useState(true);
    const [currentPlan, setCurrentPlan] = useState<IResSubscription | undefined>(undefined)
    const [isAlertModal, setIsAlertModal] = useState(false)
    const [isCurrentPlanModal, setIsCurrentPlanModal] = useState(false)

    const fetchData = async () => {
        try {
            const res = await instance.get<IResGetPlanName>('/user/plans')
            if (res.data.success) {

                setPlans(res.data.data)
            }

        } catch (error) {
            showErrorToast(error)
            console.log("error in fetch plans ", error)
        }
    }



    const fetchCurrentPlan = async () => {
        try {
            const res = await instance.get<IResCurrentSubscription>('/user/current-plans')
            if (res.data.success) {
                setCurrentPlan(res.data.data)
                
            }


        } catch (error) {
            showErrorToast(error)
            console.log("error in fetch current plan ", error)
        }

    }


    
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        fetchCurrentPlan()

    }, [])

    const handleRenewal = async ()=>{
        try {
            const res = await instance.post<IResRazorpayCreateOrder>('/user/renewal/create-order')
            if (res.data.success) {
                const order: IRazorpayOrder = res.data.data
                let URL = '/user/renewal/verify-payment'
                openRazorpayCheckoutFunction(order,URL)
            }
        } catch (error) {
            showErrorToast(error)
            console.log("error in renewal handle")
        }
    }
    
    // handle new plan
    const handleUpgrade = async (planId: string) => {
        try {
            const res = await instance.post<IResRazorpayCreateOrder>("/user/create-order", {
                planId,
                billing: isYearly ? 'yearly' : 'monthly'
            })

            if (res.data.success) {
                const order: IRazorpayOrder = res.data.data
                let URL = '/user/verify-payment'
                openRazorpayCheckoutFunction(order,URL)
            }

        } catch (error) {
            showErrorToast(error)
            console.log("error in rzorpay order create ", error)
        }
    }
    return (
        <div className="mt-20 mb-10 flex flex-col items-center px-4 py-12">

            {/* --- NEW: Heading and Subtitle --- */}
            <div className="text-center mb-12 max-w-3xl">
                <h1 className="text-4xl font-extrabold text-white mb-2">
                    Flexible Pricing for Every Business
                </h1>
                <p className="text-lg text-gray-400">
                    Choose the right plan designed to scale with your needs and ambitions.
                </p>
            </div>

            {/* --- NEW: Billing Toggle (UI Only) --- */}
            <div className="mb-10 flex justify-center">
                <div className="bg-gray-800 p-1 rounded-full flex space-x-1 shadow-inner">
                    <button
                        onClick={() => setIsYearly(true)}
                        className={`py-2 px-5 rounded-full text-sm font-semibold transition-colors duration-200 ${isYearly
                            ? 'bg-yellow-400 text-black shadow-md'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Yearly (Save 10%)
                    </button>
                    <button
                        onClick={() => setIsYearly(false)}
                        className={`py-2 px-5 rounded-full text-sm font-semibold transition-colors duration-200 ${!isYearly
                            ? 'bg-yellow-400 text-black shadow-md'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            {/* --- ORIGINAL: Plan Cards Grid (Modified to use isYearly state) --- */}
            <div className={`max-w-6xl w-full grid gap-8 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${plans.length}`}>
                {plans.map((plan) => ( // Use 'any' type to match the structure of the data object
                    <div
                        key={plan.id}
                        className={`relative w-80 rounded-2xl shadow-lg p-6 bg-white/5 text-white border transition transform hover:scale-105 ${plan.monthlyAmount ? "border-yellow-400" : "border-gray-600"
                            }`}
                    >
                        {
                        ((currentPlan?.planId?._id === plan.id && currentPlan?.billing === "yearly" && isYearly ) ||
                        (currentPlan?.planId?._id === plan.id && currentPlan?.billing === "monthly" && !isYearly ))
                        &&
                            <span
                            onClick={()=> setIsCurrentPlanModal(true)}
                            className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full cursor-pointer">
                                Current Plan
                            </span>
                        }

                        {plan.monthlyAmount
                            && (
                                <p className="text-sm text-yellow-400 font-semibold mb-2">Most Popular</p>
                            )}
                        <h3 className="text-2xl font-bold mb-2">{plan.planName}</h3>

                        {/* Conditional Price Display based on toggle state */}
                        {isYearly ? (
                            <p className="text-3xl font-extrabold mb-4">
                                {plan.yearlyAmount}
                                <span className="text-xl text-gray-400 font-normal"> /year</span>
                            </p>
                        ) : (
                            <p className="text-3xl font-extrabold mb-4">
                                {plan.monthlyAmount}
                                <span className="text-xl text-gray-400 font-normal"> /month</span>
                            </p>
                        )}

                        <p className="text-sm text-gray-300 mb-6">{plan.target}</p>

                        <ul className="space-y-3 mb-6">
                            {plan.features?.map((feature: any, i: number) => (
                                <li key={i} className="flex items-center gap-2 text-gray-200">
                                    {/* Using inline SVG component */}
                                    <CheckCircleIcon className="text-green-400" />
                                    {feature.feature}
                                    {feature.type === 'count' && ` ${feature.value * (isYearly ? 12 : 1)}`}
                                    {feature.type === 'flat' && ` flat ${feature.value}`}
                                    {feature.type === 'percentage' && ` ${feature.value}%`}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={
                                plan.id === currentPlan?.planId?._id ? () => { setIsAlertModal(true) } :
                                    () => handleUpgrade(plan.id)}

                            className={`w-full py-2 rounded-xl font-semibold transition ${plan.monthlyAmount
                                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                                : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                        >
                            {`Upgrade to ${plan.planName}`}
                        </button>

                    </div>
                ))}
            </div>
            {isAlertModal && <AlertModal
                onClose={() => setIsAlertModal(false)}
                isOpen={isAlertModal}
                message="You are already on this plan."
            />}
            {isCurrentPlanModal && 
            <CurrentPlan 
            planData={currentPlan!}
            onClose={()=> setIsCurrentPlanModal(false)}
            isOpen={isCurrentPlanModal}
            onCancelPlan={()=>{}}
            onRenew={handleRenewal}
            />
            }
        </div>
    );
};

export default PlansPage;
