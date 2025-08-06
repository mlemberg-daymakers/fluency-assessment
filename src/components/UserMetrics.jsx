import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, UserPlus, UserMinus } from 'lucide-react';
import Chart from 'react-apexcharts';

const UserMetrics = () => {
  const [mounted, setMounted] = useState(false);

  // Generate last 10 days dynamically
  const generateDateLabels = () => {
    const labels = [];
    const today = new Date();
    
    for (let i = 9; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      labels.push(`${month} ${day}`);
    }
    
    return labels;
  };

  const dateLabels = generateDateLabels();
  
  // Sample data
  const newUsersData = [3, 5, 1, 0, 2, 7, 1, 9, 13, 3];
  const usersGainedLostData = [2, -3, 5, 1, -1, 0, -2, 4, 1, -2];

  // Calculate totals for summary cards
  const totalNewUsers = newUsersData.reduce((sum, val) => sum + val, 0);
  const netUserChange = usersGainedLostData.reduce((sum, val) => sum + val, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Apex Charts components
  const AreaChart = ({ data }) => {
    const chartOptions = {
              chart: {
        type: 'area',
        height: 256,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      markers: {
        size: 4,
        colors: ['#ffffff'],
        strokeColors: '#6366f1',
        strokeWidth: 2,
        hover: {
          size: 6
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#8b5cf6'],
          inverseColors: false,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      colors: ['#6366f1'],
      grid: {
        show: true,
        borderColor: '#e2e8f0',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        row: {
          colors: undefined,
          opacity: 0.5
        },
                column: {
          colors: undefined,
          opacity: 0.5
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 5
        }
      },
      xaxis: {
        categories: dateLabels,
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '13px',
            fontFamily: "'Inter', 'system-ui', sans-serif", fontWeight: '500'
          },
          show: true,
          rotate: 0,
          maxHeight: 30,
          formatter: function(value) {
            return value || '';
          }
        },
        tickAmount: 3,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px',
            fontFamily: "'Inter', 'system-ui', sans-serif", fontWeight: '500'
          }
        }
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: "'Inter', 'system-ui', sans-serif", fontWeight: '500'
        },
        x: {
          show: true,
          format: 'MMM dd'
        },
        y: {
          title: {
            formatter: () => 'New Users: '
          }
        },
        marker: {
          show: true
        },
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const value = series[seriesIndex][dataPointIndex];
          const date = w.globals.categoryLabels[dataPointIndex];
          return '<div style="background-color: rgb(0, 20, 14); color: white; padding: 8px 12px; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.1);">' +
                 '<div style="font-size: 11px; color: rgba(255, 255, 255, 0.7); margin-bottom: 4px;">' + date + '</div>' +
                 '<div style="font-size: 14px; font-weight: 600;">New Users: ' + value + '</div>' +
                 '</div>';
        }
      }
    };

    const series = [{
      name: 'New Users',
      data: data
    }];

    return (
      <div className="h-64 w-full">
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height={256}
        />
      </div>
    );
  };

  const BarChart = ({ data }) => {
    // Calculate explicit y-axis range
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const yAxisMin = minValue < 0 ? Math.floor(minValue * 1.1) : 0;
    const yAxisMax = Math.ceil(maxValue * 1.1);

    // Create colors array with current day highlighted and non-current days more muted
    const barColors = data.map((value, index) => {
      const isCurrentDay = index === data.length - 1;
      
      if (value > 0) {
        return isCurrentDay ? '#16a34a' : '#86efac'; // Darker green for current day, much lighter/muted for others
      } else if (value < 0) {
        return isCurrentDay ? '#dc2626' : '#fca5a5'; // Darker red for current day, much lighter/muted for others
      } else {
        return '#d1d5db'; // More muted gray for zero values
      }
    });

    const chartOptions = {
              chart: {
        type: 'bar',
        height: 256,
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
          endingShape: 'rounded',
          borderRadius: 2,
          distributed: true // This allows individual bar colors
        }
      },

      dataLabels: {
        enabled: false, // Remove labels on bars
      },
      colors: barColors,
      stroke: {
        width: [0, 3],
        curve: 'smooth'
      },
      grid: {
        show: true,
        borderColor: '#e2e8f0',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
                      left: 15
        }
      },
      xaxis: {
        categories: dateLabels,
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '13px',
            fontFamily: "'Inter', 'system-ui', sans-serif", fontWeight: '500'
          },
          show: true,
          rotate: 0,
          maxHeight: 30,
          formatter: function(value) {
            return value || '';
          }
        },
        tickAmount: 3,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px',
            fontFamily: "'Inter', 'system-ui', sans-serif", fontWeight: '500'
          }
        }
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: "'Inter', 'system-ui', sans-serif", fontWeight: '500'
        },
        x: {
          show: true,
          format: 'MMM dd'
        },
        y: {
          title: {
            formatter: () => 'Net Change: '
          },
          formatter: function(val) {
            return val > 0 ? `+${val}` : val;
          }
        },
        marker: {
          show: true
        },
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const value = series[seriesIndex][dataPointIndex];
          const date = w.globals.labels[dataPointIndex] || w.config.xaxis.categories[dataPointIndex] || 'N/A';
          const isPositive = value > 0;
          const isNegative = value < 0;
          const valueColor = isPositive ? '#22c55e' : isNegative ? '#ef4444' : '#9ca3af';
          const formattedValue = isPositive ? `+${value}` : value;
          
          return '<div style="background-color: rgb(0, 20, 14); color: white; padding: 8px 12px; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.1);">' +
                 '<div style="font-size: 11px; color: rgba(255, 255, 255, 0.7); margin-bottom: 4px;">' + date + '</div>' +
                 '<div style="font-size: 14px; font-weight: 600;">Net Change: <span style="color: ' + valueColor + ';">' + formattedValue + '</span></div>' +
                 '</div>';
        }
      },
      legend: {
        show: false // Hide legend since we're using distributed colors
      },

    };

    const series = [{
      name: 'Users Gained/Lost',
      data: data
    }];



    return (
      <div className="h-64 w-full">
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={256}
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 md:space-y-12">
      {/* Logo */}
      <div className={`flex justify-center mt-6 mb-12 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <img 
          src="/src/assets/fluency-logo.png" 
          alt="Fluency Logo" 
          className="h-16"
        />
        
      </div>
      
      {/* Header */}
      <div className={`text-center transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 flex items-center justify-center gap-4 font-sans tracking-tight">
          <div className="p-3 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl shadow-lg">
            <TrendingUp className="text-white" size={12} />
          </div>
          User Metrics
        </h2>
        <p className="text-xl text-gray-300 mb-8 font-light tracking-wide font-sans">Track your audience growth and engagement over the last 10 days</p>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto opacity-60"></div>
      </div>

      {/* Charts Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {/* New Users Chart */}
        <div className={`transition-all duration-300 hover:scale-[1.02] delay-200 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-2xl font-bold text-white mb-4 text-center font-sans tracking-wide">New Users</h3>
          <div className="rounded-2xl p-3 border border-white/20 bg-white/95 backdrop-blur-sm shadow-inner hover:shadow-lg transition-all duration-300">
            <AreaChart data={newUsersData} />
          </div>
        </div>

        {/* Users Gained/Lost Chart */}
        <div className={`transition-all duration-300 hover:scale-[1.02] delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h3 className="text-2xl font-bold text-white mb-4 text-center font-sans tracking-wide">Users Gained/Lost</h3>
          <div className="rounded-2xl p-3 border border-white/20 bg-white/95 backdrop-blur-sm shadow-inner hover:shadow-lg transition-all duration-300">
            <BarChart data={usersGainedLostData} />
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent mx-auto mt-8 opacity-60 md:hidden"></div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-700 delay-400 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="rounded-2xl p-8 border border-white/20 bg-white/95 backdrop-blur-sm shadow-inner hover:shadow-lg transition-all duration-300 hover:scale-[1.02]" >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 font-sans uppercase tracking-wider">Total New Users</p>
              <p className="text-3xl font-black text-gray-900 font-sans tracking-tight">{totalNewUsers}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-inner">
              <UserPlus className="text-indigo-600" size={28} />
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl p-8 border border-white/20 bg-white/95 backdrop-blur-sm shadow-inner hover:shadow-lg transition-all duration-300 hover:scale-[1.02]" >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 font-sans uppercase tracking-wider">Net Change</p>
              <p className={`text-3xl font-black font-sans tracking-tight ${netUserChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netUserChange > 0 ? `+${netUserChange}` : netUserChange}
              </p>
            </div>
            <div className={`p-4 rounded-xl shadow-inner ${netUserChange >= 0 ? 'bg-gradient-to-br from-green-100 to-emerald-100' : 'bg-gradient-to-br from-red-100 to-pink-100'}`}>
              {netUserChange >= 0 ? 
                <UserPlus className="text-green-600" size={28} /> : 
                <UserMinus className="text-red-600" size={28} />
              }
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl p-8 border border-white/20 bg-white/95 backdrop-blur-sm shadow-inner hover:shadow-lg transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1" >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 font-sans uppercase tracking-wider">Avg Daily Growth</p>
              <p className="text-3xl font-black text-gray-900 font-sans tracking-tight">
                {(newUsersData.reduce((a, b) => a + b, 0) / newUsersData.length).toFixed(1)}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl shadow-inner">
              <Users className="text-purple-600" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className={`rounded-2xl p-8 md:p-10 border border-white/20 bg-white/95 backdrop-blur-sm shadow-inner hover:shadow-lg transition-all duration-700 delay-800 hover:scale-[1.01] ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`} >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 font-sans tracking-wide">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2 shadow-sm"></div>
            <div className="space-y-1">
              <p className="font-semibold text-gray-700 font-sans tracking-wide">Peak Day</p>
              <p className="text-gray-600 font-sans leading-relaxed">
                {dateLabels[newUsersData.indexOf(Math.max(...newUsersData))]} with {Math.max(...newUsersData)} new users
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 shadow-sm"></div>
            <div className="space-y-1">
              <p className="font-semibold text-gray-700 font-sans tracking-wide">Growth Trend</p>
              <p className="text-gray-600 font-sans leading-relaxed">
                {netUserChange > 0 ? 'Positive' : netUserChange < 0 ? 'Declining' : 'Stable'} with {Math.abs(netUserChange)} net change
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMetrics;