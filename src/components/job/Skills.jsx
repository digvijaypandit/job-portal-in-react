import React from 'react'

function skills({ data }) {
    return (
        <div className="bg-white shadow-sm rounded-lg p-5">
            <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-2">
            Requierd Skills
            </h3>
            <div className="grid gap-3 mt-2">
                <ul className="list-disc pl-5 text-gray-600">
                    {data.keyResponsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default skills
