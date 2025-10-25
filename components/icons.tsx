
import React from 'react';

export const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className || "w-6 h-6"}
  >
    <path fillRule="evenodd" d="M9.315 7.585a.75.75 0 01.32.659v.192l-1.326 3.977a.75.75 0 01-1.49-.038l1.326-3.977a.75.75 0 011.17-.621zM11.204 14.13A.75.75 0 0110.5 15v.192l-1.326 3.977a.75.75 0 01-1.49-.038l1.326-3.977a.75.75 0 011.17-.621z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M15.565 7.585a.75.75 0 01.32.659v.192l-1.326 3.977a.75.75 0 01-1.49-.038l1.326-3.977a.75.75 0 011.17-.621zM17.454 14.13a.75.75 0 01-.704.839v.192l-1.326 3.977a.75.75 0 01-1.49-.038l1.326-3.977a.75.75 0 011.17-.621z" clipRule="evenodd" />
    <path d="M10.5 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM16.5 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM3 12.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM18 12.75a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM12.75 3a.75.75 0 01-.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112.75 3zM12.75 18a.75.75 0 01-.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0z" />
    <path d="M5.632 4.22a.75.75 0 011.06 0l.685.686a.75.75 0 11-1.06 1.06l-.685-.685a.75.75 0 010-1.06zM17.632 16.22a.75.75 0 011.06 0l.685.686a.75.75 0 11-1.06 1.06l-.685-.685a.75.75 0 010-1.06zM4.572 17.282a.75.75 0 010 1.06l-.685.685a.75.75 0 11-1.06-1.06l.685-.685a.75.75 0 011.06 0zM16.572 5.282a.75.75 0 010 1.06l-.685.685a.75.75 0 11-1.06-1.06l.685-.685a.75.75 0 011.06 0z" />
  </svg>
);


export const UploadIcon: React.FC = () => (
    <svg className="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>
);

export const ImageIcon: React.FC = () => (
    <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 17 12 11l-5 5"/>
    </svg>
);

export const DownloadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const EnlargeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

export const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const FilmIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
        <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h15a3 3 0 003-3v-9a3 3 0 00-3-3h-15z" />
        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v.008c0 .414-.336.75-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm.75 3a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75H9a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H7.5zm.75 3.75a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v.008c0 .414-.336.75-.75.75H7.5a.75.75 0 01-.75-.75v-.008zm.75 3a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75H9a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H7.5zm6-6.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.008c0 .414-.336.75-.75.75h-1.5a.75.75 0 01-.75-.75V5.25zm.75 3a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-1.5zm.75 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.008c0 .414-.336.75-.75.75h-1.5a.75.75 0 01-.75-.75v-.008zm.75 3a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-1.5z" clipRule="evenodd" fill="#fff" />
    </svg>
);

export const CutIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M7.121 2.86a.75.75 0 01.316.924l-1.63 4.891 2.404-2.405a.75.75 0 011.06 1.06L7.166 9.434a.75.75 0 01-1.06-1.06l2.106-2.105-3.174 3.173-2.106-2.105a.75.75 0 010-1.06l4.242-4.243a.75.75 0 01.748-.214zM13.21 11.192a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
        <path d="M11.66 11.285a2.25 2.25 0 013.182 3.182l-5.385 5.385a2.25 2.25 0 01-3.182-3.182l5.385-5.385z" />
        <path fillRule="evenodd" d="M16.879 21.14a.75.75 0 01-.316-.924l1.63-4.891-2.404 2.405a.75.75 0 01-1.06-1.06l2.105-2.105a.75.75 0 011.06 1.06L15.79 17.73l3.174-3.173 2.106 2.105a.75.75 0 010 1.06l-4.242 4.243a.75.75 0 01-.748.214z" clipRule="evenodd" />
    </svg>
);

export const CameraIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
        <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.787.218 2.53.464.74.246 1.374.586 1.94.997.566.41.983.898 1.284 1.485.301.586.468 1.258.468 2.022v7.928c0 .764-.167 1.437-.468 2.022-.301.587-.718 1.075-1.284 1.485-.566.41-1.2.75-1.94.997a49.52 49.52 0 01-5.312 0c-.967-.052-1.787-.218-2.53-.464a6.602 6.602 0 01-1.94-.997c-.566-.41-.983-.898-1.284-1.485-.301-.587-.468-1.259-.468-2.022V9.043c0-.764.167-1.437.468-2.022.301-.587.718-1.075 1.284-1.485.566-.41 1.2-.75 1.94-.997zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
    </svg>
);

export const ChevronDownIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);
