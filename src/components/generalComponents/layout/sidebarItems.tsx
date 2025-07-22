
import { ArchiveTick, Category, Edit, Profile2User, SliderHorizontal, TableDocument, TruckFast, WalletMoney } from 'iconsax-reactjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPage4 } from 'react-icons/fa';
import { MdHomeFilled, MdPages, } from 'react-icons/md';



export type MenuItem_TP = {
    id?: string;
    icon?: React.ReactNode;
    label?: string;
    link?: string;
    heading?: string;
    permission?: string;
    items?: MenuItem_TP[] | false;
};

export type ModuleConfig_TP = {
    module: string;
    icon?: React.ReactNode;
    link?: string;
    permission?: string;
    items?: MenuItem_TP[] | true |false;
    heading?: boolean;
};

export const SideBarItemsFn = (modules: ModuleConfig_TP[], hasPermission: (perm: string) => boolean): MenuItem_TP[] => {
    const { t } = useTranslation();

    const generateItems = (config: ModuleConfig_TP): MenuItem_TP | null => {
        if (config.heading) {
            return { heading: `pages.${config.module}` };
        }

        // Check permissions
        if (config.permission && !hasPermission(config.permission)) {
            return null;
        }

        // Default to items: true if not explicitly set
        const subItems =  config.items === true
                ? [
                      {
                          icon: <TableDocument size={18} />,
                          label: t('actions.all'),
                          link: `/${config.module}`,
                      },
                      {
                          icon: <Edit size={18} />,
                          label: t('actions.add'),
                          link: `/${config.module}/add`,
                      },
                  ]
                : config.items;

        return {
            id: config.module,
            icon: config.icon,
            label: `pages.${config.module}`,
            link: config.link ? config.link : `/${config.module}`,
            items: subItems,
        };
    };

    return modules?.map(generateItems).filter((item): item is MenuItem_TP => item !== null);
};



export const hasPermission = (permission: string): boolean => {
    const userPermissions : any = [];
    return userPermissions.includes(permission);
};


export const sideBarModulesConfig: ModuleConfig_TP[] = [
    {
        module: 'home',
        icon: <Category />,
        link: '/',
        items: false,
    },
    {
        module: 'sliders',
        icon: <SliderHorizontal />,
        items: false,
        link: '/sliders',
    },
    {module: 'owner',icon: <Profile2User />, },
    {module: 'articles',icon: <WalletMoney />,items:true },
    {module: 'awards',icon: <Category />, },
    {module: 'company-features',icon: <ArchiveTick />, },
    {module: 'features',icon: <WalletMoney />, },
    {module: 'strengths',icon: <WalletMoney />, },
    {module: 'teams',icon: <WalletMoney />, },
    {module: 'images',icon: <WalletMoney />, },
    // {module: 'branches',icon: <MdLocationOn />,},
    {module: 'relations',icon: <WalletMoney />,},
    {module: 'statistics',icon: <WalletMoney />,},
    {module: 'strategy',icon: <WalletMoney />,items:false},
     //---------- start financial -------------- //
    { module: 'financials',heading: true },
    { module: 'percentages_info',icon: <WalletMoney />,items:false },
    { module: 'percentages',icon: <WalletMoney /> },
    { module: 'profits',icon: <WalletMoney /> },
    { module: 'financial',icon: <WalletMoney /> },
];
