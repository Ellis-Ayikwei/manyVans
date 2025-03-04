import { faBox, faCalendarAlt, faLocationDot, faMoneyBill, faSearch, faStar, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Stop {
  pickup: string;
  dropoff: string;
}

interface Job {
  id: string;
  // New jobType property: 'instant', 'auction', or 'journey'
  jobType: 'instant' | 'auction' | 'journey';
  status: 'open' | 'bidding' | 'assigned' | 'completed' | 'cancelled';
  createdAt: string;
  // For instant and auction jobs
  pickupLocation?: string;
  dropoffLocation?: string;
  // For journey jobs
  stops?: Stop[];
  itemType: string;
  itemSize: string;
  preferredDate: string;
  preferredTime: string;
  description?: string;
  customerName: string;
  customerRating?: number;
  estimatedValue: number;
  bids: Bid[];
  distance: number;
}

interface Bid {
  id: string;
  providerId: string;
  providerName: string;
  amount: number;
  estimatedTime: string;
  message?: string;
  createdAt: string;
}

// Tabs for filtering by job type
const typeTabs = [
  { label: 'Instant', value: 'instant' },
  { label: 'Auction', value: 'auction' },
  { label: 'Journey', value: 'journey' },
];

const sortOptions = [
  { label: 'Newest', value: 'date' },
  { label: 'Highest Value', value: 'value_high' },
  { label: 'Lowest Value', value: 'value_low' },
  { label: 'Closest', value: 'distance' },
];

const JobBoard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('instant');
  const [sortBy, setSortBy] = useState<string>('date');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockJobs: Job[] = [
        // Instant Job
        {
          id: 'JOB-12345',
          jobType: 'instant',
          status: 'open',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          pickupLocation: '123 Main St, New York, NY',
          dropoffLocation: '456 Park Ave, New York, NY',
          itemType: 'furniture',
          itemSize: 'large',
          preferredDate: '2023-07-15',
          preferredTime: '14:00',
          description: 'Large sofa and coffee table',
          customerName: 'John Smith',
          customerRating: 4.7,
          estimatedValue: 120,
          bids: [],
          distance: 3.2,
        },
        // Auction Job
        {
          id: 'JOB-12346',
          jobType: 'auction',
          status: 'open',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          pickupLocation: '789 Broadway, New York, NY',
          dropoffLocation: '101 5th Ave, New York, NY',
          itemType: 'electronics',
          itemSize: 'medium',
          preferredDate: '2023-07-16',
          preferredTime: '10:00',
          description: 'TV and sound system',
          customerName: 'Emily Johnson',
          customerRating: 4.9,
          estimatedValue: 85,
          bids: [
            {
              id: 'BID-001',
              providerId: 'P-789',
              providerName: 'Fast Movers',
              amount: 75,
              estimatedTime: '2023-07-16T11:00:00',
              message: 'Can deliver by 11am',
              createdAt: new Date(Date.now() - 3600000).toISOString(),
            },
          ],
          distance: 2.5,
        },
        // Journey Job
        {
          id: 'JOB-12347',
          jobType: 'journey',
          status: 'open',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          // For journey, use stops array
          stops: [
            { pickup: '111 1st Ave, New York, NY', dropoff: '222 2nd Ave, New York, NY' },
            { pickup: '333 3rd Ave, New York, NY', dropoff: '444 4th Ave, New York, NY' },
          ],
          itemType: 'boxes',
          itemSize: 'small',
          preferredDate: '2023-07-17',
          preferredTime: '09:00',
          description: 'Multiple stops for books delivery',
          customerName: 'Michael Brown',
          customerRating: 4.5,
          estimatedValue: 150,
          bids: [],
          distance: 5.0,
        },
      ];

      setJobs(mockJobs);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load jobs. Please try again.');
      setLoading(false);
    }
  };

  const getItemTypeIcon = (itemType: string) => {
    switch (itemType.toLowerCase()) {
      case 'furniture':
        return faTruck;
      case 'electronics':
        return faBox;
      case 'boxes':
        return faBox;
      case 'appliances':
        return faTruck;
      case 'specialty':
        return faBox;
      default:
        return faBox;
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      job.id.toLowerCase().includes(searchLower) ||
      (job.pickupLocation && job.pickupLocation.toLowerCase().includes(searchLower)) ||
      (job.dropoffLocation && job.dropoffLocation.toLowerCase().includes(searchLower)) ||
      (job.stops && job.stops.some(stop => stop.pickup.toLowerCase().includes(searchLower) || stop.dropoff.toLowerCase().includes(searchLower))) ||
      job.itemType.toLowerCase().includes(searchLower) ||
      job.customerName.toLowerCase().includes(searchLower);
    const matchesType = job.jobType === jobTypeFilter;
    return matchesSearch && matchesType;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'value_high':
        return b.estimatedValue - a.estimatedValue;
      case 'value_low':
        return a.estimatedValue - b.estimatedValue;
      case 'distance':
        return a.distance - b.distance;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Available Jobs</h1>
          <p className="text-gray-600">Find moving jobs in your area</p>
        </div>
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
        </div>
        {/* Type Tabs */}
        <div className="flex space-x-4">
          {typeTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setJobTypeFilter(tab.value)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                jobTypeFilter === tab.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Sort Dropdown */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-4 pr-8 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
      ) : sortedJobs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faTruck} className="text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-1">No jobs found</h3>
          <p className="text-gray-500">
            {searchTerm
              ? 'Try adjusting your search'
              : 'There are no available jobs at the moment. Check back later!'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium">Job #{job.id}</span>
                  <h2 className="text-lg font-bold">
                    {job.itemType.charAt(0).toUpperCase() + job.itemType.slice(1)} Moving
                  </h2>
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-blue-600">
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <div className="mr-4">
                      <div className="text-sm text-gray-500">Customer</div>
                      <div className="font-medium">{job.customerName}</div>
                    </div>
                    {job.customerRating && (
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                        <span>{job.customerRating}</span>
                      </div>
                    )}
                    <div className="ml-auto text-xs text-gray-500">
                      {new Date(job.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {job.jobType !== 'journey' ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-start">
                        <FontAwesomeIcon icon={faLocationDot} className="text-red-500 mt-1 mr-2" />
                        <div className="text-sm text-gray-700">{job.pickupLocation}</div>
                      </div>
                      <div className="flex items-start">
                        <FontAwesomeIcon icon={faLocationDot} className="text-green-500 mt-1 mr-2" />
                        <div className="text-sm text-gray-700">{job.dropoffLocation}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {job.stops && job.stops.map((stop, index) => (
                        <div key={index} className="flex flex-col">
                          <div className="flex items-start">
                            <FontAwesomeIcon icon={faLocationDot} className="text-red-500 mt-1 mr-2" />
                            <div className="text-sm text-gray-700">Pickup: {stop.pickup}</div>
                          </div>
                          <div className="flex items-start">
                            <FontAwesomeIcon icon={faLocationDot} className="text-green-500 mt-1 mr-2" />
                            <div className="text-sm text-gray-700">Dropoff: {stop.dropoff}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center mt-2 gap-2">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={getItemTypeIcon(job.itemType)} className="text-gray-500 mr-2" />
                      <div className="text-sm text-gray-700">
                        {job.itemType.charAt(0).toUpperCase() + job.itemType.slice(1)} &bull;{' '}
                        {job.itemSize.charAt(0).toUpperCase() + job.itemSize.slice(1)}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500 mr-2" />
                      <div className="text-sm text-gray-700">
                        {job.preferredDate} at {job.preferredTime}
                      </div>
                    </div>
                    {job.description && (
                      <div className="text-sm text-gray-600 mt-1">{job.description}</div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l md:pl-6">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {job.jobType === 'auction'
                      ? `Bid Starting at: $${job.estimatedValue.toFixed(2)}`
                      : job.jobType === 'instant'
                      ? `$${job.estimatedValue.toFixed(2)}`
                      : `Journey Price: $${job.estimatedValue.toFixed(2)}`}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">Estimated Value</div>
                  <div className="text-sm text-gray-500 mb-4">{job.distance} miles away</div>
                  <Link
                    to={`/provider/job/${job.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors duration-200"
                  >
                    {job.jobType === 'auction'
                      ? 'Place Bid'
                      : job.jobType === 'instant'
                      ? 'Book Now'
                      : 'View Journey'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobBoard;
