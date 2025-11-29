import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as LucideIcons from 'lucide-react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import Navbar from '../../components/Navbar';
import BackButton from '../../components/BackButton';

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: 'Activity',
        color: 'blue',
        link: '',
        actionType: 'link',
        actionValue: '',
        isActive: true
    });

    const iconList = Object.keys(LucideIcons).filter(key => key !== 'createLucideIcon' && key !== 'default');
    const colorOptions = ['red', 'blue', 'purple', 'pink', 'green', 'teal', 'orange', 'indigo', 'cyan'];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/services/admin`, config);
            setServices(res.data.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            if (currentService) {
                await axios.put(`${import.meta.env.VITE_API_URL}/services/${currentService._id}`, formData, config);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/services`, formData, config);
            }

            setIsEditing(false);
            setCurrentService(null);
            setFormData({
                title: '',
                description: '',
                icon: 'Activity',
                color: 'blue',
                link: '',
                actionType: 'link',
                actionValue: '',
                isActive: true
            });
            fetchServices();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving service');
        }
    };

    const handleEdit = (service) => {
        setCurrentService(service);
        setFormData({
            title: service.title,
            description: service.description,
            icon: service.icon,
            color: service.color,
            link: service.link || '',
            actionType: service.actionType || 'link',
            actionValue: service.actionValue || '',
            isActive: service.isActive
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`, config);
                fetchServices();
            } catch (error) {
                console.error('Error deleting service:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
                <BackButton className="mb-6" />
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Management</h1>
                    <button
                        onClick={() => {
                            setIsEditing(true);
                            setCurrentService(null);
                            setFormData({
                                title: '',
                                description: '',
                                icon: 'Activity',
                                color: 'blue',
                                link: '',
                                actionType: 'link',
                                actionValue: '',
                                isActive: true
                            });
                        }}
                        className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Service
                    </button>
                </div>

                {isEditing && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {currentService ? 'Edit Service' : 'Add New Service'}
                                </h2>
                                <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                                        <select
                                            name="icon"
                                            value={formData.icon}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                        >
                                            {iconList.map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                                        <select
                                            name="color"
                                            value={formData.color}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                        >
                                            {colorOptions.map(color => (
                                                <option key={color} value={color}>{color}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action Type</label>
                                        <select
                                            name="actionType"
                                            value={formData.actionType}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                        >
                                            <option value="link">Link</option>
                                            <option value="modal">Modal</option>
                                            <option value="call">Call</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {formData.actionType === 'link' ? 'URL / Route' : formData.actionType === 'call' ? 'Phone Number' : 'Modal Content'}
                                        </label>
                                        <input
                                            type="text"
                                            name="actionValue"
                                            value={formData.actionValue}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows="3"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-cyan-500"
                                        ></textarea>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Active</label>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Service
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const Icon = LucideIcons[service.icon] || LucideIcons.Activity;
                        return (
                            <div key={service._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative group">
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className={`w-12 h-12 bg-${service.color}-100 text-${service.color}-600 rounded-lg flex items-center justify-center mb-4`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                                <div className="text-sm text-gray-500">
                                    <span className={`px-2 py-1 rounded-full text-xs ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {service.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                    <span className="ml-2 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                        {service.actionType}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServiceManager;
