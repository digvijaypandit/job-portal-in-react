const AdditionalInfo = ({ data }) => {
    return (
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-2">
          Additional Information
        </h3>
        <div className="grid gap-3 mt-2">
          {data.additionalInfo.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
            >
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-gray-600">{item.details}</p>
              </div>
              <span className="text-2xl">{item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AdditionalInfo;
  