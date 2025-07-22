import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from '@tanstack/react-router'; // Changed imports
import { toggleSidebar } from '@/store/themeConfigSlice';
import { hasPermission, SideBarItemsFn, sideBarModulesConfig } from '@/components/generalComponents/layout/sidebarItems';
import ImageWithFallback from '@/components/UiComponents/ImageWithFallback';
import { RootState } from '@/store';
import AppCollapse from '@/components/UiComponents/Collapse/AppCollapse';
import AppLink from '@/components/UiComponents/buttons/AppLink';
import { cn } from '@/utils/helpers';
import useWindowWidth from '@/utils/hooks/useWindowWidth';

const Sidebar = () => {
  const themeConfig = useSelector((state: RootState) => state.themeConfig);
  const semidark = useSelector((state: RootState) => state.themeConfig.semidark);
  const windowWidth = useWindowWidth()
  const location = useLocation(); // Retained usage
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sideBarItems = SideBarItemsFn(sideBarModulesConfig, hasPermission);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  return (
    <div className={cn(semidark ? '' : '',"relative")}>
      <nav className={`sidebar sticky top-0 bg-body ${(themeConfig.sidebar || windowWidth < 1024 )? 'closed-side' : 'opened-side'}`} >
        <div>
          <div className="side-list border-b border-b-border h-[75px]">
            <Link to="/" className="main-logo h-full flex items-center"> {/* Changed NavLink to Link */}
              <ImageWithFallback
                className="w-full h-full object-contain flex-none"
                src={'/assets/images/logo.png'}
                alt="logo"
              />
            </Link>
          </div>

          <div className="h-[calc(100vh-75px)] overflow-y-auto relative pt-4">
            <ul className="side-list ">
              {sideBarItems.map((item: any, index: number) => {
                // Heading
                if (item.heading) {
                  return (
                    <li className="list-head" key={`heading-${index}`} >
                        {t(item.heading)}
                    </li>
                  );
                }

                if (item.items && Array.isArray(item.items)) {
                  return (
                    <li key={`collapse-${index}`} >
                      <AppCollapse
                        items={[
                          {
                            key: item.module,
                            label: (
                              <div className="nav-item-text">
                                {item.icon}
                                <span className='flex-shrink'>
                                  {t(item.label)}
                                </span>
                              </div>
                            ),
                            children: (
                              <ul className="sub-menu mt-4 text-text space-y-4">
                                {item.items.map((sub: any, subIdx: number) =>(
                                  <li key={`sub-${subIdx}`}>
                                    {/* Changed href to to for AppLink */}
                                    <AppLink to={sub.link || ''} className="flex items-center gap-2 " >
                                      {sub.icon}{themeConfig.sidebar ? "":t(sub.label)}
                                    </AppLink>
                                  </li>
                                ))}
                              </ul>
                            ),
                          },
                        ]}
                      />
                    </li>
                  );
                }

                return (
                  <li key={`link-${index}`} className="nav-item">
                    {/* Changed href to to for AppLink */}
                    <AppLink to={item.link || ''} className="group active-and-hover-side h-14">
                      <div className="nav-item-text">
                        {item.icon}
                        <span className='flex-shrink'>
                          {t(item.label)}
                        </span>
                      </div>
                    </AppLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
