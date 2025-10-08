import React from 'react';
import type { IResGetPlanData } from '../../../../types/plan,types';
import type { IResSubscription } from '../../../../types/subscription.type';

// Define the props interface
interface CurrentPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRenew: () => void;
    onCancelPlan: () => void;
    planData: IResSubscription
}



const CurrentPlanModal: React.FC<CurrentPlanModalProps> = ({ isOpen, onClose, onRenew, onCancelPlan, planData }) => {

    const calculateDaysLeft = (endAtISO: Date): number => {
        const endDate = new Date(endAtISO);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const differenceMs = endDate.getTime() - currentDate.getTime();
        const oneDayInMs = 1000 * 60 * 60 * 24;
        const daysLeft = Math.ceil(differenceMs / oneDayInMs);

        return daysLeft;
    };
    if (!isOpen) return null;



    return (
        // 1. Modal Backdrop (Dark and Translucent)
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">

            {/* 2. Modal Card (Design matched to your theme) */}
            <div className="relative bg-gradient-to-br from-[#1F2937] to-[#371F42] border border-[#5A5A90] rounded-xl shadow-2xl p-6 w-full max-w-sm text-white">

                {/* Modal Header */}
                <div className='mb-6'>
                    <h2 className="text-2xl font-bold text-[#FDD835] mb-1">Current Plan: {planData.planId.planName}</h2>
                    <p className="text-sm text-gray-300">{
                        planData.billing === "monthly" ? planData.planId.monthlyAmount : planData.planId.yearlyAmount} / {planData.billing} user</p>
                </div>

                {/* Validity & Days Left */}
                <div className='bg-[#4A2D67] p-4 rounded-lg mb-6'>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='font-semibold text-gray-200'>Validity Ends:</span>
                        <span className='text-sm font-medium text-[#FDD835]'>{new Date(planData.endAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='font-semibold text-gray-200'>Days Remaining:</span>
                        <span className='text-xl font-bold text-green-400'>{calculateDaysLeft(planData.endAt)}</span>
                    </div>
                </div>

                {/* Feature Usage */}
                <div className="mb-6">
                    <h3 className='text-lg font-semibold text-gray-200 mb-3'>Feature Usage</h3>
                    <div className='space-y-2'>
                        {planData.qouta.map((feature) => (
                            <div key={feature.id} className='flex justify-between items-center text-sm'>
                                <span className='text-gray-300'>{feature.feature}:</span>
                                {/* Conditional rendering for usage/limit */}
                                {feature.type === "count" ? (
                                    <span className='font-medium text-white'>
                                        <span className='text-[#FDD835]'>{feature.used}</span> / {feature.value} 
                                    </span>
                                ) : (
                                    <span className='font-medium text-white'>{feature.type } {feature.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-3 pt-4 border-t border-[#5A5A90]">
                    {/* Cancel Button (Red/Danger - Left) */}
                    <button
                        onClick={onCancelPlan}
                        className="w-full px-4 py-2 rounded-md text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition duration-150"
                    >
                        Cancel Plan
                    </button>

                    {/* Renew Button (Gold/Primary - Right, matching your Upgrade button color) */}
                    <button
                        onClick={onRenew}
                        className="w-full px-4 py-2 rounded-md text-sm font-semibold bg-[#FDD835] text-gray-900 hover:bg-[#FCE38A] transition duration-150"
                    >
                        Renew Now
                    </button>
                </div>

                {/* Close Button (Optional: for a clean look, often unnecessary with actions) */}
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">X</button>
            </div>
        </div>
    );
};

export default CurrentPlanModal;