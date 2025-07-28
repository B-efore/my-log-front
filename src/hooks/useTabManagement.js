import { useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const useTabManagement = (defaultTab = 'home') => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const activeTab = searchParams.get('tab') || defaultTab;

    const setActiveTab = useCallback((tab) => {
        navigate(`?tab=${tab}`, { replace: true });
    }, [navigate]);

    return { activeTab, setActiveTab };
};