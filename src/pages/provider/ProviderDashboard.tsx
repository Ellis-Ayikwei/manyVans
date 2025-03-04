import { faCalendarAlt, faMoneyBillWave, faSearch, faStar, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ItemDetail {
    name: string;
    quantity: number;
    dimensions: string;
    weight: string;
}

interface Booking {
    id: string;
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
    date: string;
    pickupLocation: string;
    dropoffLocation: string;
    itemType: string;
    itemSize: string;
    customerName: string;
    customerRating?: number;
    price: number;
    // Additional AVB details
    listingId: string;
    amountDue: string;
    collection: string;
    delivery: string;
    personsRequired: string;
    pickupDate: string;
    pickupWindow: string;
    travelTime: string;
    deliveryDate: string;
    deliveryWindow: string;
    itemDetails: ItemDetail[];
    purchaseOrder: string;
    instructions: string;
}

interface Bid {
    id: string;
    bookingId: string;
    amount: number;
    status: 'pending' | 'accepted' | 'rejected';
}

interface ProviderStats {
    totalEarnings: number;
    completedBookings: number;
    pendingBookings: number;
    rating: number;
    reviewCount: number;
}

type TabType = 'bookings' | 'finished' | 'saved' | 'watching' | 'bids';

interface ChatMessage {
    id: string;
    sender: string;
    message: string;
    createdAt: string;
}

const ProviderDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('bookings');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [stats, setStats] = useState<ProviderStats | null>(null);
    const [bids, setBids] = useState<Bid[]>([]);
    const [finishedBookings, setFinishedBookings] = useState<Booking[]>([]);
    const [savedBookings, setSavedBookings] = useState<Booking[]>([]);
    const [watchingBookings, setWatchingBookings] = useState<Booking[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        // Load mock data – replace these with API calls as needed
        fetchStats();
        fetchBookings();
        fetchBids();
        fetchFinishedBookings();
        fetchSavedBookings();
        fetchWatchingBookings();
        // Dummy chat messages
        setChatMessages([
            { id: 'msg-1', sender: 'AnyVan Team', message: 'Please verify the item dimensions.', createdAt: new Date().toISOString() },
            { id: 'msg-2', sender: 'You', message: 'Will do.', createdAt: new Date().toISOString() },
        ]);
    }, []);

    const fetchStats = () => {
        const mockStats: ProviderStats = {
            totalEarnings: 2750,
            completedBookings: 23,
            pendingBookings: 5,
            rating: 4.8,
            reviewCount: 19,
        };
        setStats(mockStats);
    };

    const fetchBookings = () => {
        const mockBookings: Booking[] = [
            {
                id: 'BK-8746386',
                status: 'pending',
                date: '2024-03-20T14:00:00',
                pickupLocation: '123 Main St, New York, NY',
                dropoffLocation: '456 Park Ave, New York, NY',
                itemType: 'Furniture & Appliances',
                itemSize: 'Various',
                customerName: 'John Smith',
                customerRating: 4.7,
                price: 211.67,
                listingId: '8746386',
                amountDue: '£211.67',
                collection: 'Manchester, M19',
                delivery: 'Maidstone, ME16',
                personsRequired: 'More than one person',
                pickupDate: 'Today',
                pickupWindow: '12 - 4pm',
                travelTime: '4:29 hours',
                deliveryDate: 'Tomorrow',
                deliveryWindow: '9am - 12pm',
                itemDetails: [
                    { name: 'Worktop', quantity: 14, dimensions: '300 × 4 × 67 cm', weight: '50 kg' },
                    { name: 'Worktop', quantity: 2, dimensions: '410 × 4 × 66 cm', weight: '60 kg' },
                    { name: 'Splashback', quantity: 9, dimensions: '300 × 8 × 121 cm', weight: '25 kg' },
                    { name: 'Small bag', quantity: 1, dimensions: '50 × 47 × 50 cm', weight: '5 kg' },
                ],
                purchaseOrder: 'MSO0197001',
                instructions:
                    'Read ALL instructions before accepting.\nClear photos of items at collection, in the van and at delivery are mandatory.\nCall delivery customer when 1 hour away.\nDeliver to room of choice.\nContact AnyVan Business with issues or delays: 02038682704.\nCall when near for directions.',
            },
            // Add more bookings as needed
        ];
        setBookings(mockBookings);
    };

    const fetchBids = () => {
        const mockBids: Bid[] = [
            { id: 'BID-001', bookingId: 'BK-8746386', amount: 200, status: 'pending' },
            { id: 'BID-002', bookingId: 'BK-8746386', amount: 205, status: 'accepted' },
        ];
        setBids(mockBids);
    };

    const fetchFinishedBookings = () => {
        const mockFinished: Booking[] = [
            {
                id: 'BK-54321',
                status: 'completed',
                date: '2024-02-15T10:00:00',
                pickupLocation: '789 ABC St, City',
                dropoffLocation: '456 DEF St, City',
                itemType: 'Electronics',
                itemSize: 'Medium',
                customerName: 'Alice Brown',
                customerRating: 4.9,
                price: 90,
                listingId: '54321',
                amountDue: '£90.00',
                collection: 'City Center, C1',
                delivery: 'Suburbs, S1',
                personsRequired: '1 person',
                pickupDate: '2024-02-15',
                pickupWindow: '9am - 11am',
                travelTime: '1.5 hours',
                deliveryDate: '2024-02-15',
                deliveryWindow: '11am - 1pm',
                itemDetails: [{ name: 'TV', quantity: 1, dimensions: '120 × 70 × 10 cm', weight: '15 kg' }],
                purchaseOrder: 'PO-54321',
                instructions: 'Handle with care.',
            },
        ];
        setFinishedBookings(mockFinished);
    };

    const fetchSavedBookings = () => {
        const mockSaved: Booking[] = [
            {
                id: 'BK-67890',
                status: 'pending',
                date: '2024-04-10T14:00:00',
                pickupLocation: '321 XYZ Ave, City',
                dropoffLocation: '654 LMN Blvd, City',
                itemType: 'Furniture',
                itemSize: 'Large',
                customerName: 'Bob Smith',
                price: 150,
                listingId: '67890',
                amountDue: '£150.00',
                collection: 'City Center, C2',
                delivery: 'Outskirts, O1',
                personsRequired: '2 persons',
                pickupDate: '2024-04-10',
                pickupWindow: '10am - 2pm',
                travelTime: '2 hours',
                deliveryDate: '2024-04-11',
                deliveryWindow: '9am - 12pm',
                itemDetails: [{ name: 'Dining Table', quantity: 1, dimensions: '200 × 100 × 75 cm', weight: '80 kg' }],
                purchaseOrder: 'PO-67890',
                instructions: 'Customer requires assembly on delivery.',
            },
        ];
        setSavedBookings(mockSaved);
    };

    const fetchWatchingBookings = () => {
        const mockWatching: Booking[] = [
            {
                id: 'BK-11111',
                status: 'pending',
                date: '2024-05-05T09:00:00',
                pickupLocation: '123 Start St, City',
                dropoffLocation: '789 End Rd, City',
                itemType: 'Boxes',
                itemSize: 'Small',
                customerName: 'Charlie Davis',
                price: 200,
                listingId: '11111',
                amountDue: '£200.00',
                collection: 'Downtown, D1',
                delivery: 'Suburb, S2',
                personsRequired: '2 persons',
                pickupDate: '2024-05-05',
                pickupWindow: '8am - 10am',
                travelTime: '3 hours',
                deliveryDate: '2024-05-05',
                deliveryWindow: '1pm - 4pm',
                itemDetails: [{ name: 'Boxes', quantity: 20, dimensions: '40 × 40 × 40 cm', weight: '5 kg each' }],
                purchaseOrder: 'PO-11111',
                instructions: 'Ensure boxes are securely taped.',
            },
        ];
        setWatchingBookings(mockWatching);
    };

    const getStatusBadgeClass = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'accepted':
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

    const getStatusText = (status: string): string => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'accepted':
                return 'Accepted';
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

    // Render a booking card with all details
    const renderBookingCard = (booking: Booking) => (
        <div key={booking.id} className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-3xl mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
                <div>
                    <span className="text-sm font-medium">Listing ID: {booking.listingId}</span>
                    <h2 className="text-lg font-bold">Booking #{booking.id}</h2>
                </div>
                <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>{getStatusText(booking.status)}</span>
                </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left Column: AVB Details */}
                <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-sm">Collection</h3>
                            <p className="text-sm text-gray-700">{booking.collection}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Delivery</h3>
                            <p className="text-sm text-gray-700">{booking.delivery}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Persons Required</h3>
                            <p className="text-sm text-gray-700">{booking.personsRequired}</p>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-sm mb-2">Timing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div>
                                <p className="text-xs text-gray-500">Pickup</p>
                                <p className="text-sm text-gray-700">
                                    {booking.pickupDate} ({booking.pickupWindow})
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Travel Time</p>
                                <p className="text-sm text-gray-700">{booking.travelTime}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Delivery</p>
                                <p className="text-sm text-gray-700">
                                    {booking.deliveryDate} ({booking.deliveryWindow})
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-sm mb-2">Item Details</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {booking.itemDetails.map((item, index) => (
                                <li key={index}>
                                    {item.quantity} × {item.name} – {item.dimensions}, {item.weight}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-sm mb-2">Purchase Order</h3>
                        <p className="text-sm text-gray-700">{booking.purchaseOrder} - AVB JOB</p>
                    </div>
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-sm mb-2">Special Instructions</h3>
                        <p className="text-sm text-gray-700 whitespace-pre-line">{booking.instructions}</p>
                    </div>
                </div>
                {/* Right Column: Action Panel */}
                <div className="border-t md:border-t-0 md:border-l md:pl-6 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">${booking.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-500 mb-2">Price</div>
                    <div className="text-sm text-gray-500 mb-4">
                        {booking.pickupLocation} → {booking.dropoffLocation}
                    </div>
                    <Link to={`/provider/booking/${booking.id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors duration-200">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );

    // Filter bookings based on search and status
    const filteredBookings = bookings.filter((booking) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            booking.id.toLowerCase().includes(searchLower) ||
            booking.customerName.toLowerCase().includes(searchLower) ||
            booking.pickupLocation.toLowerCase().includes(searchLower) ||
            booking.dropoffLocation.toLowerCase().includes(searchLower);
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const message = {
            id: `msg-${Date.now()}`,
            sender: 'You',
            message: newMessage,
            createdAt: new Date().toISOString(),
        };
        setChatMessages([...chatMessages, message]);
        setNewMessage('');
    };

    return (
        <div className="w-full mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Earnings</p>
                            <p className="text-xl font-semibold">${stats.totalEarnings.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                            <FontAwesomeIcon icon={faTruck} className="text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Completed Bookings</p>
                            <p className="text-xl font-semibold">{stats.completedBookings}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Bookings</p>
                            <p className="text-xl font-semibold">{stats.pendingBookings}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                            <FontAwesomeIcon icon={faStar} className="text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Rating</p>
                            <div className="flex items-center">
                                <p className="text-xl font-semibold mr-1">{stats.rating}</p>
                                <span className="text-sm text-gray-500">({stats.reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs for Provider Dashboard */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'bookings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        My Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('finished')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'finished' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Finished Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'saved' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Saved Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab('watching')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'watching' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Watching Jobs
                    </button>
                    <button
                        onClick={() => setActiveTab('bids')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'bids' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        My Bids
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'bookings' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
                    {bookings.length === 0 ? <p className="text-gray-500">No bookings found.</p> : bookings.map((booking) => renderBookingCard(booking))}
                </div>
            )}

            {activeTab === 'finished' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Finished Jobs</h2>
                    {finishedBookings.length === 0 ? <p className="text-gray-500">No finished jobs.</p> : finishedBookings.map((booking) => renderBookingCard(booking))}
                </div>
            )}

            {activeTab === 'saved' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
                    {savedBookings.length === 0 ? <p className="text-gray-500">No saved jobs.</p> : savedBookings.map((booking) => renderBookingCard(booking))}
                </div>
            )}

            {activeTab === 'watching' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Watching Jobs</h2>
                    {watchingBookings.length === 0 ? <p className="text-gray-500">No watching jobs.</p> : watchingBookings.map((booking) => renderBookingCard(booking))}
                </div>
            )}

            {activeTab === 'bids' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">My Bids</h2>
                    {bids.length === 0 ? (
                        <p className="text-gray-500">You have not placed any bids yet.</p>
                    ) : (
                        bids.map((bid) => (
                            <div key={bid.id} className="bg-white rounded shadow p-4 mb-4">
                                <p className="font-medium">Booking ID: {bid.bookingId}</p>
                                <p className="text-sm">Bid Amount: £{bid.amount.toFixed(2)}</p>
                                <p className="text-sm">Status: {bid.status}</p>
                                <Link to={`/provider/booking/${bid.bookingId}`} className="text-blue-600 hover:underline text-sm">
                                    View Booking
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Chat / Comments Section */}
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
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                        Send
                    </button>
                </form>
            </div>

            <div className="mt-8">
                <Link to="/provider/jobs" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center justify-center">
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    Find Jobs
                </Link>
            </div>
        </div>
    );
};

export default ProviderDashboard;
