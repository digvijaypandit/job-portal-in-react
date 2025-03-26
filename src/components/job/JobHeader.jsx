const JobHeader = ({ data }) => {
    return (
      <div className="bg-white shadow-sm rounded-lg p-5 flex items-center gap-4">
        <img
          src={data.companyLogo}
          alt="Company Logo"
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold">{data.title}</h2>
          <p className="text-gray-500">{data.company}</p>
        </div>
        <div className="ml-auto flex items-center text-gray-500">
          <span className="mr-2">📅</span>
          <p>Updated On: {data.updatedOn}</p>
        </div>
      </div>
    );
  };
  
  export default JobHeader;
  