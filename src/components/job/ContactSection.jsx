import { IoMdCall, IoMdMail } from "react-icons/io";

const ContactSection = ({ job }) => {
    return (
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-2">
          Contact the Organizers
        </h3>
        <p className="mt-2 text-gray-600 flex items-center gap-2"><span><IoMdMail /></span> Email: {'987654321'}</p>
        <p className="text-gray-600 flex items-center gap-2"><span><IoMdCall /></span>Phone: {'Mail.com'}</p>
      </div>
    );
  };
  
  export default ContactSection;
  