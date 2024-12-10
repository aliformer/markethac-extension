import React, { useState, type ReactElement } from 'react';

export const Tab = ({tabs }: {tabs:{label: string, component: ReactElement}[]}) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className="w-full max-w-xl mx-auto mt-2">
            {/* Tab Headers */}
            <div className="flex border-b">
                {tabs.map((tab,index) => (
                    <button
                        key={"tab_" + index}
                        className={`flex-1 text-center text-sm font-semibold py-2 px-4 transition-colors duration-300 border-b-2 ${
                            activeTab === index
                                ? 'border-red-500 text-red-500'
                                : 'border-transparent text-slate-400 hover:text-red-500'
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className=" bg-gray-50 border border-gray-200 rounded-b">
                {tabs.find((tab, index) => {
                    return index === activeTab;
                }).component}
            </div>
        </div>
    );
};
;
