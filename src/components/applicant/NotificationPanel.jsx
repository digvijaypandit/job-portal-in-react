const NotificationPanel = () => {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
        <ul className="text-gray-600">
          <li>📢 New Job: Frontend Developer at Microsoft</li>
          <li>📢 Your application at Tesla is under review</li>
          <li>📢 Interview scheduled for Data Scientist role</li>
        </ul>
      </div>
    );
  };
  
  export default NotificationPanel;
  