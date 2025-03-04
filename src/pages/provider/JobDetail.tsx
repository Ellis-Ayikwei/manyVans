import { faArrowLeft, faBox, faCalendar, faLocationDot, faMoneyBill, faStar, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

interface ItemDetail {
  name: string;
  quantity: number;
  dimensions: string;
  weight: string;
}

interface Job {
  id: string;
  // Job types: instant (direct booking), auction (allows bidding), or journey (multi-stop)
  jobType: 'instant' | 'auction' | 'journey';
  status: 'open' | 'bidding' | 'assigned' | 'completed' | 'cancelled';
  createdAt: string;
  // For instant & auction jobs:
  pickupLocation?: string;
  dropoffLocation?: string;
  // For journey jobs:
  stops?: { pickup: string; dropoff: string }[];
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
  // Additional AVB details
  listingId: string;
  amountDue: string;
  collection: string;
  delivery: string;
  personsRequired: string;
  pickupWindow: string;
  travelTime: string;
  deliveryWindow: string;
  itemDetails: ItemDetail[];
  purchaseOrder: string;
  instructions: string;
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

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  createdAt: string;
}

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  
  // Auction tab state and bid form fields (for auction jobs)
  const [activeAuctionTab, setActiveAuctionTab] = useState<string>('bids');
  const [bidAmount, setBidAmount] = useState<string>('');
  const [bidMessage, setBidMessage] = useState<string>('');

  useEffect(() => {
    fetchJobDetails();
    // Initialize some dummy chat messages
    setChatMessages([
      { id: 'msg-1', sender: 'Provider A', message: 'Is the pickup location accessible?', createdAt: new Date().toISOString() },
      { id: 'msg-2', sender: 'Customer', message: 'Yes, there is a ramp available.', createdAt: new Date().toISOString() },
    ]);
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a mock job that includes all the AVB details
      const mockJob: Job = {
        id: 'JOB-8746386',
        jobType: 'auction', // Try changing to 'instant' or 'journey' to test layouts.
        status: 'open',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        pickupLocation: '123 Main St, New York, NY',
        dropoffLocation: '456 Park Ave, New York, NY',
        // For journey jobs, you could use stops instead of pickup/dropoff.
        itemType: 'Furniture & Appliances',
        itemSize: 'Various',
        preferredDate: 'Today',
        preferredTime: '12:00 - 4:00pm',
        description: 'Please read ALL instructions carefully before accepting. Clear photos at collection, in the van and at delivery are mandatory.',
        customerName: 'John Smith',
        customerRating: 4.7,
        estimatedValue: 211.67,
        bids: [
          {
            id: 'BID-001',
            providerId: 'P-001',
            providerName: 'Fast Movers',
            amount: 200,
            estimatedTime: new Date(Date.now() + 3600000).toISOString(),
            message: 'We can pick up in 1 hour.',
            createdAt: new Date(Date.now() - 1800000).toISOString(),
          },
          {
            id: 'BID-002',
            providerId: 'P-002',
            providerName: 'Express Logistics',
            amount: 205,
            estimatedTime: new Date(Date.now() + 5400000).toISOString(),
            message: 'Available immediately.',
            createdAt: new Date(Date.now() - 1200000).toISOString(),
          },
        ],
        distance: 257,
        listingId: '8746386',
        amountDue: '£211.67',
        collection: 'Manchester, M19',
        delivery: 'Maidstone, ME16',
        personsRequired: 'More than one person',
        pickupWindow: '12 - 4pm',
        travelTime: '4:29 hours',
        deliveryWindow: '9am - 12pm',
        itemDetails: [
          { name: 'Worktop', quantity: 14, dimensions: '300 × 4 × 67 cm', weight: '50 kg' },
          { name: 'Worktop', quantity: 2, dimensions: '410 × 4 × 66 cm', weight: '60 kg' },
          { name: 'Splashback', quantity: 9, dimensions: '300 × 8 × 121 cm', weight: '25 kg' },
          { name: 'Small bag', quantity: 1, dimensions: '50 × 47 × 50 cm', weight: '5 kg' },
        ],
        purchaseOrder: 'MSO0197001',
        instructions:
          'Read ALL instructions before accepting.\nClear photos of items at collection, in the van and at delivery are mandatory or you may be held liable for damage.\nCall delivery customer when 1 hour away.\nDeliver to room of choice.\nContact AnyVan Business with issues or delays: 02038682704.\nPlease call when near for directions for delivery.',
      };

      setJob(mockJob);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load job details. Please try again.');
      setLoading(false);
    }
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      message: newMessage,
      createdAt: new Date().toISOString(),
    };
    setChatMessages([...chatMessages, message]);
    setNewMessage('');
  };

  const handleSubmitBid = (e: FormEvent) => {
    e.preventDefault();
    if (!bidAmount.trim()) return;
    // Simulate bid submission – in a real app, call your API
    alert(`Bid of £${bidAmount} submitted with message: ${bidMessage}`);
    setBidAmount('');
    setBidMessage('');
  };

  const getItemTypeIcon = (itemType: string) => {
    // For this example, we use a generic icon
    return faBox;
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="w-full px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error || 'Job not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full px-4 py-8">
        <Link to="/provider/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Job Board
        </Link>

        <div className="bg-white w-full rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Listing ID: {job.listingId}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Amount due to you: <span className="font-semibold">{job.amountDue}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{job.distance} miles</div>
                <div className="text-sm text-gray-500">Distance</div>
              </div>
            </div>

            {/* Collection & Delivery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Collection</h2>
                <p className="text-sm text-gray-700">{job.collection}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Delivery</h2>
                <p className="text-sm text-gray-700">{job.delivery}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Persons Required</h2>
                <p className="text-sm text-gray-700">{job.personsRequired}</p>
              </div>
            </div>

            {/* Timing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 border-t pt-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Pickup</h2>
                <p className="text-sm text-gray-700">{job.pickupDate} ({job.pickupWindow})</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Journey Duration</h2>
                <p className="text-sm text-gray-700">{job.travelTime}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Delivery</h2>
                <p className="text-sm text-gray-700">{job.deliveryDate} ({job.deliveryWindow})</p>
              </div>
            </div>

            {/* Item Details */}
            <div className="mb-6 border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Item Details</h2>
              <ul className="space-y-3">
                {job.itemDetails.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    <span className="font-semibold">{item.quantity} × {item.name}</span> &mdash; Dimensions: {item.dimensions}, Weight: {item.weight}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-700 mt-2">Total Volume Estimate: 4.1 cubic metres</p>
            </div>

            {/* Purchase Order & Instructions */}
            <div className="mb-6 border-t pt-6">
              <h2 className="text-lg font-semibold mb-2">Purchase Order</h2>
              <p className="text-sm text-gray-700">{job.purchaseOrder} - AVB JOB</p>
              <h2 className="text-lg font-semibold mt-4 mb-2">Special Instructions</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{job.instructions}</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Left Column: Basic Job Details */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold">Job Details</h2>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={getItemTypeIcon(job.itemType)} className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">
                    {job.itemType} - {job.itemSize}
                  </span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">
                    Preferred: {job.preferredDate} at {job.preferredTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faTruck} className="text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">{job.distance} miles away</span>
                </div>
                {job.description && (
                  <div className="text-sm text-gray-700">
                    <h3 className="font-semibold">Description:</h3>
                    <p>{job.description}</p>
                  </div>
                )}
              </div>

              {/* Right Column: Action Panel */}
              <div className="border-t md:border-t-0 md:border-l md:pl-6">
                {job.jobType === 'auction' ? (
                  <div>
                    {/* Auction Tab Headers */}
                    <div className="flex border-b mb-4">
                      <button
                        onClick={() => setActiveAuctionTab('bids')}
                        className={`px-4 py-2 transition-colors duration-200 ${
                          activeAuctionTab === 'bids'
                            ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                            : 'text-gray-600'
                        }`}
                      >
                        Current Bids
                      </button>
                      <button
                        onClick={() => setActiveAuctionTab('place')}
                        className={`px-4 py-2 transition-colors duration-200 ${
                          activeAuctionTab === 'place'
                            ? 'border-b-2 border-blue-600 text-blue-600 font-bold'
                            : 'text-gray-600'
                        }`}
                      >
                        Place Bid
                      </button>
                    </div>
                    {activeAuctionTab === 'bids' ? (
                      <>
                        {job.bids.length === 0 ? (
                          <p className="text-gray-500 text-sm">No bids yet</p>
                        ) : (
                          <div className="space-y-4">
                            {job.bids.map((bid) => (
                              <div key={bid.id} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-medium text-sm">{bid.providerName}</div>
                                    <div className="text-xs text-gray-500">{new Date(bid.createdAt).toLocaleString()}</div>
                                  </div>
                                  <div className="text-lg font-bold">${bid.amount.toFixed(2)}</div>
                                </div>
                                {bid.message && <div className="mt-2 text-sm text-gray-700">{bid.message}</div>}
                                <div className="mt-2 text-xs text-gray-500">
                                  Est. completion: {new Date(bid.estimatedTime).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      // Place Bid Form
                      <form onSubmit={handleSubmitBid} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Bid Amount (£)</label>
                          <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder="Enter your bid"
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                          <textarea
                            value={bidMessage}
                            onChange={(e) => setBidMessage(e.target.value)}
                            placeholder="Enter a message"
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors duration-200"
                        >
                          Submit Bid
                        </button>
                      </form>
                    )}
                  </div>
                ) : job.jobType === 'instant' ? (
                  <div className="mt-6">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded text-center transition-colors duration-200">
                      Book Now
                    </button>
                  </div>
                ) : job.jobType === 'journey' ? (
                  <div className="mt-6">
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded text-center transition-colors duration-200">
                      Apply for Journey
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Comments / Chat Section */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Comments & Chat</h2>
              <div className="space-y-4 mb-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
