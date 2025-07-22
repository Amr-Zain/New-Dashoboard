

import LoadingJson from "@/assets/icons/animated/loading.json";
import Lottie from 'lottie-react';

function LoaderPage() {

    return (
        <div className="screen_loader bg-dark fixed inset-0 z-[60] grid place-content-center animate__animated">
            <Lottie className='size-80 mx-auto' animationData={LoadingJson} loop={true} />
        </div>
    );
}

export default LoaderPage;
