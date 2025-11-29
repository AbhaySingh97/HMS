import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = "absolute top-4 left-4" }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`flex items-center text-gray-600 hover:text-blue-600 transition-colors z-50 ${className}`}
        >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
        </button>
    );
};

export default BackButton;
