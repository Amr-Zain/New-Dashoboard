import React from 'react';
import ReactECharts from 'echarts-for-react';
interface StatisticsCardProps {
    title: string;
    count: number;
    maxValue?: number;
    index: number;
    color?: string; 
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ 
    title, 
    count, 
    index,
    color 
}) => {
    // Get CSS custom properties for colors
    const getPrimaryColor = () => {
        const root = document.documentElement;
        const primaryRGB = getComputedStyle(root).getPropertyValue('--TW-primary-color').trim();
        const lightPrimaryRGB = getComputedStyle(root).getPropertyValue('--TW-primary-color').trim();
        return {
            primary: color || `rgb(${primaryRGB})`,
            lightPrimary: `rgb(${lightPrimaryRGB})`
        };
    };

    const generateChartData = () => {
        const colors = getPrimaryColor();
        const maxValue =  (count * 100)/75 ;
        const progressValue = Math.min((count / maxValue) * 100, 100);
        const remainingValue = 100 - progressValue;
        
        return [
            {
                value: progressValue,
                name: 'Progress',
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 1, y2: 1,
                        colorStops: [
                            { offset: 0, color: colors.primary },
                            { offset: 1, color: colors.lightPrimary }
                        ]
                    },
                    borderRadius: 8,
                    shadowBlur: 8,
                    shadowColor: colors.primary,
                    shadowOffsetY: 2
                }
            },
            {
                value: remainingValue,
                name: 'Remaining',
                itemStyle: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 0
                }
            }
        ];
    };

    const getOption = () => ({
        tooltip: {
            show: false
        },
        series: [
            {
                name: "",
                type: 'pie',
                radius: ['70%', '90%'],
                center: ['50%', '50%'],
                startAngle: 0,
                data: generateChartData(),
                emphasis: {
                    disabled: true
                },
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                animation: true,
                animationDuration: 2000
            }
        ]
    });

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    return (
        <div className="main-card !border-e-[3px] !shadow-lg min-h-[120px] flex justify-between items-center" data-aos="fade-up" data-aos-delay={`${index + 1}00`}>
            <div className="relative flex items-center justify-center">
                <div className="relative">
                    <ReactECharts
                        option={getOption()}
                        style={{ height: '80px', width: '80px' }}
                        opts={{ renderer: 'canvas' }}
                    />
                </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-1.5">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-text whitespace-nowrap">
                            {title}
                        </span>
                        <span className="text-lg font-bold"  style={{ color: getPrimaryColor().primary }} >
                            {formatNumber(count)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCard;