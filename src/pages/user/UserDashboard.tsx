import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// ... existing code ...
import { faBox, faMapMarkerAlt, faUser, faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// ... existing code ...
interface Booking {
  id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  pickupLocation: string;
  dropoffLocation: string;
  itemType: string;
  itemSize: string;
  providerName?: string;
  providerRating?: number;
  price?: number;
  trackingUrl?: string;
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // Fetch user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Fetch bookings
    fetchBookings();
  }, []);
  
  const fetchBookings = () => {
    // Mock data for bookings
    const mockBookings: Booking[] = [
      {
        id: 'BK-12345',
        status: 'completed',
        date: '2023-06-10T14:00:00',
        pickupLocation: '123 Main St, New York, NY',
        dropoffLocation: '456 Park Ave, New York, NY',
        itemType: 'Furniture',
        itemSize: 'Large',
        providerName: 'Express Movers',
        providerRating: 4.8,
        price: 120,
        trackingUrl: '/tracking/BK-12345'
      },
      {
        id: 'BK-12346',
        status: 'in_progress',
        date: '2023-06-15T10:30:00',
        pickupLocation: '789 Broadway, New York, NY',
        dropoffLocation: '101 5th Ave, New York, NY',
        itemType: 'Electronics',
        itemSize: 'Medium',
        providerName: 'Safe Transport',
        providerRating: 4.9,
        price: 85,
        trackingUrl: '/tracking/BK-12346'
      },
      {
        id: 'BK-12347',
        status: 'confirmed',
        date: '2023-06-20T09:00:00',
        pickupLocation: '222 E 44th St, New York, NY',
        dropoffLocation: '888 7th Ave, New York, NY',
        itemType: 'Boxes',
        itemSize: 'Small',
        providerName: 'City Logistics',
        providerRating: 4.6,
        price: 65,
        trackingUrl: '/tracking/BK-12347'
      },
      {
        id: 'BK-12348',
        status: 'pending',
        date: '2023-06-25T13:00:00',
        pickupLocation: '350 5th Ave, New York, NY',
        dropoffLocation: '1 World Trade Center, New York, NY',
        itemType: 'Artwork',
        itemSize: 'Medium',
        trackingUrl: '/tracking/BK-12348'
      }
    ];
    
    setBookings(mockBookings);
  };
  
  const filteredBookings = bookings.filter(booking => 
    booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (booking.providerName && booking.providerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faUser} className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
                <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <Link to="/profile" className="text-blue-600 hover:text-blue-800 block mb-2">
                Edit Profile
              </Link>
              <Link to="/settings" className="text-blue-600 hover:text-blue-800 block">
                Account Settings
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <Link 
              to="/service-request" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block w-full text-center mb-3"
            >
              New Service Request
            </Link>
            <Link 
              to="/support" 
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 inline-block w-full text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">My Dashboard</h1>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="border rounded-lg pl-10 pr-4 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <button
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'bookings'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    All Bookings
                  </button>
                  <button
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'active'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('active')}
                  >
                    Active
                  </button>
                  <button
                    className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'completed'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('completed')}
                  >
                    Completed
                  </button>
                </nav>
              </div>
            </div>
            
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <FontAwesomeIcon icon={faBox} className="mx-auto text-gray-400 text-5xl mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-1">No bookings found</h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? `No results matching "${searchTerm}"`
                    : "You haven't made any bookings yet"}
                </p>
                {!searchTerm && (
                  <Link 
                    to="/service-request" 
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create your first booking
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Locations
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Provider
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.date).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex items-start">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mt-1 mr-1 flex-shrink-0" />
                            <div>
                              <div className="truncate max-w-xs">{booking.pickupLocation}</div>
                              <div className="truncate max-w-xs">{booking.dropoffLocation}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.providerName ? (
                            <div>
                              <div>{booking.providerName}</div>
                              {booking.providerRating && (
                                <div className="flex items-center">
                                  <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                                  <span>{booking.providerRating}</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">Not assigned</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.price ? `$${booking.price.toFixed(2)}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {booking.trackingUrl && (
                            <Link to={booking.trackingUrl} className="text-blue-600 hover:text-blue-900 mr-4">
                              Track
                            </Link>
                          )}
                          <Link to={`/booking/${booking.id}`} className="text-blue-600 hover:text-blue-900">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 