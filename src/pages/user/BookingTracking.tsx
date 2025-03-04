import { faBox, faCheckCircle, faMapMarkerAlt, faPhone, faStar, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface BookingDetails {
    id: string;
    status: 'pending' | 'confirmed' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
    date: string;
    pickupLocation: string;
    dropoffLocation: string;
    itemType: string;
    itemSize: string;
    description?: string;
    provider: {
        id: string;
        name: string;
        phone: string;
        rating: number;
        vehicleType: string;
    };
    estimatedDeliveryTime?: string;
    price: number;
    trackingUpdates: {
        status: string;
        timestamp: string;
        description: string;
    }[];
}

const BookingTracking: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [booking, setBooking] = useState<BookingDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // In a real app, this would be an API call
        const fetchBooking = async () => {
            try {
                setLoading(true);

                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Mock data
                const mockBooking: BookingDetails = {
                    id: id || 'BK-12345',
                    status: 'in_transit',
                    date: '2023-06-15T10:00:00',
                    pickupLocation: '123 Main St, New York, NY',
                    dropoffLocation: '456 Park Ave, New York, NY',
                    itemType: 'Furniture',
                    itemSize: 'Large',
                    description: '1 sofa, 2 chairs, 1 coffee table',
                    provider: {
                        id: 'P-789',
                        name: "John's Moving Services",
                        phone: '(555) 123-4567',
                        rating: 4.8,
                        vehicleType: 'Large Van',
                    },
                    estimatedDeliveryTime: '2023-06-15T14:00:00',
                    price: 120.0,
                    trackingUpdates: [
                        {
                            status: 'confirmed',
                            timestamp: '2023-06-14T15:30:00',
                            description: 'Your booking has been confirmed.',
                        },
                        {
                            status: 'picked_up',
                            timestamp: '2023-06-15T10:15:00',
                            description: 'Your items have been picked up from the origin location.',
                        },
                        {
                            status: 'in_transit',
                            timestamp: '2023-06-15T11:30:00',
                            description: 'Your items are in transit to the destination.',
                        },
                    ],
                };

                setBooking(mockBooking);
                setError(null);
            } catch (err) {
                setError('Failed to load booking details. Please try again.');
                console.error('Error fetching booking:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">Booking not found.</div>
            </div>
        );
    }

    const getStatusStep = (status: string) => {
        switch (status) {
            case 'pending':
                return 0;
            case 'confirmed':
                return 1;
            case 'picked_up':
                return 2;
            case 'in_transit':
                return 3;
            case 'delivered':
                return 4;
            default:
                return 0;
        }
    };

    const currentStep = getStatusStep(booking.status);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
                    &larr; Back to Dashboard
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Tracking: {booking.id}</h1>
                        <p className="text-gray-600">Booked on {new Date(booking.date).toLocaleDateString()}</p>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{booking.status.replace('_', ' ').toUpperCase()}</span>
                    </div>
                </div>

                {/* Tracking Progress */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
                        </div>

                        <div className="flex justify-between">
                            <div className={`text-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <FontAwesomeIcon icon={faCheckCircle} className={currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'} />
                                </div>
                                <div className="text-xs mt-1">Confirmed</div>
                            </div>

                            <div className={`text-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <FontAwesomeIcon icon={faBox} className={currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'} />
                                </div>
                                <div className="text-xs mt-1">Picked Up</div>
                            </div>

                            <div className={`text-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
                                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <FontAwesomeIcon icon={faTruck} className={currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'} />
                                </div>
                                <div className="text-xs mt-1">In Transit</div>
                            </div>

                            <div className={`text-center ${currentStep >= 4 ? 'text-blue-600' : 'text-gray-500'}`}>
                                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className={currentStep >= 4 ? 'text-blue-600' : 'text-gray-400'} />
                                </div>
                                <div className="text-xs mt-1">Delivered</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Booking Details */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="mb-4">
                                <div className="text-sm text-gray-500">Item Type</div>
                                <div>
                                    {booking.itemType} - {booking.itemSize}
                                </div>
                            </div>

                            {booking.description && (
                                <div className="mb-4">
                                    <div className="text-sm text-gray-500">Description</div>
                                    <div>{booking.description}</div>
                                </div>
                            )}

                            <div className="mb-4">
                                <div className="text-sm text-gray-500">Pickup Location</div>
                                <div className="flex items-start">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                                    <div>{booking.pickupLocation}</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-sm text-gray-500">Dropoff Location</div>
                                <div className="flex items-start">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                    <div>{booking.dropoffLocation}</div>
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-500">Price</div>
                                <div className="text-lg font-semibold">${booking.price.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Provider Details */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Provider Details</h2>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                    <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                                </div>
                                <div>
                                    <div className="font-medium">{booking.provider.name}</div>
                                    <div className="flex items-center text-sm">
                                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                                        <span>{booking.provider.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-sm text-gray-500">Contact</div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-2" />
                                    <a href={`tel:${booking.provider.phone}`} className="text-blue-600">
                                        {booking.provider.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-sm text-gray-500">Vehicle Type</div>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faTruck} className="text-gray-400 mr-2" />
                                    <span>{booking.provider.vehicleType}</span>
                                </div>
                            </div>

                            {booking.estimatedDeliveryTime && (
                                <div>
                                    <div className="text-sm text-gray-500">Estimated Delivery</div>
                                    <div className="font-medium">{new Date(booking.estimatedDeliveryTime).toLocaleString()}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tracking History */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Tracking History</h2>
                <div className="space-y-4">
                    {booking.trackingUpdates.map((update, index) => (
                        <div key={index} className="flex">
                            <div className="mr-4">
                                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                {index < booking.trackingUpdates.length - 1 && <div className="w-0.5 h-full bg-blue-200 mx-auto my-1"></div>}
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">{update.status.replace('_', ' ').charAt(0).toUpperCase() + update.status.replace('_', ' ').slice(1)}</div>
                                <div className="text-sm text-gray-500">{new Date(update.timestamp).toLocaleString()}</div>
                                <div className="text-gray-700 mt-1">{update.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingTracking;
