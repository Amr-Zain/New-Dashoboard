// import { createFileRoute } from '@tanstack/react-router';
// import { useEffect, useState } from 'react';

// // ✨ نعرف ErrorPage الأول
// const ErrorPage = ({ error }: { error: unknown }) => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white text-center">
//       {!isOnline ? (
//         <div>
//           <h1 className="text-3xl font-bold text-red-600">🚫 النت فصل</h1>
//           <p className="mt-4 text-gray-600">تأكد من الاتصال بالإنترنت وحاول تاني.</p>
//         </div>
//       ) : (
//         <div>
//           <h1 className="text-3xl font-bold text-red-600">❌ فيه مشكلة</h1>
//           <p className="mt-4 text-gray-600">حصل خطأ أثناء تحميل البيانات. جرب تاني بعد شوية.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // export const Route = createFileRoute('/ErrorPage')({
// //   component: ErrorPage,
// // });

// export default ErrorPage;
