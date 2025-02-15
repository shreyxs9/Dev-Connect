import React from 'react'

const ConnectionCard = ({connections}) => {
    if (!Array.isArray(connections) || connections.length === 0) {
        return <div>No connections available</div>;
      }
  return (  
    <div className="max-w-2xl mx-auto mt-6 space-y-2 ">
    {connections.map((connection) => (
      <div key={connection._id} className="flex items-center  bg-base-300  shadow-md rounded-lg p-1 md:p-2 border border-gray-50">
        {/* Left Side - Profile Image */}
        <img
          src={connection.photoUrl || "https://via.placeholder.com/80"} // Default Image
          alt={connection.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-300"
        />

        {/* Right Side - Details */}
        <div className="ml-2">
          <h3 className="text-lg font-semibold">{connection.firstName + " "}{connection.lastName } </h3>
          <span className="text-sm text-gray-600"> {connection.gender +" " } {connection.age}</span>
        </div>
      </div>
      
    ))}
  </div>
);
};

export default ConnectionCard;
