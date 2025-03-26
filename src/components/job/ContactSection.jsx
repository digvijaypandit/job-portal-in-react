const ContactSection = ({ data }) => {
    return (
      <div className="bg-white shadow-sm rounded-lg p-5">
        <h3 className="text-xl font-semibold border-l-4 border-blue-500 pl-2">
          Contact the Organizers
        </h3>
        <p className="mt-2 text-gray-600">📧 Email: {data.contact.email}</p>
        <p className="text-gray-600">📞 Phone: {data.contact.phone}</p>
      </div>
    );
  };
  
  export default ContactSection;
  