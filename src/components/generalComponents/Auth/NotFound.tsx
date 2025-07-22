import { Link } from '@tanstack/react-router'; 
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import NotFoundJson from "@/assets/icons/animated/404.json";
import Lottie from 'lottie-react';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="min-h-[calc(100vh-150px)] main-card  flex flex-col items-center justify-center space-y-10">
            <Lottie className='h-[400px] mx-auto' animationData={NotFoundJson} loop={true} />
            <p className="text-xl text-gray-500 mt-2 font-medium">{t('wrong_page')}</p>
            <Link to="/"  className="app-btn btn-primary">
                {t('go_home')}
            </Link>
        </div>
    );
}
